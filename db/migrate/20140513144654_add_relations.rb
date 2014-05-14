class AddRelations < ActiveRecord::Migration
  def change
    create_table :game_versions_js_libraries, id: false do |t|
      t.belongs_to :game_version
      t.belongs_to :js_library
    end

    change_table :games do |t|
      t.belongs_to :user, index: true
    end

    change_table :game_versions do |t|
      t.belongs_to :game, index: true
    end

    change_table :custom_csses do |t|
      t.belongs_to :game_version, index: true
    end

    change_table :gameplay_js do |t|
      t.belongs_to :game_version, index: true
    end

    change_table :votes do |t|
      t.belongs_to :game, index: true
    end

    change_table :gametags do |t|
      t.belongs_to :game, index: true
    end

    change_table :comments do |t|
      t.belongs_to :game, index: true
      t.belongs_to :user, index: true
    end

    change_table :highscores do |t|
      t.belongs_to :game, index: true
      t.belongs_to :user, index: true
    end

  end
end
