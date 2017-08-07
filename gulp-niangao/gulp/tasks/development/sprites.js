const gulp   = require('gulp'),
      gulpif = require('gulp-if'),
      sprity = require('sprity'),
      config = require('../../config').sprites;

gulp.task('sprites',() => {
      return sprity.src(config.options)
                   .pipe(gulpif('*.png', gulp.dest(config.dest.image), gulp.dest(config.dest.css)))
})

/*
      sprity https://github.com/sprity/sprity
      需要安装图片引擎sprity-lwip ，windows环境下，需要win10才可以
      win7可以安装sprity-gm来代替，不过需要下载GraphicsMagick和Imagemagick引擎，电脑重启
*/