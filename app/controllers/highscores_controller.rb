class HighscoresController < ApplicationController

  def index
  end

  def new
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
