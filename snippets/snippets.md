Tomi: MEAN practice app 
========================

### Userful snippets

### Testing the api

* Post data to the API:

curl -v -H "Content-Type: application/json" -XPOST --data "{\"username\":\"tomi5\", \"body\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit post\"}" localhost:3000/api/posts/


### NPM issues

Fix some module not found errors:

rm -rf node_modules/
npm cache clean
npm install