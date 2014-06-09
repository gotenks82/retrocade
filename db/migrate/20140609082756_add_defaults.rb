class AddDefaults < ActiveRecord::Migration
  def change
    change_column :games, :highscore_order, :string, default:'ASC'
    change_column :games, :highscore_type, :string, default:'seconds'
  end
end
