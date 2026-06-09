# frozen_string_literal: true

require "test_helper"

class VoteTest < ActiveSupport::TestCase
  # frozen_string_literal: true

  require "test_helper"

  class VoteTest < ActiveSupport::TestCase
    def setup
      @user = create(:user)
      @post = create(:post, user: @user)
      @vote = create(:vote, user: @user, post: @post, vote_type: :up)
    end

    def test_vote_belongs_to_post
      assert_equal @post, @vote.post
    end

    def test_vote_belongs_to_user
      assert_equal @user, @vote.user
    end

    def test_vote_is_invalid_without_post
      @vote.post = nil
      assert @vote.invalid?
      assert_includes @vote.errors.full_messages, "Post must exist"
    end

    def test_vote_is_invalid_without_user
      @vote.user = nil
      assert @vote.invalid?
      assert_includes @vote.errors.full_messages, "User must exist"
    end

    def test_vote_type_can_be_up_down_or_neutral
      assert @vote.up?

      @vote.vote_type = :down
      assert @vote.down?

      @vote.vote_type = :neutral
      assert @vote.neutral?
    end
  end
end
