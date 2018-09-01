require 'rails_helper'

RSpec.describe "Links", type: :request do
  describe "GET /api/v1/links" do
    it "returns all links " do
      get api_v1_links_path
      expect(response).to have_http_status(200)
    end
  end

  describe "POST #create" do
  end
end
