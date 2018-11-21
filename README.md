# URL Shortner Application

## To run the application in Development Environment
1. Clone the repository
```
$ git clone https://github.com/zabir8809/url-shortner-app.git
```

# Rails API Backend

## Prerequisites
1. .ruby-gemset file allows one to create application specific gemset.
2. .ruby-version file allows one to create application specific ruby version.
3. Postgresql database is used for the api.
4. Rails-api only is used to create the url-shortner api.
5. Rspec and factory bot is used for unit testing (grouped under development and test env in the Gemfile).
6. Spring-commands-rspec is used to run test suites faster if the dev server is already running.
7. Figaro is use to store ENV variables.
8. Active_model_serializers is used to serialize the end points.
9. Delayed_job is used for background job (Reason for chosing delayed_job over other 3rd parties background processor was because of the ease of integration with postgresql).
10. Nokogiri is used to scrape the title of the given url.
11. Rack Cors gem is used to allow CORS in develpoment env.

## To run the Rails Api server in development environment follow the steps
Assuming ruby is already installed, to setup and run the api in dev env follow the steps:
1. cd into the url-shortner-app folder. This will create a gemset named url-shortner.
2. Install all gems 
```
$ bundle install
```
3. Create database
```
$ rails db:create
```
4. Run migrations
```
$ rails db:migrate
```
5. To setup delayed_job run
```
$ rails generate delayed_job:active_record
```
6. Delayed Job works with postgresql database. To setup the table run
```
$ rails db:migrate
```
7. To setup figaro to store ENV varaibles run
```
$ bundle exec figaro install
``` 
This creates a commented config/application.yml file and adds it to your .gitignore

8. To setup rspec for the unit test run
```
$ rails g rspec:install
```
9. To setup rspec binstub run 
```
$ bundle exec spring binstub rspec
```
10. To start the sever run
```
$ rails s -p 8080
```
This will run the api on port 8080 since react frontend app will run on port 3000.
11. To start working off jobs in the development env, open another processor and run
```
$ rake jobs:work
```
12. Please check /config/initialzers/delayed_job_config.rb for delayed worker configurations.
13. To run rspec test run 
```
$ rspec
```

## Post Data
To post data to the api one can use the curl toolbox. Follow the example below:
```
$ curl -X POST -H "Content-Type: application/json" http://localhost:8080/api/v1/urls -d '{"url": {"original_url": "https://facebook.com"}}'
```
This will post a new data to the api.

## Algorithm used to generate shortened url
The shortest possible length of the shortened url is genereted using the primary id of the object created in the url table. The domain is kept constant for all objects(for example 'shorty.li') and the primary id of the object is appened to the domain of the shortened url. Few example:

given url 'https://facebook.com' => shortened url shorty.li/1  
given url 'https://google.com' => shortened url shorty.li/2  
given url 'https://yahoo.com' => shortened url shorty.li/3
.
.
.
and so on.

##  Improvements
1. When parsing the title the entire html doc is loaded in memory thus creating memory constraint.
2. Backend form validation can be implemented instead of relying only on frontend form validation.

# Front End Interface

## Prerequisites
1. axios package is used for api calls.
2. Bootswatch(a variation of Bootstrap 4) is used for styling framework.
3. Form validation is implemented in the front end.
4. Dynamic form builder(copied from the open source dynamic-ui-components library myself being the author) is used to create the form.

## To run the React front end server in development environment follow the steps
1. cd into url-shortner-frontend folder
2. Install all the dependencies running
```
$ npm install 
```
3. To run the server
```
$ npm start
```

## Improvements
1. Build a better error handling process when api calls are made for example a 404 error page can be created.
2. A new functional component can be created for the Table under the ui folder and called from the App.js file.
3. Pagination can be added to the table to avoid loading all 100 data in memory.
