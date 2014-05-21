# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140515090121) do

  create_table "comments", force: true do |t|
    t.string   "text"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "game_id"
    t.integer  "user_id"
  end

  add_index "comments", ["game_id"], name: "index_comments_on_game_id"
  add_index "comments", ["user_id"], name: "index_comments_on_user_id"

  create_table "custom_csses", force: true do |t|
    t.string   "name"
    t.string   "path"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "game_version_id"
    t.string   "file"
  end

  add_index "custom_csses", ["game_version_id"], name: "index_custom_csses_on_game_version_id"

  create_table "game_images", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image"
    t.integer  "game_id"
  end

  create_table "game_versions", force: true do |t|
    t.string   "name"
    t.string   "game_hash"
    t.integer  "version"
    t.string   "main_method"
    t.string   "changes_from_last_version"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "game_id"
  end

  add_index "game_versions", ["game_id"], name: "index_game_versions_on_game_id"

  create_table "game_versions_js_libraries", id: false, force: true do |t|
    t.integer "game_version_id"
    t.integer "js_library_id"
  end

  create_table "gameplay_js", force: true do |t|
    t.string   "name"
    t.string   "path"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "game_version_id"
    t.string   "file"
  end

  add_index "gameplay_js", ["game_version_id"], name: "index_gameplay_js_on_game_version_id"

  create_table "games", force: true do |t|
    t.string   "name"
    t.string   "game_hash"
    t.boolean  "enabled"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
  end

  add_index "games", ["name"], name: "index_names_on_games"
  add_index "games", ["user_id"], name: "index_games_on_user_id"

  create_table "gametags", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "game_id"
  end

  add_index "gametags", ["game_id"], name: "index_gametags_on_game_id"

  create_table "highscores", force: true do |t|
    t.integer  "score"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "game_id"
    t.integer  "user_id"
    t.string   "level"
  end

  add_index "highscores", ["game_id"], name: "index_highscores_on_game_id"
  add_index "highscores", ["user_id"], name: "index_highscores_on_user_id"

  create_table "js_libraries", force: true do |t|
    t.string   "name"
    t.string   "version"
    t.string   "path"
    t.boolean  "enabled"
    t.string   "test_js_path"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "file"
  end

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.string   "remember_token"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["remember_token"], name: "index_users_on_remember_token"

  create_table "votes", force: true do |t|
    t.integer  "vote"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "game_id"
  end

  add_index "votes", ["game_id"], name: "index_votes_on_game_id"

end
