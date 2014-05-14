class CustomCss < ActiveRecord::Base
  belongs_to :game_version
  attr :filedata
  before_create :store_file

  private
    def store_file
        unless filedata.nil?
          endself.name =  self.filedata.original_filename
          #self.path = "game_content/#{game_version.game_hash}/css/"
          # create the file path
          self.path = File.join("game_content",self.game_version.game_path_root,"css", name)
          # write the file
          File.open(File.join("public",path), "wb") { |f| f.write(:filedata.read) }
        end
    end

end

