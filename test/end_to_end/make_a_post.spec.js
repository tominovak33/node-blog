var expect = require('chai').expect;

describe('test making a post:', function() {
	it('logs in as a test user and creates a new post successfully' , function () {

		//Open application
		browser.get('http://localhost:3001');
		
		//Go to login page
		element(by.css('.navigation-login')).click();

		//Enter credentials and log in
		element(by.model('username')).sendKeys('test-user');
		element(by.model('password')).sendKeys('password');		
		element(by.css('.login-submit')).click();
		
		//Go to homepage
		element(by.css('.navigation-home')).click();
		
		/*
		Create test post
		Adding the unix timestamp to the post as otherwise all test posts are the same and
		have the same content meaning that if the post from the last test is still in the system 
		it will pass the test despite the post submitted just now is not saved as the first post 
		in the list will have the expected content
		*/
		var post = 'my test post content ';
		post += Date.now();
		
		//Enter a test post and sumbmit it
		element(by.model('postBody')).sendKeys(post);
		element(by.css('.post-submit')).click();

		//Assertions

		//See if the first post on the list of posts is the once just submitted
		element.all(by.css('.posts-list')).first().getText().then(function (post_text) {
			expect(post_text).to.contain(post);
		});
	})

	afterEach(function(){
		//db.connection.db.dropDatabase();	
	})
})