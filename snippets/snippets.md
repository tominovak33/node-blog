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

### NPM issues

Fix some module not found errors:

rm -rf node_modules/
npm cache clean
npm install


### Node issues

Node error: Error: listen EADDRINUSE

ps aux | grep node
kill -9 xyz 		<---- Swap xyz for the id of the node js process from the list shown above


### Listen for websockets

node_modules/wscat/bin/wscat -c ws://localhost:3000

### Testing

* Protractor

Run protactor tests with : ./node_modules/.bin/protractor