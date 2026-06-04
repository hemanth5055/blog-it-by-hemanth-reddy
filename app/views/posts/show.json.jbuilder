# frozen_string_literal: true

json.post do
  json.id @post.id
  json.title @post.title
  json.description @post.description

  json.user do
    json.id @post.user.id
    json.name @post.user.name
  end

  json.categories @post.categories do |category|
    json.id category.id
    json.name category.name
  end

  json.updatedAt @post.updated_at

  json.isOwner @isOwner
  json.status @post.status
end
