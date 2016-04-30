# Another SVG optimization thing

to use with [gulp cheerio](https://www.npmjs.com/package/gulp-cheerio).

## install

I don't feel to push it on npm so:

```
npm install Hiswe/gulp-cheerio-clean-svg --save-dev

```

## use

### in gulp

```js
var gulp    = require('gulp');
var cheerio = require('gulp-cheerio');
var clean   = require('gulp-cheerio-clean-svg');

gulp.task('optimize-svg', function () {
  gulp.src('test/*.svg')
    .pipe(cheerio(clean()))
    .pipe(gulp.dest('tmp/'));
});
```

### options

```js
{
  removeSketchType: true,
  removeEmptyGroup: true,
  removeEmptyDefs: true,
  removeEmptyLines: true,
  removeComments: true,
  tags: [
    'title',
    'desc',
  ],
  attributes: [
    'id',
    'style',
    'fill*',
    'clip*',
    'stroke*'
  ],
}
```

attributes ending with `*` are expanded according to the lists defined in index.js
