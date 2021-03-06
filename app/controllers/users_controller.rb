class UsersController < ApplicationController
  before_action :checkLogin, except: [:new, :create]
  before_action :load_user, only: [:show, :edit, :update, :destroy]
  before_action :set_nav, except: [:new, :create, :index]

  def set_nav
    @nav = 'user'
  end

  def load_user
    @user = User.find(params[:id]);
  end

	def index
		@users = User.order(:name);
    @nav = 'admin_users'
	end

	def new
		@user = User.new
    @nav = 'signup'
	end

	def create
		@user = User.new(user_params)
		if @user.save
      sign_in(@user)
			redirect_to root_path
    else
      render 'new'
		end
  end

	def show
	end

	def edit
	end

	def update
		@user.update(user_params)
		redirect_to users_path
	end

	def destroy
		if @list.delete
			redirect_to lists_path
		end
	end
  
  private
	def user_params
		params.require(:user).permit(:name, :email, :password, :password_confirmation)
	end
end
