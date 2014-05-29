class AddUserToVote < ActiveRecord::Migration
  def change
    change_table :votes do |t|
      t.belongs_to :user, index: true
    end
  end
end
