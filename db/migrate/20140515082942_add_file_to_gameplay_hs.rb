class AddFileToGameplayHs < ActiveRecord::Migration
  def change
    add_column :gameplay_js, :file, :string
  end
end
