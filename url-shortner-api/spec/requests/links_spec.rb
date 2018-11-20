# require 'rails_helper'

# RSpec.describe "Links", type: :request do
#   describe "GET /api/v1/links" do
#     it "returns all links" do
#       get api_v1_links_path
#       expect(response).to be_successful
#     end
#   end

#   describe "POST /api/v1/links" do
#     before do 
#       @link = FactoryBot.create(:link)
#     end
    
#     context "with valid params" do
#       it "creates a new link" do
#         link_params = FactoryBot.attributes_for(:link)
#         expect {
#           post api_v1_links_path, params: {link: link_params}
#         }.to change(Link, :count).by(1)
#       end
#       it "renders a JSON response with the new link" do
#         link_params = FactoryBot.attributes_for(:link)
#         post api_v1_links_path, params: {link: link_params}
#         expect(response).to have_http_status(:success)
#         expect(response.content_type).to eq('application/json')
#       end
#     end

#     context "with invalid params" do
#       it "renders a JSON response with errors for the new link" do
#         link_params = FactoryBot.attributes_for(:link, :invalid)
#         post api_v1_links_path, params: {link: link_params}
#         expect(response).to have_http_status(:unprocessable_entity)
#         expect(response.content_type).to eq('application/json')
#       end
#     end
#   end
# end
