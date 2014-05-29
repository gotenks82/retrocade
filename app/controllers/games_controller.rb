class GamesController < ApplicationController
  #before_action :loadGame, only: [:show, :edit, :play, :delete, :update, :save_new_version, :change_version, :delete_version]
  before_action :checkLogin, except: [:index]
  before_action :loadGame, except: [:new, :index, :create]
  before_action :set_nav

  def loadGame
    @game = Game.find(params[:id])
  end

  def set_nav
    @nav = 'games'
  end

  def new
    @game = Game.new
    @game_images = @game.game_images.build
    @game_version = GameVersion.new
    @game_version.gameplay_js = GameplayJs.new({:game_version => @game_version})
    @game_version.custom_css = CustomCss.new({:game_version => @game_version})
    @img_assets = []
    @js_libraries = JsLibrary.where({:enabled => true}).order(:name,'version DESC')
    @selected_libraries = []
  end

  def create
    if Game.create_game!(game_params,params[:game_version], params[:img_assets], params[:game_images], current_user, params[:selected_libraries])
      flash[:success] = 'New Game created successfully!'
      redirect_to :back
    else
      flash[:danger] = 'Error creating new Game'
      redirect_to action: :new
    end
  end

  def show
    redirect_to action: :edit if @game.user == current_user
  end

  def edit
    @game_images = @game.game_images.build
    @game_version =  @game.next_version
    @img_assets = []
    @js_libraries = JsLibrary.where({:enabled => true}).order(:name,'version DESC')
    @selected_libraries = []
  end

  def update
    @game.update(game_params)
    if params[:game_images]
      params[:game_images]['game_image'].each do |a|
        @game_images = @game.game_images.create!(:image => a, :game_id => @game.id)
      end
    end
    redirect_to action: :edit
  end

  def change_version
    if params[:new_version] && @game.change_version!(params[:new_version])
      flash[:success] = "Game version set to n. #{params[:new_version]}"
    else
      flash[:danger] = 'Error updating Game Version'
    end
    redirect_to action: :edit
  end

  def delete_version
    if params[:gv_id] && params[:gv_ver]
      if @game.delete_version!(params[:gv_id],params[:gv_ver])
        flash[:success] = "Successfully deleted version n. #{params[:gv_ver]}"
      else
        flash[:danger] = 'Error Deleting Game Version'
      end
    end
    redirect_to action: :edit
  end

  def save_new_version # TODO: refactor - move logic to game or game_version model
    @game_version =  @game.next_version
    if params[:game_version]
      @game_version.changes_from_last_version = params[:game_version][:changes_from_last_version]
      @game_version.main_method = params[:game_version][:main_method]
      @game_version.custom_css = CustomCss.new({:game_version => @game_version, :file => params[:game_version][:custom_css]}) if params[:game_version][:custom_css]
      @game_version.gameplay_js = GameplayJs.new({:game_version => @game_version, :file => params[:game_version][:gameplay_js]}) if params[:game_version][:gameplay_js]
      params[:img_assets]['img_asset'].each do |a|
        img = ImgAsset.new
        img.image = a
        img.path = @game_version.game_img_assets_path
        img.save
      end
      if params['selected_libraries']
        params['selected_libraries'].each do |js_id|
          lib = JsLibrary.find(js_id)
          @game_version.js_libraries << lib if lib
        end
      end
      if @game_version.save
         if @game.change_version!(@game_version.version)
           flash[:success] = "Game Version updated to n.#{@game_version.version}!"
         else
          flash[:danger] = 'Error updating Game Version'
        end
      else
        flash[:danger] = 'Error creating new Version'
      end
    else
      flash[:danger] = 'No Changes to save'
    end
    redirect_to action: :edit
  end

  def index
    @games = Game.order(:name).where({:enabled => true})
  end

  def play
    @user = current_user
    @play = true
    @highscore = Highscore.new
      @vote = @game.votes.where(:user => current_user).first
      @vote = Vote.new({:game => @game, :user => current_user}) unless @vote
  end

  def destroy
    @game.destroy_game!
    redirect_to :back
  end

  def toggle_enabled
    @game.toggle_enabled!
    redirect_to :back
  end

private
  def game_params
    params.require(:game).permit(:name, :description)
  end
end
