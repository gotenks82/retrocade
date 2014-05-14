class CreateGameVersions < ActiveRecord::Migration
  def change
    create_table :game_versions do |t|
      t.string :name
      t.string :game_hash
      t.integer :version
      t.string :main_method
      t.string :changes_from_last_version

      t.timestamps
    end
  end
end
