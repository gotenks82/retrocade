class Game < ActiveRecord::Base
  belongs_to :user
  has_one :game_version
  has_many :game_tags
  has_many :comments
  has_many :votes
  has_many :highscores
  has_many :game_images


  def self.demoGame
    #dati di prova per sviluppo viste...
    minesweeper = Game.new
    minesweeper.id = 1
    minesweeper.name = 'MineSweeper'
    minesweeper.enabled = true
    minesweeper.game_hash = Digest::SHA1.hexdigest('alex.pedini@gmail.com-minesweeper')
    minesweeper.game_version = GameVersion.new
    minesweeper.game_version.game_hash = minesweeper.game_hash
    minesweeper.game_version.version = 1
    minesweeper.game_version.main_method = 'minesweeper'
    #asset_path = "#{Rails.root}/public/assets"
    #File.open("#{asset_path}/games/testfile.txt", 'w') {|f| f.write("test write") }
    minesweeper.game_version.custom_css = CustomCss.new({:name => 'minesweeper.css', :path => "/game_content/minesweeper/css/minesweeper.css"})
    minesweeper.game_version.gameplay_js = GameplayJs.new({:name=> 'minesweeper.js', :path => "/game_content/minesweeper/js/minesweeper.js"})
    minesweeper
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

  def game_versions
    GameVersion.where("game_hash = '#{self.game_hash}'").order('version DESC')
  end

  def last_version
    game_versions.first
  end
end
