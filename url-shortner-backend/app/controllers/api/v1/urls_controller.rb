module Api 
  module V1
    class UrlsController < ApplicationController
      before_action :set_url, only: [:show]
      include ActionController::Serialization
      # GET /urls
      def index
        @urls = Url.order(click: :desc).first(100)
        render json: @urls
      end

      # GET /urls/1
      def show
        @url.click += 1
        @url.save
        redirect_to @url.original_url
      end

      # POST /urls
      def create
        @url = Url.new(url_params)

        if @url.save
          title = @url.get_title
          byebug
          @url.update(shortened_url: @url.url_shortner, title: title)
          render json: @url, status: :created, location: @url
        else
          render json: @url.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /urls/1
      # def update
      #   if @url.update(url_params)
      #     render json: @url
      #   else
      #     render json: @url.errors, status: :unprocessable_entity
      #   end
      # end

      # DELETE /urls/1
      # def destroy
      #   @url.destroy
      # end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_url
          @url = Url.find(params[:id])
        end

        # Only allow a trusted parameter "white list" through.
        def url_params
          params.require(:url).permit(:original_url)
        end
    end
  end
end 
