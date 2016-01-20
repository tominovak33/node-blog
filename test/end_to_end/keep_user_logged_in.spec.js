var expect = require('chai').expect;

describe('test keeping login after browser refresh :', function() {

	afterEach(function() {
		browser.executeScript('window.sessionStorage.clear();');
		browser.executeScript('window.localStorage.clear();');
	});

	it('keeps the login active after browser refresh' , function () {
		//Open application
		browser.get('http://localhost:3001');
		
		//Go to login page
		element(by.css('.navigation-login')).click();

		//Enter credentials and log in
		//Get these from the register.spec.js file as that is always set to run first so we have a test user to login with
		var username = 'test-user';
		var password = 'password123';

		element(by.model('username')).sendKeys(username);
		element(by.model('password')).sendKeys(password);		
		element(by.css('.login-submit')).click();
		
		//Assertions

		//See if the user logged in is displayed as the current user
		element(by.css('.current-user')).getText().then(function (current_user_test) {
			expect(current_user_test).to.contain(username);
		});

		browser.refresh()

		//See if the user is still logged in
		element(by.css('.current-user')).getText().then(function (current_user_test) {
			expect(current_user_test).to.contain(username);
		});
	})

})