# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    user_categories = params[:categories].presence

    @posts = Post.includes(:categories)
    @posts = @posts.where(categories: { id: user_categories }) if user_categories
    render
 end

  def create
    post = Post.new(post_params)
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    @post = Post.find_by!(slug: params[:slug])
    render
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :user_id, :organization_id, category_ids: [])
    end
end
