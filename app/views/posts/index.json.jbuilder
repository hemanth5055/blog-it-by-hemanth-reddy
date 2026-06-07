# frozen_string_literal: true

json.posts @posts do |post|
  json.id post.id
  json.title post.title
  json.description post.description
  json.slug post.slug
  json.updatedAt post.updated_at
  json.categories post.categories do |category|
    json.id category.id
    json.name category.name
  end
  json.net_votes post.votes.sum(&:vote_type_before_type_cast)
  json.current_vote post.votes.find { |vote| vote.user_id == @current_user.id }&.vote_type
  json.author do
    json.id post.user.id
    json.name post.user.name
  end
end
