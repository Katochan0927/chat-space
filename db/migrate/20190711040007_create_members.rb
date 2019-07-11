class CreateMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :members do |t|
      t.integer     :user_id    #user_idカラム作成
      t.integer     :group_id   #group_idカラム作成
      t.timestamps
    end
  end
end
