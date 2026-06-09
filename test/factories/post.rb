# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    title { Faker::Book.title }
    description { Faker::Lorem.paragraph }
    status { "published" }
    association :user
    association :organization
  end
end
