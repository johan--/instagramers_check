class Instagramers < ActiveRecord::Base
  validates :instagram_id, :username,
            :num_followers, :num_following, presence: true
  validates :instagram_id, :username, uniqueness: true
  
  def many_followings?(id)
    num_following(id) > 500
  end
  
  def num_following(id)
    url = "https://api.instagram.com/v1/users/#{id}/?#{access_token}"
    puts "requesting #{@num_requests}..."
    parsed_response = make_request(url)
    return 0 unless parsed_response
    parsed_response["data"]["counts"]["follows"]
  end
end
