# frozen_string_literal: true

class MypostsController < ApplicationController
  def index
    @posts = current_user.posts.includes(:categories)
    @posts = MypostsFilterService.new(@posts, my_post_filters).apply_filters
  end

  def bulk_delete
    current_user.posts.selected_posts(bulk_delete_params[:ids]).destroy_all
    render_notice(t("successfully_deleted_all", entity: "Posts"))
  end

  def bulk_status_update
    current_user.posts.selected_posts(bulk_update_params[:ids]).each do |post|
      post.update(status: bulk_update_params[:status])
    end
    render_notice(t("successfully_updated_all", entity: "Posts"))
  end

  private

    def my_post_filters
      params.fetch(:filters, {}).permit(:title, :status, category_ids: [])
    end

    def bulk_delete_params
      params.permit(ids: [])
    end

    def bulk_update_params
      params.require(:update).permit(:status, ids: [])
    end
end
