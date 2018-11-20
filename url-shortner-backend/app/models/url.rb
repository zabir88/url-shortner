class Url < ApplicationRecord
  require 'uri'
  require 'open-uri'
  require 'nokogiri'

  validates :original_url, presence: true 
  validates :original_url, format: {with: URI::regexp(%w(http https)), message: 'Please enter a valid url.'}

  def url_shortner
    slug = self.id.to_s
    "shorty.li/#{slug}" 
  end

  def get_title
    Nokogiri::HTML(open(self.original_url)).title
  end
  handle_asynchronously :get_title

end
