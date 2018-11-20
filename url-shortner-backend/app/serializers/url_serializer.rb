class UrlSerializer < ActiveModel::Serializer
  attributes :id, :original_url, :shortened_url, :click, :title
end
