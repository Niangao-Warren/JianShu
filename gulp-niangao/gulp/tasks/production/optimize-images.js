const gulp     = require('gulp'),
      imagemin = require('gulp-imagemin'),
      cache    = require('gulp-cache'),
      size     = require('gulp-size'),
      config   = require('../../config').optimize.images;

gulp.task('optimize-images', () => {
    return gulp.src(config.src)
               .pipe(cache(imagemin(config.options)))
               .pipe(gulp.dest(config.dest))
               .pipe(size())
})

/*
    cache gulp的缓存代理 https://github.com/jgable/gulp-cache
    imagemin 图片压缩 https://github.com/imagemin/imagemin
*/