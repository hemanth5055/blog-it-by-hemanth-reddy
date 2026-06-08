# frozen_string_literal: true

class RenameLastUpdatedAtColumn < ActiveRecord::Migration[8.0]
  def change
    rename_column :posts, :last_updated_at, :last_published_at
  end
end
