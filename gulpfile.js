'use strict';

var gulp    = require('gulp');
var cheerio = require('gulp-cheerio');
var clean   = require('./index.js');

gulp.task('default', function () {
  gulp.src('test/*.svg')
    .pipe(cheerio(clean()))
    .pipe(gulp.dest('tmp/'));
});
