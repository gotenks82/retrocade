class Comment < ActiveRecord::Base
  belongs_to :game, counter_cache: true
  belongs_to :user, counter_cache: true

end
