var gulp = require('gulp');

var fs = require('fs');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');


//Get every file in the /gulp/ folder and then require every file that is there
//This prevents me from having to require each new file I add
fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
	require('./gulp/' + task);
})

gulp.task('hello', function () {
	console.log('hello gulp task');
})

gulp.task('test_task', function () {
	console.log('test gulp task');
})

gulp.task('combined_task', ['hello', 'test_task'], function () {
	console.log('combined gulp task');
})

gulp.task('js', function() {
	gulp.src(['angular-src/module.js','angular-src/**/*.js'])
		.pipe(sourcemaps.init())
			.pipe(concat('app.js'))
			//.pipe(ngAnnotate()) //Add this back in if manually preventing ugilfy from breaking the angular dependency injection becomes too much
			.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('assets'))
})

gulp.task('watch:js', ['js'], function () {
	gulp.watch('angular-src/**/*js', ['js'])
})

//Start nodemon and watch all js files (restart if files are saved)
gulp.task('develop:server', function () {
	nodemon({
		script: 'server.js',
		ext: 'js'
	})
})

//run this task to start the server using nodemon (restart server when js files are edited) and to watch the css and js files (rebuild assets when assets are edited)
gulp.task('develop', ['watch:js', 'watch:less', 'develop:server'] ,  function () {
})