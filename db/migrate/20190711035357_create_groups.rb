class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :groups do |t|
      t.string      :group_name      #group_nameカラム作成
      t.timestamps
    end
  end
end
