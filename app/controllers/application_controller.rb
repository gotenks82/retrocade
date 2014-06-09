class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  include SessionsHelper


  def checkLogin
    unless signed_in?
      flash[:danger] = "User must be logged in"
      redirect_to :back
    end
  end

end
