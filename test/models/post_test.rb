# frozen_string_literal: true

require "test_helper"

class PostTest < ActiveSupport::TestCase
  def setup
    @post = create(:post)
  end

  def test_post_title_should_be_of_valid_length
    @post.title = "a" * (Post::MAX_TITLE_LENGTH + 1)
    assert @post.invalid?
  end

  def test_post_description_should_be_of_valid_length
    @post.description = "a" * (Post::MAX_DESC_LENGTH + 1)
    assert @post.invalid?
  end

  def test_post_title_cannot_be_blank
    @post.title = ""
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Title can't be blank"
  end

  def test_slug_generation
    post1 = create(:post, title: :fishing)
    post2 = create(:post, title: :fish)
    assert_equal post1.slug, "fishing"
    assert_equal post2.slug, "fish"
  end

  def test_values_of_created_at_and_updated_at
    post = build(:post)
    assert_nil post.created_at
    assert_nil post.updated_at

    post.save!
    assert_not_nil post.created_at
    assert_equal post.updated_at, post.created_at

    post.update!(title: "This is a updated post title")
    assert_not_equal post.updated_at, post.created_at
  end

  def test_post_should_not_be_valid_without_user
    @post.user = nil
    assert_not @post.save
    assert_includes @post.errors.full_messages, "User must exist"
  end

  def test_exception_raised
    assert_raises ActiveRecord::RecordNotFound do
      Post.find(SecureRandom.uuid)
    end
  end

  def test_post_count_increases_on_saving
    assert_difference ["Post.count"], 1 do
      create(:post)
    end
  end

  def test_post_count_decreases_on_deleting
    post = create(:post)
    assert_difference ["Post.count"], -1 do
      post.destroy
    end
  end

  def test_incremental_slug_generation_for_posts_with_duplicate_two_worded_titles
    post1 = create(:post, title: "test post")
    post2 = create(:post, title: "test post")
    assert_equal "test-post", post1.slug
    assert_equal "test-post-2", post2.slug
  end

  def test_incremental_slug_generation_for_posts_with_duplicate_hyphenated_titles
    post1 = create(:post, title: "test-post")
    post2 = create(:post, title: "test-post")
    assert_equal "test-post", post1.slug
    assert_equal "test-post-2", post2.slug
  end

  def test_slug_generation_for_posts_having_titles_one_being_prefix_of_the_other
    post1 = create(:post, title: "fishing")
    post2 = create(:post, title: "fish")
    assert_equal "fishing", post1.slug
    assert_equal "fish", post2.slug
  end

  def test_post_slug_is_parameterized_title
    title = @post.title
    assert_equal title.parameterize, @post.slug
  end

  def test_error_raised_for_duplicate_slug
    another_test_post = create(:post)
    assert_raises ActiveRecord::RecordInvalid do
      another_test_post.update!(slug: @post.slug)
    end
    error_msg = another_test_post.errors.full_messages.to_sentence
    assert_match I18n.t("post.slug.immutable"), error_msg
  end

  def test_updating_title_does_not_update_slug
    assert_no_changes -> { @post.reload.slug } do
      updated_post_title = "updated post title"
      @post.update!(title: updated_post_title)
      assert_equal updated_post_title, @post.title
    end
  end

  def test_slug_suffix_is_maximum_slug_count_plus_one_if_two_or_more_slugs_already_exist
    title = "test-post"
    first_post = create(:post, title:)
    second_post = create(:post, title:)
    third_post = create(:post, title:)
    fourth_post = create(:post, title:)
    assert_equal "#{title.parameterize}-4", fourth_post.slug
    third_post.destroy
    expected_slug_suffix_for_new_post = fourth_post.slug.split("-").last.to_i + 1
    new_post = create(:post, title:)
    assert_equal "#{title.parameterize}-#{expected_slug_suffix_for_new_post}", new_post.slug
  end

  def test_existing_slug_prefixed_in_new_post_title_doesnt_break_slug_generation
    title_having_new_title_as_substring = "buy milk and apple"
    new_title = "buy milk"
    existing_post = create(:post, title: title_having_new_title_as_substring)
    assert_equal title_having_new_title_as_substring.parameterize, existing_post.slug
    new_post = create(:post, title: new_title)
    assert_equal new_title.parameterize, new_post.slug
  end

  def test_having_same_ending_substring_in_title_doesnt_break_slug_generation
    title_having_new_title_as_ending_substring = "Go for grocery shopping and buy apples"
    new_title = "buy apples"
    existing_post = create(:post, title: title_having_new_title_as_ending_substring)
    assert_equal title_having_new_title_as_ending_substring.parameterize, existing_post.slug
    new_post = create(:post, title: new_title)
    assert_equal new_title.parameterize, new_post.slug
  end

  def test_having_numbered_slug_substring_in_title_doesnt_affect_slug_generation
    title_with_numbered_substring = "buy 2 apples"
    existing_post = create(:post, title: title_with_numbered_substring)
    assert_equal title_with_numbered_substring.parameterize, existing_post.slug
    substring_of_existing_slug = "buy"
    new_post = create(:post, title: substring_of_existing_slug)
    assert_equal substring_of_existing_slug.parameterize, new_post.slug
  end
end
