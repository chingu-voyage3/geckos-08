'use strict';

// REQUIRED NODE PACKAGES
const gulp = require('gulp');
const useref = require('gulp-useref');
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');

// CONCATENATES CSS & JS FILES INTO A SINGLE FILE BY LOOKING FOR A COMMENT THAT STARTS WITH "<!--build:" & ENDS WITH "<!--endbuild-->" IN YOUR HTML
// 'scripts' task
gulp.task('scripts', () => {
	return gulp
		.src('src/*.html') // Searches for the special comments in all .html files in the 'src' directory
		.pipe(useref()) // Concatenates the files listed in the special comments
		.pipe(gulpIf('*.js', uglify())) // Minifies the concatenated files if they are .js
		.pipe(gulpIf('*.css', cssnano())) // Minifies the concatenated files if they are .css
		.pipe(gulp.dest('dist')); // Drops minified .js & .css files into the 'dist' directory
});
