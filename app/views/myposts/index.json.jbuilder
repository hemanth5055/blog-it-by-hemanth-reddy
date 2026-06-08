# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post, :id, :title, :slug, :status

  json.lastPublishedAt post.last_published_at

  json.categories post.categories do |category|
    json.extract! category, :id, :name

  end
end
