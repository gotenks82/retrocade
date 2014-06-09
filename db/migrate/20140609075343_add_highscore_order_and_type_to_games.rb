class AddHighscoreOrderAndTypeToGames < ActiveRecord::Migration
  def change
    add_column :games, :highscore_order, :string
    add_column :games, :highscore_type, :string
  end
end
