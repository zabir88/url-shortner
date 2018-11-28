module Api 
  module V1
    class UrlsController < ApplicationController
      before_action :set_url, only: [:update]
      include ActionController::Serialization
      
      def index
        @urls = Url.order(click: :desc).first(100)
        render json: @urls
      end

      def update
        @url.click += 1 # Click count is increased on every click on the sortened url.
        @url.save
        redirect_to @url.original_url
      end

      def create
        @url = Url.new(url_params)
        if @url.save
          @url.update(shortened_url: @url.url_shortner)
          @url.update_title #Async Call
          render json: @url, status: :created
        else
          render json: @url.errors, status: :unprocessable_entity
        end
      end

      private
        def set_url
          @url = Url.find(params[:id])
        end
        
        def url_params
          params.require(:url).permit(:original_url)
        end
    end
  end
end 
