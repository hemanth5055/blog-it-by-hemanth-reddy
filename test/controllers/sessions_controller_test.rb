# frozen_string_literal: true

require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @user_headers = headers(@user)
  end

  def test_should_login_with_valid_credentials
    post session_path,
      params: { login: { email: @user.email, password: @user.password } },
      as: :json
    assert_response :success
  end

  def test_should_not_login_with_invalid_password
    post session_path,
      params: { login: { email: @user.email, password: "wrongpassword" } },
      as: :json
    assert_response :unauthorized
    response_json = response.parsed_body
    assert_equal I18n.t("session.incorrect_credentials"), response_json["error"]
  end

  def test_should_not_login_with_invalid_email
    post session_path,
      params: { login: { email: "nonexistent@example.com", password: @user.password } },
      as: :json
    assert_response :not_found
  end

  def test_should_logout_authenticated_user
    delete session_path, headers: @user_headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("logged_out"), response_json["notice"]
  end
end
