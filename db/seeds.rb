# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

minesweeper = Game.new
minesweeper.id = 1
minesweeper.name = 'MineSweeper'
minesweeper.enabled = true
minesweeper.game_hash = Digest::SHA1.hexdigest('alex.pedini@gmail.com-minesweeper')
minesweeper.game_version = GameVersion.new
minesweeper.game_version.game_hash = minesweeper.game_hash
minesweeper.game_version.version = 1
minesweeper.game_version.main_method = 'minesweeper'
minesweeper.game_version.custom_css = CustomCss.new({:name => 'minesweeper.css', :path => "/game_content/#{minesweeper.game_hash}/css/minesweeper.css"})
minesweeper.game_version.gameplay_js = GameplayJs.new({:name=> 'minesweeper.js', :path => "/game_content/#{minesweeper.game_hash}/js/minesweeper.js"})
minesweeper.save