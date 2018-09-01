FactoryBot.define do
  factory :link do
    original_url {"facebook.com"}
    given_slug {"sl1"}
  
    trait :invalid do
      original_url {nil}
    end
  end
end
