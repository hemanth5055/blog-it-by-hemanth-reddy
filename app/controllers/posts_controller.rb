# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: %i[show update destroy]
  def index
    @posts = policy_scope(Post).includes(:categories, :user, :votes)
    @posts = filter_by_categories(@posts)
    @posts = @posts.order(created_at: :desc)
    render
  end

  def create
    full_params = post_params.merge(
      organization_id: @current_user.organization_id,
      user_id: @current_user.id
    )

    post = Post.new(full_params)
    authorize post
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    authorize @post
    render
  end

  def update
    authorize @post
    @post.update!(post_params)
    render_notice(t("successfully_updated", entity: "Post")) unless params.key?(:quiet)
  end

  def destroy
    authorize @post
    @post.destroy!
    render_notice(t("successfully_deleted", entity: "Post"))
  end

  private

    def load_post!
      @post = Post.find_by!(slug: params[:slug], organization_id: current_user.organization_id)
    end

    def post_params
      params.require(:post).permit(:title, :description, :status, category_ids: [],)
    end

    def filter_by_categories(posts)
      return posts unless params[:categories].present?

      posts.joins(:categories).where(categories: { id: params[:categories] })
    end
end
