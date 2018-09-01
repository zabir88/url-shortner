class LinkSerializer < ActiveModel::Serializer
  attributes :id, :original_url, :short_url, :given_slug
end