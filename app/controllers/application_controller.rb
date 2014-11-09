class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  def make_request(url)
    response = RestClient.get(url) do |response, request, result|
      return false if response.code == 400
      response
    end
    JSON.parse(response)
  end
end
