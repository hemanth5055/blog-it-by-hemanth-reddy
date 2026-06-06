# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    user_categories = params[:categories].presence
    @posts = Post.includes(:categories, :user).published.where(organization_id: @current_user.organization_id)
    @posts = @posts.where(categories: { id: user_categories }) if user_categories
    @posts = @posts.order(updated_at: :desc)
    render
  end

  def create
    full_params = post_params.merge(
      organization_id: @current_user.organization_id,
      user_id: @current_user.id
    )

    post = Post.includes(:categories, :user).create!(full_params)
    authorize post
    render_notice(t("successfully_created", entity: "Post"))
  end

  def mypost
    puts my_post_filters.to_json
    @posts = Post.includes(:categories).where(user_id: current_user.id)
    @posts = @posts.where(title: my_post_filters[:title]) if my_post_filters[:title].present?
    @posts = @posts.where(categories: { id: my_post_filters[:category_ids] }) if my_post_filters[:category_ids].present?
    @posts = @posts.where(status: my_post_filters[:status]) if my_post_filters[:status].present?
    render
  end

  def show
    @post = Post.includes(:categories).find_by!(slug: params[:slug])
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

    def my_post_filters
      params.permit(:title, :status, category_ids: [],)
    end
end
