# frozen_string_literal: true

class User < ApplicationRecord
  MINIMUM_PASSWORD_LENGTH = 8
  belongs_to :organization
  has_secure_password
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, length: { minimum: MINIMUM_PASSWORD_LENGTH }
end
