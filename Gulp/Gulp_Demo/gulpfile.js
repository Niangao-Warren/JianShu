// 导入工具包 require('node_modules里对应模块')
const gulp = require('gulp'), // 本地安装gulp所用到的地方
      less = require('gulp-less');// 引入组件

// 定义一个less任务（自定义任务名称）
gulp.task('less', () => {
    return gulp.src('src/less/test.less') // 该任务针对的文件
               .pipe(less()) // 该任务调用的模块
               .pipe(gulp.dest('build/css')) // 将会在build/css下生成test.css
});

// 定义默认任务
gulp.task('default', ['less'], () => {
    console.log("Love cake is really good!")
});