# 简书

展示在简书博客中的一些示例代码，个人简书地址：[Nian糕_JavaScript](https://www.jianshu.com/c/e6a201787686)

### 前端自动化构建工具 Gulp

Gulp 是基于 NodeJS 的前端自动化构建工具，在项目开发过程中自动化地完成 html / css / js / image / sass / less 等文件的编译、合并、压缩、语法检查、浏览器自动刷新等重复性任务，项目中的所有依赖包如下图所示，而关于该项目的更多讲解及使用方法，可查看该篇博文：[从零开始构建你的 Gulp](http://www.jianshu.com/p/0db88fd3f83d)

<img src="http://upload-images.jianshu.io/upload_images/1662958-f00782535d04c31a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" width="350" alt="思维导图">

### WebPack 模块化打包工具

WebPack 的作用是将你的项目当做一个整体，通过分析项目的结构，找到项目中所有依赖的 JavaScript 模块，以及其它的一些浏览器不能直接运行的拓展语言，如 Scss, TypeScript 等，并将其转换和打包为浏览器可识别的 JavaScript 文件，在很多场景下可代替 Gulp/Grunt 类工具

关于该项目的讲解及使用方法，可参考这两篇博文：[WebPack 模块化打包工具（上）](https://www.jianshu.com/p/aab1667ee0db),[WebPack 模块化打包工具（下）](https://www.jianshu.com/p/6acb36f2738b)

### CSS 侧边栏在小屏设备中进行隐藏

当网页内容较多时，通过点击侧边栏，能够使我们能快速回到网页的指定位置，在大屏设备中，侧边栏往往是悬浮于屏幕右侧，很方便用户的使用，但在小屏设备中，屏幕空间有限，所以我们会通过隐藏侧边栏的方式，来节省视口空间的使用

在 min-width 为 1410px 的运行效果：

<img src="http://upload-images.jianshu.io/upload_images/1662958-c995bce772a6c4e8.gif?imageMogr2/auto-orient/strip" width="350">

在 max-width 为 1410px 的运行效果：

<img src="http://upload-images.jianshu.io/upload_images/1662958-1f8e3153387e1b1e.gif?imageMogr2/auto-orient/strip" width="350">

效果运行地址：[侧边栏在小屏设备中进行隐藏](https://niangao-warren.github.io/JianShu/Demo/Sidebar_display_and_hidden/index.html)

### banner图响应式居中显示

在 PC 网站首页，banner 图作为网页中最大的一张图片，在传达网页的的主要信息的同时，也吸引着浏览者的所有注意力，所以 banner 图的展示方式直接影响着用户的体验，我们可以将图片独立出来，并通过隐藏图片两侧的方式，使得 banner 图在不同尺寸的视口中居中显示

当视口宽度与图片宽度同为 1920 px 时，Nian 糕正好处于视图居中位置，页面效果如下图所示：

<img src="http://upload-images.jianshu.io/upload_images/1662958-6be74dd86f449167.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" width="400">

当视口宽度为 1210 px 时，页面效果如下图所示：

<img src="http://upload-images.jianshu.io/upload_images/1662958-9500b18c32ba4d3d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" width="400">

效果运行地址：[banner图响应式居中显示](https://niangao-warren.github.io/JianShu/Demo/Banner_response_centered/index.html)

### 鼠标悬停图片，显示隐藏文本

当我们在浏览网页的时候，描述性的文本通常不会跟在图片之后，而是当我们将鼠标移至图片上时，才会将文本显示出来，这样的好处是，以突显图片为主，并节省布局空间

使用 CSS 来实现鼠标悬停图片，显示隐藏文本的效果：

<img src="http://upload-images.jianshu.io/upload_images/1662958-c67bfd8aad70719f.gif?imageMogr2/auto-orient/strip" width="400">

效果运行地址：[鼠标悬停图片，显示隐藏文本 CSS](https://niangao-warren.github.io/JianShu/Demo/Mouse_movement_text_animation_effect/index.html)

使用 JS 来实现鼠标悬停图片，显示隐藏文本的效果：

<img src="http://upload-images.jianshu.io/upload_images/1662958-45538d1f19bbd6ab.gif?imageMogr2/auto-orient/strip" width="400">

效果运行地址：[鼠标悬停图片，显示隐藏文本 JS](https://niangao-warren.github.io/JianShu/Demo/Hover_the_display_text/index.html)

### 鼠标滑动，图片显示隐藏

当一个区域需要展示多张图片，而该区域的空间大小受到限制时，我们可以通过这种方式来达到预览哪张图片就展示该图片，并隐藏其他图片的方式来达到目的

<img src="http://upload-images.jianshu.io/upload_images/1662958-a202050b1239d684.gif?imageMogr2/auto-orient/strip" width="400">

效果运行地址：[鼠标滑动，图片显示隐藏](https://niangao-warren.github.io/JianShu/Demo/Mouse_sliding_picture_showing_hidden/index.html)

### Hacker流星雨

使用到了 canvas 元素来让屏幕呈现 Hacker 流星雨效果

<img src="http://upload-images.jianshu.io/upload_images/1662958-55005a78f168bedf.gif?imageMogr2/auto-orient/strip" width="400">

<img src="http://upload-images.jianshu.io/upload_images/1662958-2118efdc8b18282e.gif?imageMogr2/auto-orient/strip" width="400">

效果运行地址：[Hacker流星雨](https://niangao-warren.github.io/JianShu/Demo/Hacker_meteor_shower.html)

### 九宫格抽奖

活动中常常会有抽奖的方式，而抽奖的方式有很多，但原理上基本是一致的，这里分享一个九宫格的抽奖方式

<img src="http://upload-images.jianshu.io/upload_images/1662958-71d69cce60b4895d.gif?imageMogr2/auto-orient/strip" width="400">

效果运行地址：[九宫格抽奖](https://niangao-warren.github.io/JianShu/Demo/Scratchable_latex/index.html)

### 手风琴效果

手风琴效果能够帮助你，在有限的页面空间内，展示多个内容片段，使得用户能非常友好的实现多个内容片段之间的切换

<img src="http://upload-images.jianshu.io/upload_images/1662958-b063bcad0359a66c.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" width="500">

效果运行地址：[手风琴效果](https://niangao-warren.github.io/JianShu/Demo/Accordion_effect/index.html)
