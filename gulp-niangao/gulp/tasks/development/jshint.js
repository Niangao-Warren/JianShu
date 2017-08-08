const gulp    = require('gulp'),
      jshint  = require('gulp-jshint'),
      stylish = require('jshint-stylish'),
      config  = require('../../config').jshint;

gulp.task('jshint', () => {
    return gulp.src(config.src)
               .pipe(jshint())
               .pipe(jshint.reporter(stylish))
})

/*
    gulp-jshint js代码校验 https://github.com/spalger/gulp-jshint
    jshint-stylish 外部报告器 https://github.com/sindresorhus/jshint-stylish
*/