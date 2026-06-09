# frozen_string_literal: true

require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @other_user = create(:user, organization: @organization)
    @category = create(:category)
    @post = create(:post, user: @user, organization: @organization)
    @user_headers = headers(@user)
    @other_user_headers = headers(@other_user)
  end

  def test_should_list_all_posts_for_valid_user
    get posts_path, headers: @user_headers
    assert_response :success
    response_json = response.parsed_body
    assert_includes response_json.keys, "posts"
  end

  def test_should_list_posts_filtered_by_category
    post_with_category = create(:post, user: @user, organization: @organization, categories: [@category])
    get posts_path, params: { categories: [@category.id] }, headers: @user_headers
    assert_response :success
    response_json = response.parsed_body
    returned_ids = response_json["posts"].pluck("id")
    assert_includes returned_ids, post_with_category.id
  end

  def test_should_not_list_posts_from_other_organizations
    other_org = create(:organization)
    other_post = create(:post, user: create(:user, organization: other_org), organization: other_org)
    get posts_path, headers: @user_headers
    assert_response :success
    response_json = response.parsed_body
    returned_ids = response_json["posts"].pluck("id")
    assert_not_includes returned_ids, other_post.id
  end

  def test_posts_are_returned_in_descending_order_of_creation
    older_post = create(:post, user: @user, organization: @organization, created_at: 2.days.ago)
    newer_post = create(:post, user: @user, organization: @organization, created_at: 1.day.ago)
    get posts_path, headers: @user_headers
    assert_response :success
    response_json = response.parsed_body
    returned_ids = response_json["posts"].pluck("id")
    assert returned_ids.index(newer_post.id) < returned_ids.index(older_post.id)
  end

  def test_should_create_valid_post
    post posts_path,
      params: { post: { title: "New Feature Request", description: "Details here", category_ids: [@category.id] } },
      headers: @user_headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_created", entity: "Post"), response_json["notice"]
  end

  def test_should_not_create_post_without_title
    post posts_path,
      params: { post: { title: "", description: "Details here" } },
      headers: @user_headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_match /Title/, response_json["error"]
  end

  def test_created_post_belongs_to_current_user_and_organization
    assert_difference "Post.count", 1 do
      post posts_path,
        params: { post: { title: "Org Post", description: "Scoped correctly" } },
        headers: @user_headers
    end
    created_post = Post.last
    assert_equal @user.id, created_post.user_id
    assert_equal @organization.id, created_post.organization_id
  end

  def test_should_show_post_for_valid_slug
    get post_path(@post.slug), headers: @user_headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal @post.id, response_json["post"]["id"]
  end

  def test_not_found_error_rendered_for_invalid_post_slug
    get post_path("invalid-slug"), headers: @user_headers
    assert_response :not_found
    response_json = response.parsed_body
    assert_equal I18n.t("not_found", entity: "Post"), response_json["error"]
  end

  def test_should_not_show_post_from_another_organization
    other_org = create(:organization)
    other_post = create(:post, user: create(:user, organization: other_org), organization: other_org)
    get post_path(other_post.slug), headers: @user_headers
    assert_response :not_found
  end

  def test_owner_can_update_post
    new_title = "#{@post.title}-(updated)"
    put post_path(@post.slug),
      params: { post: { title: new_title } },
      headers: @user_headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_updated", entity: "Post"), response_json["notice"]
    assert_equal new_title, @post.reload.title
  end

  def test_owner_can_update_post_categories
    new_category = create(:category)
    put post_path(@post.slug),
      params: { post: { category_ids: [new_category.id] } },
      headers: @user_headers
    assert_response :success
    assert_includes @post.reload.category_ids, new_category.id
  end

  def test_non_owner_shouldnt_update_post
    new_title = "#{@post.title}-(updated)"
    assert_no_changes -> { @post.reload.title } do
      put post_path(@post.slug),
        params: { post: { title: new_title } },
        headers: @other_user_headers
      assert_response :forbidden
    end
    response_json = response.parsed_body
    assert_equal I18n.t("authorization.denied"), response_json["error"]
  end

  def test_update_with_quiet_param_does_not_render_notice
    put post_path(@post.slug),
      params: { post: { title: "Silent update" }, quiet: true },
      headers: @user_headers
    assert_response :success
    response_json = response.parsed_body
    assert_nil response_json["notice"]
  end

  def test_shouldnt_update_post_with_invalid_data
    assert_no_changes -> { @post.reload.title } do
      put post_path(@post.slug),
        params: { post: { title: "" } },
        headers: @user_headers
      assert_response :unprocessable_entity
    end
  end

  def test_owner_can_destroy_post
    assert_difference "Post.count", -1 do
      delete post_path(@post.slug), headers: @user_headers
    end
    assert_response :ok
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_deleted", entity: "Post"), response_json["notice"]
  end

  def test_non_owner_should_not_destroy_post
    assert_no_difference "Post.count" do
      delete post_path(@post.slug), headers: @other_user_headers
    end
    assert_response :forbidden
    response_json = response.parsed_body
    assert_equal I18n.t("authorization.denied"), response_json["error"]
  end
end
