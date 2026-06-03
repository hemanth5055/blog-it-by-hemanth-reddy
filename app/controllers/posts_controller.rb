# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    user_categories = params[:categories].presence
    puts @current_user.organization_id
    @posts = Post.includes(:categories).where(organization_id: @current_user.organization_id)
    @posts = @posts.where(categories: { id: user_categories }) if user_categories
    render
 end

  def create
    full_params = post_params.merge(
      organization_id: @current_user.organization_id,
      user_id: @current_user.id
    )

    post = Post.create!(full_params)
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    @post = Post.find_by!(slug: params[:slug])
    render
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, category_ids: [])
    end
end
