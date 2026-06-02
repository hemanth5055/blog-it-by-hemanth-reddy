# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.includes(:categories).all
    render status: :ok, json: {
      posts: posts.as_json(methods: :category_ids)
    }
end

  def create
    post = Post.new(post_params)
    post.save!
    render_notice("Post was successfully created")
  end

  def show
    post = Post.includes(:categories).find_by(slug: params[:slug])
    render status: :ok, json: {
      post: post.as_json(methods: :category_ids)
    }
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :user_id, :organization_id, category_ids: [])
    end
end
