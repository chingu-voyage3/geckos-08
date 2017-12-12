'use strict';

// REQUIRED NODE PACKAGES
const gulp = require('gulp');
const del = require('del');

// DELETES BUILD DIRECTORY
// 'clean:dist' task
gulp.task('clean:dist', () => {
	return del.sync('dist'); // Deletes the 'dist' directory
});
