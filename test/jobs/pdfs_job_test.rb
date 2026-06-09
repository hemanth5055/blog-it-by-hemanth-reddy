# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class PdfsJobTest < ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods

  def setup
    Sidekiq::Testing.fake!
    @user = create(:user)
    @post_slug = "my-post"
    @pdf_path = Rails.root.join("tmp/#{@post_slug}").to_s
  end

  def teardown
    Sidekiq::Testing.disable!
    PdfsJob.jobs.clear
  end

  def test_enqueues_job_with_correct_arguments
    PdfsJob.perform_async(@user.id, @post_slug, @pdf_path)

    assert_equal 1, PdfsJob.jobs.size
    assert_equal [@user.id, @post_slug, @pdf_path], PdfsJob.jobs.last["args"]
  end

  def test_raises_when_user_does_not_exist
    assert_raises(ActiveRecord::RecordNotFound) do
      PdfsJob.new.perform(-1, "my-post", "/tmp/my-post")
    end
  end
end
