# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post, :id, :title, :description, :slug
  json.updatedAt post.updated_at
  json.categories post.categories do |category|
    json.extract! category, :id, :name
  end
  json.netVotes post.net_votes
  json.isBloggable post.is_bloggable
  json.currentVote post.votes.find { |vote| vote.user_id == @current_user.id }&.vote_type
  json.author do
    json.id post.user.id
    json.name post.user.name
  end
end
