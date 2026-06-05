# frozen_string_literal: true

class Category < ApplicationRecord
  MIN_NAME_LENGTH = 3
  has_many :posts
  has_and_belongs_to_many :posts, join_table: :posts_categories
  validates :name, uniqueness: { case_sensitive: false }, length: { minimum: MIN_NAME_LENGTH }
end
