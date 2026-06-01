# frozen_string_literal: true

class CreatePostsAndCategories < ActiveRecord::Migration[8.0]
  def change
    create_table :posts_categories, id: false do |t|
      t.belongs_to :post
      t.belongs_to :category
      t.timestamps
    end
  end
end
