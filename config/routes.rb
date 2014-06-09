Retrocade::Application.routes.draw do

  get "comments/create"
  match 'help', to: 'help#show', via: 'get'
  # get "home/home"
  match '/signup',  to: 'users#new',            via: 'get'
  match '/signin',  to: 'sessions#new',         via: 'get'
  match '/signout', to: 'sessions#destroy',     via: 'delete'
  match '/votes',   to: 'votes#create',         via: 'post'
  match '/votes',   to: 'votes#create',         via: 'patch'
  match '/game_highscores', to: 'highscores#show_game_highscores', via:'get'
  resources :users
  resources :games do
    member do
      get 'play'
      post 'save_new_version'
      post 'change_version'
      delete 'delete_version'
      post 'toggle_enabled'
    end
  end

  resources :sessions, only: [:new, :create, :destroy]
  resources :highscores
  resources :js_libraries do
    member do
      post 'toggle_enabled'
    end
  end

  resources :comments, only: [:create]


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'home#home'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
