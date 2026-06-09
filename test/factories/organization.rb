# frozen_string_literal: true

FactoryBot.define do
  factory :organization do
    name { Faker::Lorem.word.then { |w| w.length >= 3 ? w : "#{w}#{SecureRandom.hex(2)}" } }
  end
end
