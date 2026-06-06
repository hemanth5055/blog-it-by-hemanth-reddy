# frozen_string_literal: true

class Post < ApplicationRecord
  MAX_TITLE_LENGTH = 125
  MAX_DESC_LENGTH = 10_000

  enum :status, { published: 1, draft: 0 }, default: :published
  belongs_to :organization
  belongs_to :user
  has_and_belongs_to_many :categories, join_table: :posts_categories

  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }
  validates :description, presence: true, length: { maximum: MAX_DESC_LENGTH }
  validates_inclusion_of :is_bloggable, in: [true, false]
  validates :slug, uniqueness: true
  validate :slug_not_changed
  validates :status, presence: true
  before_create :set_slug
  before_save :set_last_updated_at_for_only_post_that_are_being_published

  private

    def set_slug
      title_slug = title.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_post_slug = Post.where(
        regex_pattern,
        "^#{title_slug}$|^#{title_slug}-[0-9]+$"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_post_slug.present?
        slug_count = latest_post_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if will_save_change_to_slug? && self.persisted?
        errors.add(:slug, I18n.t("post.slug.immutable"))
      end
   end

    def set_last_updated_at_for_only_post_that_are_being_published
      should_update = new_record? ||
        (published? && status_changed?) ||
        (published? && !status_changed? && changed?)

      self.last_updated_at = Time.current if should_update
 end
end
