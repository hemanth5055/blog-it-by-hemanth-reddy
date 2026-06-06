# frozen_string_literal: true

json.posts @posts do |post|
  json.id post.id
  json.title post.title
  json.slug post.slug
  json.lastUpdatedAt post.last_updated_at
  json.status post.status

  json.categories post.categories do |category|
    json.id category.id
    json.name category.name
  end
end
