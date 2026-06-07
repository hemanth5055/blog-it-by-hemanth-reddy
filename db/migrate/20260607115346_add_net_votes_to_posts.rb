# frozen_string_literal: true

class AddNetVotesToPosts < ActiveRecord::Migration[8.0]
  def change
    add_column :posts, :net_votes, :integer, null: false, default: 0
  end
end
