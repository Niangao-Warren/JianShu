const gulp   = require('gulp'),
      config = require('../../config').watch;

gulp.task('watch', ['browsersync'], () => {
    gulp.watch(config.styles, ['styles', 'lint-styles']);
    gulp.watch(config.scripts, ['scripts', 'jshint']);
    gulp.watch(config.images, ['optimize-images']);
    gulp.watch(config.sprites, ['sprites']);
})