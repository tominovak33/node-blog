exports.config = {
	framework: 'mocha',
	specs: [
	'test/end_to_end/register.spec.js',
	'test/end_to_end/**/*.spec.js'
	],
	mochaOpts: {
		enableTimeouts: false
	},
	onPrepare: function () {
		process.env.PORT = 3001
		process.env.TEST = 1;
		require('./server')
	}
}