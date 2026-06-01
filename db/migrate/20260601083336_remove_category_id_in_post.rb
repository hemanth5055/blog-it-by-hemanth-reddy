# frozen_string_literal: true

# frozen_string_literal: true

class RemoveCategoryIdInPost < ActiveRecord::Migration[8.0]
  def change
    remove_column :posts, :category_id, :integer
  end
end
