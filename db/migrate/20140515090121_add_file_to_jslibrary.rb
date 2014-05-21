class AddFileToJslibrary < ActiveRecord::Migration
  def change
    add_column :js_libraries, :file, :string
  end
end
