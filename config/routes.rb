Rails.application.routes.draw do
  root to: 'posts#index'
  post 'posts', to: 'posts#create'      #メモ投稿機能(Ajax)
  get 'posts/:id', to: 'posts#checked'     #既読機能(Ajax)
end
