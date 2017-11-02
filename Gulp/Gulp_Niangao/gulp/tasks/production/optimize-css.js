const gulp   = require('gulp'),
      csso   = require('gulp-csso'),
      size   = require('gulp-size'),
      config = require('../../config').optimize.css;

gulp.task('optimize-css', () => {
    return gulp.src(config.src)
               .pipe(csso(config.options))
               .pipe(gulp.dest(config.dest))
               .pipe(size())
})

/*
    gulp-csso https://github.com/ben-eb/gulp-csso
*/