class HomeController < ApplicationController
  before_action 'set_nav'

  def set_nav
    @nav = 'home'
  end

  def home
    @latest_games = Game.order("created_at desc").limit(5)
    @most_voted_games = Game.order('votes_count desc').limit(5)
    @best_voted_games = Game.order('votes_mean desc').limit(5)
    @most_discussed_games = Game.order('comments_count desc').limit(5)
  end
end
