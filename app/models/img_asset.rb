class ImgAsset
  extend CarrierWave::Mount
  attr_accessor :image, :path
  mount_uploader :image, ImgAssetsUploader

  def save
    self.store_image!
  end

end