# frozen_string_literal: true

class AddCategoryRefInPosts < ActiveRecord::Migration[8.0]
  def change
    add_reference :posts, :category, null: false, foreign_key: true
  end
end
