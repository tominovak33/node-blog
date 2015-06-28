var expect = require('chai').expect;

describe('test making a post:', function() {

	beforeEach(function() {
    	browser.executeScript('window.sessionStorage.clear();');
    	browser.executeScript('window.localStorage.clear();');
	});

	//Set credentials to use so available in all tests below
	var time = Date.now();

	var username = 'test-u-'+ time;
	var password = 'password123';

	it('logs in as a test user and creates a new post successfully' , function () {

		//Open application
		browser.get('http://localhost:3001');
		
		//Go to login page
		element(by.css('.navigation-register')).click();

		element(by.model('username')).sendKeys(username);
		element(by.model('password')).sendKeys(password);	
		element(by.model('password_confirm')).sendKeys(password);		
		element(by.css('.register-submit')).click();
		
		browser.sleep(1000); //Waits for refresh to happen
		//Assertions
		
		//Create test post
		//Adding the unix timestamp to the post as otherwise all test posts are the same and
		//have the same content meaning that if the post from the last test is still in the system 
		//it will pass the test despite the post submitted just now is not saved as the first post 
		//in the list will have the expected content
		var title = 'my test title '
		title += Date.now();
		
		//Enter a test post and sumbmit it
		element(by.model('$parent.postTitle')).sendKeys(title);
		browser.executeScript("CKEDITOR.instances.editor1.setData('my test post content');");
		element(by.css('.post-submit')).click();

		//Assertions

		//See if the first post on the list of posts is the once just submitted

		//Rather than wait for the websockets to send the post back, just refresh to get all posts
		browser.executeScript("window.location.href = '/'");

		element.all(by.css('.post_title')).first().getText()

			.then(function (post_title) {
				expect(post_title).to.contain(title);
			}

		);

	})
})