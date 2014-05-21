class AddFileToCustomcsses < ActiveRecord::Migration
  def change
    add_column :custom_csses, :file, :string
  end
end
