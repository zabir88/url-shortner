# URL Shortner Application

## Live Demo 
```
https://shortyurl-app.herokuapp.com/
```

## Rails API Backend
### Prerequisites
1. .ruby-gemset file allows one to create application specific gemset.
2. .ruby-version file allows one to create application specific ruby version.
3. Postgresql database is used for the api.
4. Rails-api is used to create the url-shortner api.
5. Rspec and factory bot is used for unit testing (grouped under development and test env in the Gemfile).
6. Spring-commands-rspec is used to run test suites faster if the dev server is already running.
7. Figaro is use to store ENV variables such as database_username and database_password.
8. Will Paginate is used to paginate data.
9. Delayed_job is used for background job (Reason for chosing delayed_job over other 3rd parties background processor was because of the ease of integration with postgresql).
10. Nokogiri is used to scrape the title of the given url.
11. Base62 in Ruby gem is used to convert id to string with base 62 since ruby has built in support only upto base 36.

### Running the rails api server in development environment
Assuming ruby and bundler gem is already installed, to setup the api in dev env follow the steps:
1. Clone the repository
```
$ git clone https://github.com/zabir8809/url-shortner-app.git
```
2. cd into the url-shortner-app folder. This will create a gemset named url-shortner.
3. Install all gems 
```
$ bundle install
```
4. Setup figaro to store ENV varaibles such as database_username and database_password. This will create config/application.yml file and adds it to .gitignore. Run
```
$ bundle exec figaro install
```
5. Open config/application.yml file and enter 
```
database_username: '<enter your db username>' 
database_password: '<enter your db password>'
```
6. Create database
```
$ rails db:create
```
7. Run migrations
```
$ rails db:migrate
```
8. To setup delayed_job run
```
$ rails generate delayed_job:active_record
```
9. Delayed Job works with postgresql database. To setup the table run
```
$ rails db:migrate
```
10. To run rspec test
```
$ rspec
```
11. To start the sever run
```
$ rails s -p 8080
```
12. To start working off jobs in the development env, open another processor and run
```
$ rake jobs:work
```
13. Please check /config/initialzers/delayed_job_config.rb for delayed worker configurations.

### Posting Data
To post data to the api one can use the curl toolbox. Follow the example below:
```
$ curl -X POST -H "Content-Type: application/json" http://localhost:8080/api/v1/urls -d '{"url": {"original_url": "https://facebook.com"}}'
```
This will post a new data to the api.

### Algorithm used to generate shortened url
The shortest possible length of the shortened url is genereted using the primary id of the object created in the url table. The domain is kept constant for all objects(for example 'shorty.li') and the primary id of the object is appened to the domain of the shortened url by converting the id to base 62 (which includes a-z,A-Z,0-9) string. Few example:

given url 'https://facebook.com' => shortened url ```1```  
given url 'https://google.com' => shortened url ```2xl1``` 
given url 'https://yahoo.com' => shortened url ```3x5a```

...and so on.

###  Further Improvements
1. When parsing the title the entire html doc is loaded in memory thus creating memory constraint.

## Front End Interface
### Prerequisites
1. Axios library is used for api calls.
2. Dynamic UI Components library is used to build the UI. Note: It is an open source library authored by myself. For more details you can check out my repository [https://github.com/zabir8809/dynamic-ui-components](https://github.com/zabir8809/dynamic-ui-components).
3. Bootswatch(a variation of Bootstrap 4) is used for styling framework. It is a dependency for dynamic-ui-components package so no need to install it seperately.
4. Form validation is implemented in the front end.

### Running the React front end server in development environment
Assuming npm and node is already installed, to setup the frontend server in dev env follow the steps:
1. cd into frontend folder
2. Install all the dependencies running
```
$ npm install 
```
3. Run the server
```
$ npm start
```

### Further Improvements
1. Create a better error handling UI for example a 404 or 500 error page.

