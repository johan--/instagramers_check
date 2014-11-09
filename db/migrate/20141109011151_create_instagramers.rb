class CreateInstagramers < ActiveRecord::Migration
  def change
    create_table :instagramers do |t|
      t.integer :instagram_id, null: false
      t.string :username, null: false
      t.integer :num_folloers
      t.integer :num_following

      t.timestamps
    end
    
    add_index :instagramers, :instagram_id, unique: true
    add_index :instagramers, :username, unique: true
  end
end
