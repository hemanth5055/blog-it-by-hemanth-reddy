# frozen_string_literal: true

class VotesController < ApplicationController
  def update
    @vote = Vote.find_or_initialize_by(
      post_id: vote_params[:post_id],
      user_id: current_user.id
    )

    current_value = @vote.new_record? ? 0 : Vote.vote_types[@vote.vote_type]
    next_value = Vote.vote_types[vote_params[:vote_type]]
    change = next_value - current_value

    return head :no_content if change.zero?

    ActiveRecord::Base.transaction do
      @vote.vote_type = vote_params[:vote_type]
      @vote.save!
      @vote.post.update!(net_votes: @vote.post.net_votes + change)

    end

    render json: { net_votes: @vote.post.net_votes }, status: :ok
  end

  private

    def vote_params
      params.require(:vote_update).permit(:post_id, :vote_type)
    end
end
