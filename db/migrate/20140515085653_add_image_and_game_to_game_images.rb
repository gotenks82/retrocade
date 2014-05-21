class AddImageAndGameToGameImages < ActiveRecord::Migration
  def change
    add_column :game_images, :image, :string
    add_belongs_to :game_images, :game
  end
end
