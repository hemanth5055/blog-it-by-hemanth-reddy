# frozen_string_literal: true

json.post do
  json.extract! @post, :id, :title, :description, :slug

  json.user do
    json.id @post.user.id
    json.name @post.user.name
  end

  json.categories @post.categories do |category|
    json.extract! category, :id, :name

  end
  json.updatedAt @post.updated_at

  json.isOwner @post.user_id == @current_user.id
  json.status @post.status
end
