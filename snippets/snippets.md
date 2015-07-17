Tomi: MEAN practice app 
========================

### Userful snippets

### Testing the api

* Post data to the API:

curl -v -H "Content-Type: application/json" -XPOST --data "{\"username\":\"tomi5\", \"body\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit post\"}" localhost:3000/api/posts/


* Create user with curl:

curl -X POST -d '{"username": "tomi1" , "password": "pass" }' -H "Content-Type: application/json" localhost:3000/api/users

### Mongo Database

mongo

use social

Show users:

db.users.find()

Show posts:

db.posts.find()

* Edit a user:

db.users.update( { "_id": ObjectId("123456789101112131415") }, { $set: { "username": "foo" } } );

* Delete All Posts 
db.posts.remove({})

* Edit a post date

db.posts.update( { "_id": ObjectId("--post object id here--") }, { $set: { "date": ISODate("2014-06-26T18:36:25.603Z") } } );


### NPM issues

Fix some module not found errors:

rm -rf node_modules/
npm cache clean
npm install


### Node issues

Node error: Error: listen EADDRINUSE

ps aux | grep node
kill -9 xyz 		<---- Swap xyz for the id of the node js process from the list shown above

* NPM install issues saying: Error: `gyp` failed with exit code: 1
	
	sudo ln -s /usr/bin/nodejs /usr/bin/node



### Listen for websockets

node_modules/wscat/bin/wscat -c ws://localhost:3000

### Testing

* Protractor

Before first ever test:

PORT=3001 TEST=1 node server.js

curl -X POST -d '{"username": "test-user" , "password": "password" }' -H "Content-Type: application/json" localhost:3001/api/users


Run protactor tests with : ./node_modules/.bin/protractor

### CK Editor

<!--<script src="//cdn.ckeditor.com/4.4.7/full/ckeditor.js"></script>-->
<script src="//cdn.ckeditor.com/4.4.7/basic/ckeditor.js"></script>


<textarea name="editor1" id="editor1" rows="10" cols="80" ng-model='postBody'>
    This is my textarea to be replaced with CKEditor.
</textarea>

CKEDITOR.replace('editor1');

CKEDITOR.instances.editor1.getData()

### First post content:

<h2><strong>About the project:</strong></h2>

<h3><strong>Technology:</strong></h3>

<p>This application is created using <a href="https://nodejs.org/" target="_blank">Node</a>, <a href="http://expressjs.com/" target="_blank">Express</a>, <a href="https://www.mongodb.org/">Mongo DB</a> and <a href="https://angularjs.org/">Angular JS</a>.&nbsp;</p>

<p>Testing of the application is carried out with <a href="https://angular.github.io/protractor/#/">Protractor</a> running end to end tests using the <a href="http://mochajs.org/">Mocha</a> javascript testing framework and the <a href="http://chaijs.com/">Chai</a> assertion library.</p>

<p>Package management is handled by <a href="https://www.npmjs.com/">npm</a> and <a href="http://bower.io/">bower</a>.</p>

<p>Less css is used as the css preprocessor and the build process is handled by <a href="http://gulpjs.com/">gulp</a>.</p>

<h3><strong>Purpose:</strong></h3>

<p>Currently the only purpose of this project is to allow me to practice my development skills and to enable me to try different tools and workflows within a project.</p>