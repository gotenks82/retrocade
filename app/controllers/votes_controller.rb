class VotesController < ApplicationController
  def create
    @vote = Vote.where(:user_id => params[:vote][:user_id], :game_id => params[:vote][:game_id]).first_or_initialize(vote_params)
    @vote.update(vote_params)
    @tempflash = {}
    if @vote.save
      @tempflash[:success] = 'Thanks for voting!'
    else
      @tempflash[:danger] = @vote.errors.full_messages.to_sentence
    end
    respond_to do |format|
      format.js # create.js.erb
    end
  end


  private
    def vote_params
      params.require(:vote).permit(:user_id,:game_id,:vote)
    end
end
