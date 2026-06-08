# frozen_string_literal: true

class MypostsFilterService
  def initialize(posts, filters)
    @posts = posts
    @filters = filters || {}
  end

  def apply_filters
    @posts = @posts.where("title LIKE ?", "%#{@filters[:title]}%") if @filters[:title].present?
    filter_by_categories
    @posts = @posts.where(status: @filters[:status]) if @filters[:status].present?

    @posts
  end

  def filter_by_categories
    return unless @filters[:category_ids].present?

    @posts = @posts.joins(:categories).where(categories: { id: @filters[:category_ids] })
  end
end
