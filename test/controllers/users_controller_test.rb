# frozen_string_literal: true

require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @existing_user = create(:user, organization: @organization)
  end

  def test_should_create_valid_user
    assert_difference "User.count", 1 do
      post users_path,
        params: {
          user: {
            name: "John Doe",
            email: "john@example.com",
            password: "password",
            password_confirmation: "password",
            organization_id: @organization.id
          }
        }, as: :json
    end
    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_created", entity: "User"), response_json["notice"]
  end

  def test_should_not_create_user_without_email
    post users_path,
      params: {
        user: {
          name: "No Email",
          email: "",
          password: "password",
          password_confirmation: "password",
          organization_id: @organization.id
        }
      }, as: :json
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_match /Email/, response_json["error"]
  end

  def test_should_not_create_user_without_name
    post users_path,
      params: {
        user: {
          name: "",
          email: "noname@example.com",
          password: "password",
          password_confirmation: "password",
          organization_id: @organization.id
        }
      }, as: :json
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_match /Name/, response_json["error"]
  end

  def test_should_not_create_user_with_mismatched_passwords
    post users_path,
      params: {
        user: {
          name: "Mismatch User",
          email: "mismatch@example.com",
          password: "password",
          password_confirmation: "differentpassword",
          organization_id: @organization.id
        }
      }, as: :json
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_match /Password confirmation/, response_json["error"]
  end

  def test_should_not_create_user_with_duplicate_email
    post users_path,
      params: {
        user: {
          name: "Duplicate",
          email: @existing_user.email,
          password: "password",
          password_confirmation: "password",
          organization_id: @organization.id
        }
      }, as: :json
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_match /Email/, response_json["error"]
  end
end
