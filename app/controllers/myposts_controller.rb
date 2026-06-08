# frozen_string_literal: true

class MypostsController < ApplicationController
  def index
    @posts = Post.includes(:categories).where(user_id: current_user.id)
    apply_filters
  end

  def bulk_delete
    @posts = Post.where(user_id: current_user.id, id: bulk_delete_params[:ids]).destroy_all
    render_notice(t("successfully_deleted_all", entity: "Posts"))
  end

  def bulk_status_update
    Post.where(user_id: current_user.id, id: bulk_update_params[:ids]).each do |post|
      post.update(status: bulk_update_params[:status])
    end
    render_notice(t("successfully_updated_all", entity: "Posts"))
  end

  private

    def my_post_filters
      params.permit(:title, :status, category_ids: [])
    end

    def bulk_delete_params
      params.permit(ids: [])
    end

    def bulk_update_params
      params.permit(:status, ids: [])
    end

    def apply_filters
      @posts = @posts.where("title LIKE ?", "%#{my_post_filters[:title]}%") if my_post_filters[:title].present?
      filter_by_categories
      @posts = @posts.where(status: my_post_filters[:status]) if my_post_filters[:status].present?
    end

    def filter_by_categories
      return @posts unless my_post_filters[:category_ids].present?

      @posts = @posts.where(categories: { id: my_post_filters[:category_ids] })
    end
end
