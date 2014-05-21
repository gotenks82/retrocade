class GameImage < ActiveRecord::Base
  belongs_to :game
  mount_uploader :image, ImageUploader
end
