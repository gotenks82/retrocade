module FsHelper
  require 'fileutils'
  def self.removeDir(path)
    FileUtils.rm_rf path
    'Success'
  end
end