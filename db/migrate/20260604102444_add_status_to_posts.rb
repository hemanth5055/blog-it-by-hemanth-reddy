# frozen_string_literal: true

class AddStatusToPosts < ActiveRecord::Migration[8.0]
  def change
    add_column :posts, :status, :integer, default: 1, null: false
  end
end
