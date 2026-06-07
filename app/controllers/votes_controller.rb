# frozen_string_literal: true

class VotesController < ApplicationController
  def update
    @vote = Vote.find_or_initialize_by(
      post_id: vote_params[:post_id],
      user_id: current_user.id
    )

    is_up = vote_params[:vote_type] == "up"
    @vote.vote_type = is_up ? 1 : -1

    if @vote.new_record?
      delta = is_up ? 1 : -1
      @vote.post.update!(net_votes: @vote.post.net_votes + delta)
    else
      delta = is_up ? 2 : -2
      @vote.post.update!(net_votes: @vote.post.net_votes + delta)
    end
    @vote.save!
  end

  private

    def vote_params
      params.require(:vote_update).permit(:post_id, :vote_type)
    end
end
