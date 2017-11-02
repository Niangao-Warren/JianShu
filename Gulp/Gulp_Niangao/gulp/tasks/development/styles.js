const gulp              = require('gulp'),
      postcss           = require('gulp-postcss'),
      autoprefixer      = require('autoprefixer'),
      cssnext           = require('cssnext'),
      precss            = require('precss'),
      colorRgbaFallback = require('postcss-color-rgba-fallback')
      opacity           = require('postcss-opacity'),
      pseudoelements    = require('postcss-pseudoelements'),
      vmin              = require('postcss-vmin'),
      pixrem            = require('pixrem'),
      atImport          = require('postcss-import'),
      mqpacker          = require('css-mqpacker'),
      cssnano           = require('cssnano'),
      fontMagician      = require('postcss-font-magician'),
      config            = require('../../config').styles;

gulp.task('styles',() => {
    const processors = [
        autoprefixer,
        cssnext,
        precss,
        colorRgbaFallback,
        opacity,
        pseudoelements,
        vmin,
        pixrem,
        atImport,
        mqpacker,
        cssnano,
        fontMagician
    ];
    return gulp.src(config.src)
               .pipe(postcss(processors))
               .pipe(gulp.dest(config.dest));
});

/*
    autoprefixer 处理浏览器私有前缀 https://github.com/postcss/autoprefixer
    cssnext 使用CSS未来的语法 https://github.com/MoOx/postcss-cssnext
    precss 预处理插件包，可实现像Less、Sass预处理器的功能 https://github.com/jonathantneal/precss
    postcss-color-rgba-fallback 给rgba()颜色添加一个十六进制的颜色作为降级处理，IE8不支持rgba()颜色 https://github.com/postcss/postcss-color-rgba-fallback
    postcss-opacity 给IE浏览器添加滤镜属性，IE8不支持opacity属性 https://github.com/iamvdo/postcss-opacity
    postcss-pseudoelements 将伪元素的::转换为: https://github.com/axa-ch/postcss-pseudoelements
    postcss-vmin 使用vm为vmin做降级处理，IE9+ https://github.com/iamvdo/postcss-vmin
    pixrem 给rem添加px作为降级处理，IE8+ https://github.com/robwierzbowski/node-pixrem
    postcss-import 使用@import合并样式表 https://github.com/postcss/postcss-import
    cssnano 删除空格和最后一个分号，删除注释，优化字体权重，丢弃重复的样式规则，优化calc()，压缩选择器，减少手写属性，合并规则 https://github.com/ben-eb/cssnano
    postcss-font-magician 使用自定义字体 https://github.com/jonathantneal/postcss-font-magician
*/