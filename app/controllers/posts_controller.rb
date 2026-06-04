# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    user_categories = params[:categories].presence
    @posts = Post.includes(:categories).published.where(organization_id: @current_user.organization_id)
    @posts = @posts.where(categories: { id: user_categories }) if user_categories
    render
  end

  def create
    full_params = post_params.merge(
      organization_id: @current_user.organization_id,
      user_id: @current_user.id
    )

    post = Post.create!(full_params)
    authorize post
    render_notice(t("successfully_created", entity: "Post"))
  end

  def mypost
    @posts = Post.includes(:categories).where(user_id: current_user.id)
    render
  end

  def show
    @post = Post.find_by!(slug: params[:slug])
    authorize @post
    @isOwner = @post.user_id == current_user.id
    render
  end

  def update
    @post = Post.find_by!(slug: params[:slug])
    authorize @post
    @post.update!(post_params)
    render_notice(t("successfully_updated", entity: "Post")) unless params.key?(:quiet)
  end

  def destroy
    @post = Post.find_by!(slug: params[:slug])
    authorize @post
    @post.destroy!
    render_notice(t("successfully_deleted", entity: "Post"))
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :status, category_ids: [],)
    end
end
