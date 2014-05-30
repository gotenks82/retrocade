class Game < ActiveRecord::Base
  belongs_to :user
  has_one :game_version
  has_many :game_tags
  has_many :comments
  has_many :votes
  has_many :highscores
  has_many :game_images

  before_save :calculate_hash

  def calculate_hash
    self.game_hash = Digest::SHA1.hexdigest("#{self.user.email}-#{self.name}")
  end

  def calculate_mean_vote
    if self.votes && self.votes.count > 0
      self.votes_mean = self.votes.inject(0.0){|r,v| r+=v.vote} / self.votes.count
      self.save
    end
  end

  def next_version
    gv = GameVersion.new({:game_id => self.id})
    last_version =  self.last_version
    gv.version = last_version ? last_version.version + 1 : 1
    gv.game_hash = self.game_hash
    gv.gameplay_js = GameplayJs.new({:game_version => gv})
    gv.custom_css = CustomCss.new({:game_version => gv})
    gv
  end

  def change_version(ver)
    gv = self.game_versions.where(version: ver).first
    self.game_version = gv if gv
    gv
  end

  def change_version!(ver)
    self.save if self.change_version(ver)
  end

  def delete_version!(gv_id, ver)
    v = GameVersion.where("game_hash = '#{self.game_hash}' and id = #{gv_id} and version = #{ver} ").first
    v_path = File.join(Rails.root,'public',v.game_path_root)
    if v.destroy!
      FsHelper.removeDir(v_path)
    else
      nil
    end
  end

  def delete_all_versions!
    self.game_versions.each do |gv|
      delete_version!(gv.id,gv.version)
    end
  end

  def game_versions
    GameVersion.where("game_hash = '#{self.game_hash}'").order('version DESC')
  end

  def last_version
    game_versions.first
  end

  def self.create_game!( game_params, game_version_params, img_assets_params, game_images_params, current_user, selected_libraries)
    game = Game.new(game_params)
    puts "game version params:" + game_version_params.to_s
    Game.transaction do
      game.user= current_user
      game.calculate_hash
      raise ActiveRecord::Rollback unless game.save
      game_version = GameVersion.new({:game_id => game.id, :version => 1})
      game_version.changes_from_last_version = game_version_params[:changes_from_last_version]
      game_version.main_method = game_version_params[:main_method]
      game_version.game_hash = game.game_hash
      game_version.custom_css = CustomCss.new({:game_version => game_version, :file => game_version_params[:custom_css]}) if game_version_params[:custom_css]
      game_version.gameplay_js = GameplayJs.new({:game_version => game_version, :file => game_version_params[:gameplay_js]}) if game_version_params[:gameplay_js]
      if img_assets_params
        img_assets_params['img_asset'].each do |a|
          img = ImgAsset.new
          img.image = a
          img.path = game_version.game_img_assets_path
          raise ActiveRecord::Rollback unless img.save
        end
      end
      if selected_libraries
        selected_libraries.each do |js_id|
          lib = JsLibrary.find(js_id)
          game_version.js_libraries << lib if lib
        end
      end
      raise ActiveRecord::Rollback unless game_version.save
      puts "Game_version saved!"
      game.game_version = game_version
      game.enabled = false
      raise ActiveRecord::Rollback unless game.save
      puts "Game version updated!"
      if game_images_params
        game_images_params['game_image'].each do |a|
          game_images = game.game_images.new(:image => a, :game_id => game.id)
          raise ActiveRecord::Rollback unless game_images.save
        end
      end
      game
    end
  end

  def destroy_game!
    self.transaction do
    #for each version
    #destroy custom_css
    #destroy gameplay_js
    #destroy game_images
    #delete game_path folder
      self.delete_all_versions!
      raise ActiveRecord::Rollback unless self.delete
    end
  end

  def toggle_enabled!
    self.enabled = self.enabled.nil?? true : !self.enabled
    self.save
  end

end
