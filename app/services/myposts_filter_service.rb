# frozen_string_literal: true

class MypostsFilterService
  def initialize(posts, filters)
    @posts = posts
    @filters = filters || {}
  end

  def process!
    filter_by_title
    filter_by_categories
    filter_by_status

    @posts
  end

  def filter_by_categories
    return unless @filters[:category_ids].present?

    @posts = @posts.joins(:categories).where(categories: { id: @filters[:category_ids] })
  end

  def filter_by_title
    @posts = @posts.where("title LIKE ?", "%#{@filters[:title]}%") if @filters[:title].present?
  end

  def filter_by_status
    @posts = @posts.where(status: @filters[:status]) if @filters[:status].present?
  end
end
