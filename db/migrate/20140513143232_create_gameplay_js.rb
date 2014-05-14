class CreateGameplayJs < ActiveRecord::Migration
  def change
    create_table :gameplay_js do |t|
      t.string :name
      t.string :path

      t.timestamps
    end
  end
end
