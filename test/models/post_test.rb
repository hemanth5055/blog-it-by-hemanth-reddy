# frozen_string_literal: true

require "test_helper"
class PostTest < ActiveSupport::TestCase
  def setup
    @post = create(:post)
  end

  def test_post_title_cannot_be_blank
    @post.title = ""
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Title can't be blank"
  end
end
