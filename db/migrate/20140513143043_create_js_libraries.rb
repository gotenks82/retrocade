class CreateJsLibraries < ActiveRecord::Migration
  def change
    create_table :js_libraries do |t|
      t.string :name
      t.string :version
      t.string :path
      t.boolean :enabled
      t.string :test_js_path

      t.timestamps
    end
  end
end
