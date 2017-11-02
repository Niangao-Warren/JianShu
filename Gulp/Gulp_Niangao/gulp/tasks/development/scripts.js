const gulp         = require('gulp'),
      browsersync  = require('browser-sync'),
      browserify   = require('browserify'),
      source       = require('vinyl-source-stream'),
      watchify     = require('watchify'),
      bundleLogger = require('../../util/bundleLogger'),
      handleErrors = require('../../util/handleErrors'),
      config       = require('../../config').browserify;

gulp.task('scripts', callback => {
    browsersync.notify('Compiling JavaScript');
    var bundleQueue = config.bundleConfigs.length;
    var browserifyThis = bundleConfig => {
        var bundler = browserify({
            cache: {}, packageCache: {}, fullPaths: false,
            entries: bundleConfig.entries,
            // Add file extentions to make optional in your requires
            extensions: config.extensions,
            debug: config.debug
        })

        var bundle = () => {
            bundleLogger.start(bundleConfig.outputName);
            return bundler
                  .bundle()
                  .on('error', handleErrors)
                  .pipe(source(bundleConfig.outputName))
                  .pipe(gulp.dest(bundleConfig.dest))
                  .on('finish', reportFinished)

        }
        if(global.isWatching) {
            bundler = watchify(bundler);
            bundler.on('update', bundle);
        }

        var reportFinished = () => {
            bundleLogger.end(bundleConfig.outputName)
            if(bundleQueue) {
                bundleQueue--;
                if(bundleQueue === 0) {
                    callback();
                }
            }
        }
        return bundle();
    }
    config.bundleConfigs.forEach(browserifyThis);
})

/*
    browserify 浏览器加载Node.js模块 https://github.com/substack/node-browserify
    vinyl-source-stream 把普通的Node Stream转换为Vinyl File Object Stream https://github.com/hughsk/vinyl-source-stream
    watchify 加速browserify编译 https://github.com/substack/watchify
    browserify-shim 加载非CommonJS文件 https://github.com/thlorenz/browserify-shim
*/