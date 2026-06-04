# frozen_string_literal: true

class AddLastUpdatedAtToPosts < ActiveRecord::Migration[8.0]
  def change
    add_column :posts, :last_updated_at, :datetime, null: false
  end
end
