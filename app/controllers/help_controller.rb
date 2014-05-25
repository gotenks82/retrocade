class HelpController < ApplicationController
  def show
    file = File.open(File.join(Rails.root,'README.md'), 'rb')
    @readme = file.read
  end
end
