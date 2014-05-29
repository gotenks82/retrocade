class JsLibrary < ActiveRecord::Base
  has_and_belongs_to_many :game_versions



  def check_url
    client = HTTPClient.new
    content = client.get_content(self.path).to_s
    content.include? self.name and content.include? self.version
  end

  def check_url_and_save!
    begin
      self.save if check_url
    rescue Errno::EADDRNOTAVAIL
      false
    end
  end

  def toggle_enabled!
    self.enabled = self.enabled.nil?? true : !self.enabled
    self.save
  end

end
