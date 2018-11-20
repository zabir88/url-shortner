FactoryBot.define do
  factory :url do
    original_url { "facebook.com" }
    shortened_url { "shorty.li/1" }
    click { 0 }
    title { "facebook" }
  end
end
