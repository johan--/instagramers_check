# == Schema Information
#
# Table name: instagramers
#
#  id           :integer          not null, primary key
#  instagram_id :integer          not null
#  username     :string(255)      not null
#  created_at   :datetime
#  updated_at   :datetime
#  media        :integer
#  followed_by  :integer
#  follows      :integer
#

class Instagramer < ActiveRecord::Base
  validates :instagram_id, :username, presence: true
  validates :instagram_id, :username, uniqueness: true
  
  def not_valid?
    return false if (media.nil? || follows.nil? || followed_by.nil?)
    too_many_follows? || too_few_media?
  end
  
  def too_many_follows?
    follows > 3000
  end
  
  def too_few_media?
    media < 6 && followed_by > 400
  end
end
