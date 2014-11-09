class ChangeColumnNames < ActiveRecord::Migration
  def change
    remove_column :instagramers, :num_folloers
    remove_column :instagramers, :num_following
    add_column :instagramers, :followed_by, :integer
    add_column :instagramers, :follows, :integer
  end
end
