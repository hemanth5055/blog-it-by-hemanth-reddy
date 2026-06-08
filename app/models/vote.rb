# frozen_string_literal: true

class Vote < ApplicationRecord
  enum :vote_type, { up: 1, down: -1, neutral: 0 }
  belongs_to :post
  belongs_to :user
end
