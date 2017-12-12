'use strict';

// REQUIRED NODE PACKAGES
const gulp = require('gulp');

// MOVES FONT FILES
// 'fonts' task
gulp.task('fonts', () => {
	return gulp
		.src('src/assets/fonts/**/*') // Grabs font files in the 'src/fonts' directory
		.pipe(gulp.dest('dist/assets/fonts')); // Drops font files into the 'dist/fonts' directory
});
