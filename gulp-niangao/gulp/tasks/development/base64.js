const gulp    = require('gulp'),
      base64  = require('gulp-base64'),
      config  = require('../../config').base64;

gulp.task('base64', ['styles'], () => {
    return gulp.src(config.src)
               .pipe(base64(config.options))
               .pipe(gulp.dest(config.dest));
});

/*
    gulp-base64 图片转换成Base64编码 https://github.com/Wenqer/gulp-base64
*/