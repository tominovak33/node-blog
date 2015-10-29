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

## Installation

Install nodejs and npm

git clone git@github.com:tominovak33/meanapp.git
cd meanapp
npm install
node_modules/.bin/gulp develop (or `npm run build`)

Testing: `./node_modules/.bin/protractor` or `npm run test`

### User Permissions

User permission level is set to an integer (higher indicating more priveledged user)

* 0  : Unverified User - No priveledges
* 1  : Verified User - No priviledges (some may be added later when the application gets more features)
* 2  : Author - Has the ability to create posts
* 5  : Editor - Has the ability to edit other users posts + Everything above
* 10 : Admin -  Has the ability to edit other users (including verifying or deleting) + Everything above
* 33 : User can do anything that the system is capable of doing
