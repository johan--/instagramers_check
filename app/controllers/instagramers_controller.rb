class InstagramersController < ApplicationController
  TOKENS = ["8413639.1fb234f.c0f10cda7f6e4234bc23be65137d5826"]
  before_action :ensure_tokens
    
  def index
    
    render :index
  end
  
  def check_followers
    @username = params.require(:instagramer).permit(:username)[:username]
    @id = get_id(@username)
    @num_followers = 0
    
    if @id.nil?
      flash[:errors] = ["Username not found!"]
      redirect_to root_url
    else
      url = "https://api.instagram.com/v1/users/#{@id}/followed-by?#{access_token}"
      valids, not_valids = 0, 0
      while true
        parsed_response = make_request(url)
        parsed_response["data"].each do |follower|
          @num_followers += 1
          puts "requesting follower ##{@num_followers}"
          is_valid?(follower["id"], follower["username"]) ? not_valids += 1 : valids += 1
        end
        break if parsed_response["pagination"]["next_url"].nil?
        url = parsed_response["pagination"]["next_url"]
      end
      @result = [valids, not_valids]
    
      render :index
    end
  end
    
  private
  
  def access_token
    @access_tokens.first
  end
  
  def ensure_tokens
    @access_tokens = []
    TOKENS.each do |token|
      @access_tokens << "access_token=#{token}"
    end
  end
  
  def get_id(username)
    url = "https://api.instagram.com/v1/users/search?q=[#{username}]&#{access_token}"
    parsed_response = make_request(url)
    instagramer = parsed_response["data"].select do |instagramer|
      instagramer["username"] == username
    end
    p instagramer
    return nil if instagramer.empty?
    instagramer.first["id"]
  end
  
  def is_valid?(id, username)
    @instagramer = Instagramer.find_by(instagram_id: id)
    if @instagramer.nil?
      url = "https://api.instagram.com/v1/users/#{id}/?#{access_token}"
      parsed_info = make_request(url)
      unless parsed_info
        @instagramer = Instagramer.create!(username: username,
                                           instagram_id: id)
        return true
      end
      @instagramer = Instagramer.create!(instagramer_params(parsed_info))
    end
    @instagramer.is_valid?
  end
  
  def instagramer_params(parsed_info)
    username = parsed_info["data"]["username"]
    instagram_id = parsed_info["data"]["id"]
    media = parsed_info["data"]["counts"]["media"]
    followed_by = parsed_info["data"]["counts"]["followed_by"]
    follows = parsed_info["data"]["counts"]["follows"]
    
    {username: username, instagram_id: instagram_id, media: media,
      followed_by: followed_by, follows: follows}
  end
end
