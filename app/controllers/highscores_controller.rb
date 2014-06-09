class HighscoresController < ApplicationController

  def index
  end

  def new
  end

  respond_to :json
  def show_game_highscores
    @game = Game.find(params[:game_id])
    @highscores = Highscore.where(:game_id => params[:game_id]).order("level, score #{@game.highscore_order}").limit(10)
    respond_with(@highscores) do |format|
      format.json { render :json => @highscores.to_json(
          :include => [
              :user => { :only => [:name, :highscore_type]}])
      }
    end
  end

  def create
    @highscore = Highscore.new()
    @game = Game.find(params[:highscore][:game_id])
    @user = User.find(params[:highscore][:user_id])
    @highscore.user = @user
    @highscore.game = @game
    @highscore.score = params[:highscore][:score]
    @highscore.level = params[:highscore][:level]
    @tempflash = {}
    if @highscore.save
      @tempflash[:success] = "save successful"
    else
      @tempflash[:danger] = @highscore.errors.full_messages.to_sentence
    end
    respond_to do |format|
      format.js # create.js.erb
    end
  end
end
