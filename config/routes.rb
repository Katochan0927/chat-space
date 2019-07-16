Rails.application.routes.draw do
  root to: "messages#index"
  devise_for :users
  resources :messages, only: :index
  resources :users, only: [:edit, :update]
end
