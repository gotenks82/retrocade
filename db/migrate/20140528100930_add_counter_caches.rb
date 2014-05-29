class AddCounterCaches < ActiveRecord::Migration
  def change
    add_column :games, :votes_count, :integer, default: 0, null: false
    add_column :games, :votes_mean, :integer, default: 0, null: false
    add_column :games, :comments_count, :integer, default: 0, null: false
    add_column :users, :comments_count, :integer, default: 0, null: false
    add_column :games, :highscores_count, :integer, default: 0, null: false
    add_column :users, :highscores_count, :integer, default: 0, null: false
  end
end
