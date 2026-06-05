# frozen_string_literal: true

class AddUniqueConstraintToCategoryName < ActiveRecord::Migration[8.0]
  def change
    add_index :categories, :name, unique: true
  end
end
