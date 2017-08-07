const gulp    = require('gulp'),
      changed = require('gulp-changed'),
      config  = require('../../config').changed;

gulp.task('changed',() => {
    return gulp.src(config.src)
               .pipe(changed(config.dest))
               .pipe(gulp.dest(config.dest));
})

/*
    gulp-changed https://github.com/sindresorhus/gulp-changed
*/