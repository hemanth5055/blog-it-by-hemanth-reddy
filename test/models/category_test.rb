# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = create(:category)
  end

  def test_category_should_not_be_valid_and_saved_without_name
    @category.name = ""
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Name is too short (minimum is 3 characters)"
  end

  def test_name_should_be_of_valid_length
    @category.name = "a" * (Category::MIN_NAME_LENGTH - 1)
    assert @category.invalid?
  end

  def test_name_should_be_unique
    duplicate_category = @category.dup
    duplicate_category.name = @category.name.upcase
    assert_not duplicate_category.valid?
    assert_includes duplicate_category.errors.full_messages, "Name has already been taken"
  end
end
