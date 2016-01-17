Mongo - Express - Angular - Node practice app
=============================================

### About:

#### Technology:

This application is created using Node, Express, Mongo DB and Angular JS.

Testing of the application is carried out with Protractor running end to end tests using the Mocha javascript testing framework and the Chai assertion library.

Package management is handled by npm and bower.

Less css is used as the css preprocessor and the build process is handled by gulp.


#### Purpose:

Currently the only purpose of this project is to allow me to practice my development skills and to enable me to try different tools and workflows within a project.

## Documentation

### Installation (Debian)

#### Install nodejs and npm and mongodb

    sudo apt-get install mongodb

    curl -sL https://deb.nodesource.com/setup_4.x | bash

    sudo apt-get install nodejs

#### Install application

    git clone git@github.com:tominovak33/meanapp.git

    cd meanapp

    npm install

    node_modules/.bin/gulp develop (or `npm run build`)

### Tests

#### Setting up:

On new install:

Download the required selenium files for selenium to start:

./node_modules/protractor/bin/webdriver-manager update

Before running tests (leave running)

./node_modules/protractor/bin/webdriver-manager start

#### Running the tests:

Testing: `./node_modules/.bin/protractor` or `npm run test`

### User Permissions

User permission level is set to an integer (higher indicating more priveledged user)

* 0  : Unverified User - No priveledges
* 1  : Verified User - No priviledges (some may be added later when the application gets more features)
* 2  : Author - Has the ability to create posts
* 5  : Editor - Has the ability to edit other users posts + Everything above
* 10 : Admin -  Has the ability to edit other users (including verifying or deleting) + Everything above
* 33 : User can do anything that the system is capable of doing
