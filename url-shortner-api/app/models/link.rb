class Link < ApplicationRecord
  require 'uri'
  validates :original_url, presence: true 
  validates :original_url, format: {with: URI::regexp(%w(http https)), message: 'Please enter a valid url.'}

  def shortened_url(given_slug)
    given_slug == "" ? slug = self.id.to_s : slug = given_slug
    "shorty.li/#{slug}" 
  end
end
