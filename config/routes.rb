Rails.application.routes.draw do
  # devise_for :users
  namespace :api do
    namespace :v1 do
      get 'recipes/index'
      post 'recipes/create'
      get '/show/:id', to: 'recipes#show'
      delete '/destroy/:id', to: 'recipes#destroy'


      get 'students/index'
      post 'students/create'
      get '/student/show/:id', to: 'students#show'
      get '/student/:id/edit', to: 'students#edit'
      put '/student/:id', to: 'students#update'
      delete '/student/destroy/:id', to: 'students#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'

  devise_for :users, controllers: { sessions: 'users/sessions' }   
  devise_scope :user do
    get 'sign_in', to: 'devise/sessions#new'
    get '/users/sign_out' => 'devise/sessions#destroy'
  end
  resources :homes
  # root to: 'homes#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
