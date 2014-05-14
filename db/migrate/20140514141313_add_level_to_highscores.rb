class AddLevelToHighscores < ActiveRecord::Migration
  def change
    add_column :highscores, :level, :string
  end
end
