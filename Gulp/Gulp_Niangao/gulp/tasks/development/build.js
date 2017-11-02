const gulp        = require('gulp'),
      runSequence = require('run-sequence');

gulp.task('build',callback => {
    runSequence(        
        [
            'styles',
            'scripts',
            'changed',
            'optimize-images',
        ],          
        'base64',
        callback
    );
})

/*
    run-sequence https://github.com/OverZealous/run-sequence
*/