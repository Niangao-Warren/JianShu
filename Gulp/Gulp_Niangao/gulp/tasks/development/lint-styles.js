const gulp      = require('gulp'),
      postcss   = require('gulp-postcss'),
      stylelint = require('stylelint'),
      reporter  = require('postcss-reporter'),
      config    = require('../../config');

gulp.task('lint-styles', () => {
    return gulp.src(config.lintStyles.src)
               .pipe(postcss([
                   stylelint(config.lintStyles.options.stylelint),
                   reporter(config.lintStyles.options.reporter)
               ]))
})

/*
    stylelint 检查CSS语法 https://github.com/stylelint/stylelint
    postcss-reporter 在控制台记录PostCSS消息 https://github.com/postcss/postcss-reporter
*/