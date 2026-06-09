# frozen_string_literal: true

require "test_helper"

class VotesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @post = create(:post)
    @user_headers = headers(@user)
  end

  def test_should_create_upvote_on_first_vote
    assert_difference "Vote.count", 1 do
      patch votes_path,
        params: { vote_update: { post_id: @post.id, vote_type: "up" } },
        headers: @user_headers,
        as: :json
    end
    assert_response :success
    assert_equal 1, @post.reload.net_votes
  end

  def test_should_create_downvote_on_first_vote
    assert_difference "Vote.count", 1 do
      patch votes_path,
        params: { vote_update: { post_id: @post.id, vote_type: "down" } },
        headers: @user_headers,
        as: :json
    end
    assert_response :success
    assert_equal(-1, @post.reload.net_votes)
  end

  def test_should_return_no_content_when_vote_type_unchanged
    create(:vote, post: @post, user: @user, vote_type: "up")
    @post.update!(net_votes: 1)

    assert_no_difference "Vote.count", -1 do
      patch votes_path,
        params: { vote_update: { post_id: @post.id, vote_type: "down" } },
        headers: @user_headers,
        as: :json
    end
    assert_response :no_content
    assert_equal -1, @post.reload.net_votes
  end

  def test_should_update_net_votes_when_switching_vote_type
    create(:vote, post: @post, user: @user, vote_type: "up")
    @post.update!(net_votes: 1)

    assert_no_difference "Vote.count" do
      patch votes_path,
        params: { vote_update: { post_id: @post.id, vote_type: "down" } },
        headers: @user_headers,
        as: :json
    end
    assert_response :success
    assert_equal(-1, @post.reload.net_votes)
  end
end
