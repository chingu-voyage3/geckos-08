'use strict';

// REQUIRED NODE PACKAGES
const gulp = require('gulp');
const cache = require('gulp-cache');

// DELETES ALL CACHES
// 'clean:cache' task
gulp.task('clean:cache', (callback) => {
	return cache.clearAll(callback); // Deletes all caches
});
