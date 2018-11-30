class Url < ApplicationRecord
  require 'uri'
  require 'open-uri'
  require 'nokogiri'
  require 'base62-rb'

  # validates :shortened_url, uniqueness: true
  # validates :original_url, presence: true 
  # validates :original_url, format: {with: URI::regexp(%w(http https)), message: 'Please enter a valid url.'}
  
  # Url shortner algorithm
  def url_shortner
    # Slug using primary id and converting to base 62 string
    slug = Base62.encode(self.id)
    # Second option using create_at and extracting the month date year hour min second and converting to base 62 string
    #slug = Base62.encode(self.create_at.strftime('%Y%m%d%H%M%S').to_i)
    "#{slug}" 
  end

  # Title scraping algorithm
  def update_title
    title = Nokogiri::HTML(open(self.original_url)).title
    self.update(title: title)
  end
  handle_asynchronously :update_title
end
