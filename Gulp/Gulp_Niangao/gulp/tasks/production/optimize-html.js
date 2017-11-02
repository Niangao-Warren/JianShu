const gulp    = require('gulp'),
      htmlmin = require('gulp-htmlmin'),
      config  = require('../../config').optimize.html;

gulp.task('optimize-html', () => {
    return gulp.src(config.src)
               .pipe(htmlmin(config.options))
               .pipe(gulp.dest(config.dest))
})

/*
    htmlmin https://github.com/jonschlinkert/gulp-htmlmin
*/