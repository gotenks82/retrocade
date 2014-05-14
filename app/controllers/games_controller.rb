class GamesController < ApplicationController
  def new
  end

  def edit
  end



  def index
    @games = Game.order(:name)
  end

  def play
    @game = Game.find(params[:id])
    @user = current_user
    @play = true
    @highscore = Highscore.new
  end

  def delete
  end
end
