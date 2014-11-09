class InstagramersController < ApplicationController
  TOKENS = ["8413639.1fb234f.c0f10cda7f6e4234bc23be65137d5826"]
  before_action :ensure_tokens
    
  def index
    
    render :index
  end
  
  def check_followers
    @username = params.require(:instagramer).permit(:username)
    @id = get_id(@username)
    
    url = "https://api.instagram.com/v1/users/#{@id}/followed-by?#{access_token}"
    valids, not_valids = 0, 0
    while true
      parsed_response = make_request(url)
      p parsed_response["data"].count
      parsed_response["data"].each do |follower|
        @num_followers += 1
        is_valid?(follower["id"]) ? not_valids += 1 : valids += 1
      end
      break if parsed_response["pagination"]["next_url"].nil?
      url = parsed_response["pagination"]["next_url"]
    end
    @result = [valids, not_valids]
    
    render :index
  end
  
  def get_id(username)
    url = "https://api.instagram.com/v1/users/search?q=[#{username}]&#{access_token}"
    parsed_response = make_request(url)
    parsed_response["data"].first["id"]
  end
  
  private
  
  def is_valid?(id)
    many_followings?(id)
  end
  
  def access_token
    @access_tokens.first
  end
  
  def ensure_tokens
    @access_tokens = []
    TOKENS.each do |token|
      @access_tokens << "access_token=#{token}"
    end
  end
end
