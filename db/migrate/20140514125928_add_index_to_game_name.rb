class AddIndexToGameName < ActiveRecord::Migration
  def change
    add_index "games", ["name"], name: "index_names_on_games"
  end
end
