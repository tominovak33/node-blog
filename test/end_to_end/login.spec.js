var expect = require('chai').expect;

describe('test logging in:', function() {
	it('logs in as a test user successfully' , function () {

		//Open application
		browser.get('http://localhost:3001');
		
		//Go to login page
		element(by.css('.navigation-login')).click();

		//Enter credentials and log in
		var username = 'test-user';
		element(by.model('username')).sendKeys(username);
		element(by.model('password')).sendKeys('password');		
		element(by.css('.login-submit')).click();
		
		//Assertions

		//See if the first post on the list of posts is the once just submitted
		element(by.css('.current-user')).getText().then(function (current_user_test) {
			expect(current_user_test).to.contain(username);
		});
	})
})