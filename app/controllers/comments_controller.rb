class CommentsController < ApplicationController
  def create
    @comment = Comment.create(comment_params)
    @tempflash = {}
    if @comment.save
      @tempflash[:success] = 'Comment saved'
    else
      @tempflash[:danger] = @comment.errors.full_messages.to_sentence
    end
    @comments = @comment.game.comments.order('created_at desc')
    @comment = Comment.new({:game => @comment.game, :user => @comment.user })
    respond_to do |format|
      format.js # create.js.erb
    end
  end


  private
  def comment_params
    params.require(:comment).permit(:text, :game_id, :user_id)
  end
end
