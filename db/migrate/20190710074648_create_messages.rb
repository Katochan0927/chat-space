class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.text        :body       #bodyカラム作成
      t.string      :image      #imageカラム作成
      t.integer     :group_id   #group_idカラム作成
      t.integer     :user_id    #user_idカラム作成
      t.timestamps
    end
  end
end
