class GameVersion < ActiveRecord::Base
  has_and_belongs_to_many :js_libraries
  has_one :custom_css
  has_one :gameplay_js
  belongs_to :game

  def game_path_root
    File.join("game_content","#{self.game_hash}-#{self.version}")
  end

  def game_img_assets_path
    File.join(game_path_root,"img")
  end

end
