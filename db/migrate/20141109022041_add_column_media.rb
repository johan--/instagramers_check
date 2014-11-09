class AddColumnMedia < ActiveRecord::Migration
  def change
    add_column :instagramers, :media, :integer
  end
end
