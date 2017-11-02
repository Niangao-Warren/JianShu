const gulp         = require('gulp'),
      postcss      = require('gulp-postcss'),
      less         = require('gulp-less'),
      autoprefixer = require('autoprefixer'),
      cssnano      = require('cssnano'),
      config       = require('../../config').less;

gulp.task('less',() => {
    const processors = [
        autoprefixer,
        cssnano
    ];
    return gulp.src(config.src)
               .pipe(less())
               .pipe(postcss(processors))
               .pipe(gulp.dest(config.dest))
});

/*
    postcss https://github.com/postcss/postcss
    autoprefixer 处理浏览器私有前缀
    cssnano 删除空格和最后一个分号，删除注释，优化字体权重，丢弃重复的样式规则，优化calc()，压缩选择器，减少手写属性，合并规则
    更多插件的引用，请参考styles.js文件
*/