module ApplicationHelper
  
  def make_request(url)
    @num_requests += 1
    response = RestClient.get(url) do |response, request, result|
      return false if response.code == 400
      response
    end
    JSON.parse(response)
  end
end
