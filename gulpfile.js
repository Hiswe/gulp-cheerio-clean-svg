'use strict'

const gulp = require('gulp')
const cheerio = require('gulp-cheerio')
const clean = require('./index.js')

function cleanSvgFiles() {
  return gulp
    .src(`test/*.svg`)
    .pipe(cheerio(clean()))
    .pipe(gulp.dest(`tmp/`))
}

exports.default = cleanSvgFiles
