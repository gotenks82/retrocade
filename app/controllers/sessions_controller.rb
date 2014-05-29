class SessionsController < ApplicationController

  def new
    @nav = 'signin'
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      #flash.now[:error] = 'Login Successful'
      sign_in user
      redirect_to root_path
    else
      flash.now[:danger] = 'Invalid email/password combination'
      render 'new'
    end
  end

  def destroy
    sign_out
    flash.now[:error] = 'Goodbye!'
    redirect_to root_path
  end


end
