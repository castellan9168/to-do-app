var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var removeCode = require('gulp-remove-code');

gulp.task('browserSync', ['nodemon'], function() {
	browserSync.init(null, {
		files: ['www/**/*.*'],
		port: 7000,
		server: {
			baseDir: 'www'
		}
	});
});

gulp.task('nodemon', function() {
	var started = false;

	return nodemon({
		script: 'server.js'
	}).on('start', function() {
		if(!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('sass', function() {
	return gulp.src('www/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('www/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('watch',['sass', 'browserSync'], function() {
	gulp.watch('www/scss/**/*.scss', ['sass']);
	gulp.watch('www/**/*.html', browserSync.reload);
	gulp.watch('www/js/**/*.js', browserSync.reload);
});