const gutil        = require('gulp-util'),
      prettyHrtime = require('pretty-hrtime');
var   startTime;

module.exports = {
    start: filepath => {
        startTime = process.hrtime();
        gutil.log('Bundling', gutil.colors.green(filepath));
    },
    // watch: bundleName => {
    //     gutil.log('Watching files required by', gutil.colors.yellow(bundleName));
    // },
    end: filepath => {
        var taskTime     = process.hrtime(startTime),
            prettyTime = prettyHrtime(taskTime);
        gutil.log('Bundled', gutil.colors.green(filepath), 'in', gutil.colors.magenta(prettyTime));
    }
}

/*
    gulp-util 打印结果，打印上色 https://github.com/gulpjs/gulp-util
    pretty-hrtime https://github.com/robrich/pretty-hrtime
*/