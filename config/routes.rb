# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :posts, only: %i[index create show destroy update], param: :slug do
   collection do
     get :mypost
   end
 end
    resources :categories, only: %i[index create]
    resources :users, only: :create
    resource :session, only: %i[create destroy]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
