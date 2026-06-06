# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    title { Faker::Book.title }
    description { Faker::Lorem.paragraph }
    status { "published" }
    association :user
    association :organization

    transient do
      categories_count { 2 }
    end

    before(:create) do |post, evaluator|
      post.categories = create_list(:category, evaluator.categories_count)
    end

    trait :draft do
      status { "draft" }
    end

    trait :without_categories do
      transient do
        categories_count { 0 }
      end
    end
  end
end
