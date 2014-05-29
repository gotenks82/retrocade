class Vote < ActiveRecord::Base
  validates :game_id, presence: true
  validates :user_id, presence: true
  belongs_to :game, counter_cache: true
  belongs_to :user
  after_save :calculate_mean_vote

  def calculate_mean_vote
    self.game.calculate_mean_vote
  end
end
