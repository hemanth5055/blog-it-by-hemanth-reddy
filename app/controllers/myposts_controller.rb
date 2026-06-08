# frozen_string_literal: true

class MypostsController < ApplicationController
  def index
    @posts = current_user.posts.includes(:categories)
    @posts = MypostsFilterService.new(@posts, my_post_filters).process!
  end

  def bulk_delete
    current_user.posts.selected_posts(bulk_delete_params[:ids]).destroy_all
    render_notice(t("successfully_deleted_all", entity: "Posts"))
  end

  def bulk_status_update
    check_valid_status_option
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

    def check_valid_status_option
      unless Post.statuses.keys.include?(bulk_update_params[:status])
        render_error(t("invalid_status_option"))
      end
    end
end
