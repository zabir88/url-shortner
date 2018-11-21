class Url < ApplicationRecord
  require 'uri'
  require 'open-uri'
  require 'nokogiri'

  validates :original_url, presence: true 
  validates :original_url, format: {with: URI::regexp(%w(http https)), message: 'Please enter a valid url.'}

  #Url shortner algorithm
  def url_shortner
    slug = self.id.to_s
    "shorty.li/#{slug}" 
  end

  # Title scraping algorithm
  def update_title
    title = Nokogiri::HTML(open(self.original_url)).title
    self.update(title: title)
  end
  handle_asynchronously :update_title
end
