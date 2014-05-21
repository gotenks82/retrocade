class JsLibrary < ActiveRecord::Base
  has_and_belongs_to_many :game_versions
  mount_uploader :file, JsLibraryUploader
end
