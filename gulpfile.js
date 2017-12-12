'use strict';

// REQUIRED NODE PACKAGES
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');
const requireDir = require('require-dir');

requireDir('./gulp/tasks', {recurse: true});

// Development Tasks
// -----------------

// STARTS A WEB SERVER
// 'serve' task
gulp.task('serve', () => {
	// Starts web server from the 'src' directory
	browserSync.init({
		server : {baseDir: 'src'},
	});
});

// WATCHES A CERTAIN DIRECTORY & RUNS WHEN FILES ARE SAVED
// 'watch' task; 'serve' and 'styles' tasks must be completed before 'watch' is allowed to run
gulp.task('watch', ['serve', 'styles'], () => {
	gulp.watch('src/scss/**/*.scss', ['styles']); // Directory & task to watch
	gulp.watch('src/*.html', browserSync.reload); // Reloads web server on .html file save
	gulp.watch('src/css/**/*.css', browserSync.reload); // Reloads web server on .css file save
	gulp.watch('src/js/**/*.js', browserSync.reload); // Reloads web server on .js file save
	// Other watchers
});

// DEVELOPMENT TASK - RUN WHILE DEVELOPING YOUR APP OR WEBSITE
gulp.task('default', (callback) => {
	runSequence(['styles', 'serve', 'watch'], callback);
});

// Build Sequence
// --------------

// OPTIMIZATION / BUILD TASK - RUN TO BUILD YOUR APP OR WEBSITE
gulp.task('build', (callback) => {
	runSequence(
		'clean:dist',
		['styles', 'scripts', 'images', 'fonts'],
		callback
	);
});
