exports.config = {
	framework: 'mocha',
	specs: [
	'test/end_to_end/**/*.spec.js'
	],
	mochaOpts: {
		enableTimeouts: false
	},
	onPrepare: function () {
		process.env.PORT = 3001
		require('./server')
	}
}