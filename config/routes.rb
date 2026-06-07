# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :posts, only: %i[index create show destroy update], param: :slug
    resources :categories, only: %i[index create]
    resources :users, only: :create
    resource :session, only: %i[create destroy]
    resources :myposts, only: :index do
    collection do
      delete "bulk_delete"
      patch "bulk_status_update"
    end
  end
    resource :votes, only: %i[update], via: :patch
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
