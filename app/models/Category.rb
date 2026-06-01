# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :posts
  has_and_belongs_to_many :posts, join_table: :posts_categories
end
