# Backend(api only) Setup

## Prerequisite
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

## Application Setup

Assuming ruby is already installed, to setup and run the api in dev env follow the steps:

1. Unzip/extract/clone the folder.

2. cd into the folder. This will create a gemset named url-shortner.

3. Install all gems 
```
$ bundle install
```
4. Create database
```
$ rails db:create
```
5. Run migrations
```
$ rails db:migrate
```
6. To setup delayed_job run
```
$ rails generate delayed_job:active_record
```
7. Delayed Job works with postgresql database. To setup the table run
```
$ rails db:migrate
```
8. To setup figaro to store ENV varaibles run
```
$ bundle exec figaro install
``` 
This creates a commented config/application.yml file and adds it to your .gitignore

9. To setup rspec for the unit test run
```
$ rails g rspec:install
```
10. To setup rspec binstub run 
```
$ bundle exec spring binstub rspec
```
11. To start the sever run
```
$ rails s
```
12. To start working off jobs in the development env, open another terminal and run
```
$ rake jobs:work
```
13. Please check /config/initialzers/delayed_job_config.rb for delayed worker configurations.

## Post Data

To create data to the api one can use the curl toolbox. Follow the example below:

```
$ curl -X POST -H "Content-Type: application/json" http://localhost:3000/api/v1/urls -d '{"url": {"original_url": "https://facebook.com"}}'
```
This will post a new data to the api.

## Algorithm used to generate shortened url

The shortest possible length of the shortened url is genereted using the primary id of the object created in the url table. The domain is kept constant for all objects(for example 'shorty.li') and the primary id of the object is appened to the domain of the shortened url. Few example:

given url 'https://facebook.com' => shortened url shorty.li/1  
given url 'https://google.com' => shortened url shorty.li/2  
given url 'https://yahoo.com' => shortened url shorty.li/3

and so on.

##  Improvements

1. When parsing the title the entire html doc is loaded in memory thus creating memory constraint.
 

