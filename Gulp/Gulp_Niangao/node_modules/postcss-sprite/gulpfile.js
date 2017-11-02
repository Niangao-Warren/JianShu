const gulp = require('gulp')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const sprite = require('./index')
const del = require('del')
const { basename } = require('path')

gulp.task('clean', () => {
  return del(['./examples/build'])
})
gulp.task('img', ['clean'], () => {
  return gulp
    .src([
      './examples/src/img/*.*',
      './examples/src/img/*/*',
      '!./examples/src/img/src/*'
    ])
    .pipe(gulp.dest('./examples/build/img'))
})

gulp.task('sass', ['clean'], () => {
  return gulp
    .src('./examples/src/sass/*.scss')
    .pipe(
      sass(
        {
          // outputStyle: 'compressed'
        }
      ).on('error', sass.logError)
    )
    .pipe(
      postcss([
        sprite({
          baseSize: 16,
          filename: 'sprite.png',
          source: './examples/src/img/',
          output: './examples/build/',
          spritesmithOptions: {
            padding: 2
          },
          filter: function(url) {
            return !!~url.indexOf('/src/')
          },
          replaceUrl: function(url) {
            return '../sprite.png'
          },
          revision: true
        })
      ])
    )
    .pipe(gulp.dest('./examples/build/css'))
})

gulp.task('default', ['img', 'sass'])
