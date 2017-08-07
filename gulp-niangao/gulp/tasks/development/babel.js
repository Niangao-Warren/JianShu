const gulp       = require('gulp'),
      babel      = require('gulp-babel'),
      uglify     = require('gulp-uglify'),
      browserify = require('browserify'),
      source     = require('vinyl-source-stream'),
      config     = require('../../config').babel;

gulp.task('babel', () => {
    gulp.src(config.src)
        .pipe(babel(config.options))
        .pipe(uglify())
		.pipe(gulp.dest(config.dest))
})

/*
    gulp-babel https://github.com/babel/gulp-babel
*/