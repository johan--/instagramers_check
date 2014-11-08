Rails.application.routes.draw do
  root to: "instagramers#index"
  
  post '/instagramers', to:"instagramers#check_followers"
end
