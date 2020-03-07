Rails.application.routes.draw do
  # namespace :api do
  #   namespace :v1 do
  #   
  #   end
  # end
  namespace :api do
    namespace :v1 do
      get 'recipes/index'
      post 'recipes/create'
      get '/show/:id', to: 'recipes#show'
      delete '/destroy/:id', to: 'recipes#destroy'


      get 'students/index'
      post 'students/create'
      get '/student/show/:id', to: 'students#show'
      get '/student/edit/:id', to: 'students#edit'
      put '/student/:id', to: 'students#update'
      delete '/student/destroy/:id', to: 'students#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
