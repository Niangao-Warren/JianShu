const gulp        = require('gulp'),
      browsersync = require('browser-sync'),
      config      = require('../../config').browsersync;

gulp.task('browsersync', ['build'], () => {
    browsersync.init(config.development);
    // browsersync.init(config.production);
})

/*
    browser-sync https://github.com/BrowserSync/browser-sync
    config.development 静态服务器，对应html文件
    config.production  代理，对应php文件
*/