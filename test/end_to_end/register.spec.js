var expect = require('chai').expect;

describe('test registration :', function() {
		
	afterEach(function() {
    	browser.executeScript('window.sessionStorage.clear();');
    	browser.executeScript('window.localStorage.clear();');
	});
	//Set credentials to use so available in all tests below
	var time = Date.now();

	var username = 'test-u-'+ time;
	var password = 'password123';

	it('registers a test user successfully who is then logged in' , function () {

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

		//See if the first post on the list of posts is the once just submitted
		element(by.css('.current-user')).getText().then(function (current_user_test) {
			expect(current_user_test).to.contain(username);
		});
	})


	it('allows the user who just registered to log in manually' , function () {

		//Open application
		browser.get('http://localhost:3001');
	
		//Go to login page
		element(by.css('.navigation-login')).click();

		//Log in with credentials that were used to registered with
		element(by.model('username')).sendKeys(username);
		element(by.model('password')).sendKeys(password);		
		element(by.css('.login-submit')).click();
		
		browser.sleep(1000); //Waits for refresh to happen

		//Assertions

		//See if the first post on the list of posts is the once just submitted
		element(by.css('.current-user')).getText().then(function (current_user_test) {
			expect(current_user_test).to.contain(username);
		});
	})
})