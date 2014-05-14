class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :name
      t.string :game_hash
      t.boolean :enabled

      t.timestamps
    end
  end
end
