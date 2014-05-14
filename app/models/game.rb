class Game < ActiveRecord::Base
  belongs_to :user
  has_one :game_version
  has_many :game_tags
  has_many :comments
  has_many :votes
  has_many :highscores


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
    asset_path = "#{Rails.root}/app/assets"
    #File.open("#{asset_path}/games/testfile.txt", 'w') {|f| f.write("test write") }
    minesweeper.game_version.custom_css = CustomCss.new({:name => 'minesweeper.css', :path => "/game_content/minesweeper/css/minesweeper.css"})
    minesweeper.game_version.gameplay_js = GameplayJs.new({:name=> 'minesweeper.js', :path => "/game_content/minesweeper/js/minesweeper.js"})
    minesweeper
  end
end
