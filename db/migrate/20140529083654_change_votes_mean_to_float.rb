class ChangeVotesMeanToFloat < ActiveRecord::Migration
  def change
    change_column :games, :votes_mean, :float
  end
end
