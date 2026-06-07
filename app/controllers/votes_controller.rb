# frozen_string_literal: true

class VotesController < ApplicationController
  def update
    vote = Vote.find_or_initialize_by(post_id: update_vote_params[:post_id], user_id: current_user.id)
    if update_vote_params[:vote_type] == "up"
      vote.vote_type = 1
    else
      vote.vote_type = -1
    end
    vote.save!
  end

  def update_vote_params
    params.require(:vote_update).permit(:post_id, :vote_type)
  end
end
