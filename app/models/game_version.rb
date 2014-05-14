class GameVersion < ActiveRecord::Base
  has_and_belongs_to_many :js_libraries
  has_one :custom_css
  has_one :gameplay_js

  def game_path_root
    "#{game_version.game_hash}-#{game_version.version}"
  end

end
