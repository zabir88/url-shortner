class CreateUrls < ActiveRecord::Migration[5.2]
  def change
    create_table :urls do |t|
      t.string :original_url
      t.string :shortened_url
      t.integer :click, default: 0
      t.string :title

      t.timestamps
    end
  end
end
