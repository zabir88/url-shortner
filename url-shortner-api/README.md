# README

To run the api:
Assuming you have ruby installed.

1. Unzip/extract the folder.
2. cd into the folder. This will create a gemset named url-shortner-api.
3. run bundle.
4. run rails db:create
5. run rails db:migrate
6. then run rails s

To post data: 
I used curl to post data in development. Assuming you have curl installed
1. For user provided slug run curl -X POST -H "Content-Type: application/json" http://localhost:3000/api/v1/links -d '{"link": {"original_url": "facebook.com", "given_slug": "dsasdf"}}'
2. For default slug run curl -X POST -H "Content-Type: application/json" http://localhost:3000/api/v1/links -d '{"link": {"original_url": "facebook.com", "given_slug": ""}}'

To see data:
I have provided the index route as well to easily see the data posted (localhost:3000/api/v1/links).

To run test suite:
simply run rspec.

Note: I used active_model_serializers gem to serialize the data. I used rspec and factory_bot_rails gems for testing.

If you have any questions about the api please contact me at zabir8809@gmail.com.
