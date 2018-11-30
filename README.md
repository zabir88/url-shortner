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
8. Will Paginate is used to paginate data.
9. Delayed_job is used for background job (Reason for chosing delayed_job over other 3rd parties background processor was because of the ease of integration with postgresql).
10. Nokogiri is used to scrape the title of the given url.
11. Rack Cors gem is used to allow CORS in develpoment env.
12. Base62 in Ruby gem is used to convert id to string with base 62 since ruby as built in support only upto base 36.

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
The shortest possible length of the shortened url is genereted using the primary id of the object created in the url table. The domain is kept constant for all objects(for example 'shorty.li') and the primary id of the object is appened to the domain of the shortened url by converting the id to base 62 (which includes a-z,A-Z,0-9) string. Few example:

given url 'https://facebook.com' => shortened url 1  
given url 'https://google.com' => shortened url 2xl1 
given url 'https://yahoo.com' => shortened url 3x5a

.
.
.
and so on.

##  Improvements
1. When parsing the title the entire html doc is loaded in memory thus creating memory constraint.

# Front End Interface

## Prerequisites
1. Axios library is used for api calls.
2. Dynamic UI Components library is used to build the UI. Note: It is an open source library authored by me. for more details you can check out my repository [https://github.com/zabir8809/dynamic-ui-components](https://github.com/zabir8809/dynamic-ui-components).
3. Bootswatch(a variation of Bootstrap 4) is used for styling framework. It is a dependency for dynamic-ui-components package so no need to install it seperately.
4. Form validation is implemented in the front end.

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
1. Create a better error handling UI for example a 404 or 500 error page.

