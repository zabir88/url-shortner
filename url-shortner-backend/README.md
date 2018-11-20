# Backend(api only) Setup

## Prerequisite
1. .ruby-gemset file allows to create application specific gemset.
2. .ruby-version file allows to create application specific ruby version.
3. Postgresql database is used to for the api.
4. rails-api only is used to create the url-shortner api.
5. rspec and factory bot is used for unit testing (grouped under development and test env).
6. spring-commands-rspec is used to run test suites faster if the dev server is already running.
7. figaro is use to store ENV variables.
8. active_model_serializers is used to serialize the end points.
9. delayed_job is used for background job (Reason for chosing delayed_job over other 3rd parties background processor was because of the ease of integration with postgresql).

## Application Setup

Assuming you have ruby installed, to setup and run the api in dev env:

1. Unzip/extract the folder.

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
$ rails generate delayed_job:active_record
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

## Algorithm used to generate shortened url

The shortest possible length of the shortened url is genereted using the primary id of the object as the slug. The domain is kept constant for all objects(for example 'shorty.li') and the primary id of the object is appened after the domain of the shortened url. So comibined the example looks like the following:

given url 'https://facebook.com' => shortened url shorty.li/1  
given url 'https://google.com' => shortened url shorty.li/2  
given url 'https://yahoo.com' => shortened url shorty.li/3

and so on.
 

