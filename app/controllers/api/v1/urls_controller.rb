module Api 
  module V1
    class UrlsController < ApplicationController
      before_action :set_url, only: [:update]
      
      def index
        per_page = 5
        @total = Url.limit(100).count
        @urls = Url.paginate(:page => params[:page], :per_page => per_page, :total_entries => 100).order(click: :desc, id: :asc)
        render json: {total: @total, per_page: per_page, urls: @urls}
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
