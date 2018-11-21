FactoryBot.define do
  factory :url do
    original_url { "https://facebook.com" }
    shortened_url { nil }
    click { 0 }
    title { nil }

    trait :invalid do
      original_url {nil}
    end
  end
end
