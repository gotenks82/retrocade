class CreateGameImages < ActiveRecord::Migration
  def change
    create_table :game_images do |t|
      t.timestamps
    end
  end
end
