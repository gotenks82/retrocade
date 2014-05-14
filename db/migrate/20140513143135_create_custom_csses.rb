class CreateCustomCsses < ActiveRecord::Migration
  def change
    create_table :custom_csses do |t|
      t.string :name
      t.string :path

      t.timestamps
    end
  end
end
