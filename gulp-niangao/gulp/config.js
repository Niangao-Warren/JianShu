const src        = 'src',
      dest       = 'build',
      srcAssets  = 'src/_assets',
      destAssets = 'build/assets';

module.exports = {
    babel: {
        src: srcAssets + '/javascripts/*.js',
        dest: destAssets + '/js/',
        options: {
			presets: ['env']
		}
    },
    base64: {
        src: destAssets + '/css/*.css',
        dest: destAssets + '/css/',
        options: {
            baseDir: dest,
            extensions: ['png'],
            maxImageSize: 20 * 1024, // bytes
            debug: false
        }
    },
    browserify: {
        // 在package.json中进行配置
        debug: true,
        bundleConfigs: [{
            entries:    './' + srcAssets + '/javascripts/application.js',
            dest:       destAssets + '/js',
            outputName: 'application.js'
        }, {
            entries:    './' + srcAssets + '/javascripts/head.js',
            dest:       destAssets + '/js',
            outputName: 'head.js'
        }, {
            entries:    './' + srcAssets + '/javascripts/increment.js',
            dest:       destAssets + '/js',
            outputName: 'increment.js'
        }]
    },
    browsersync: {
        development: {
            server: {
                baseDir: [destAssets, dest, srcAssets]
            },
            port: 9999,
            files: [
                destAssets + '/**/*.html',
                destAssets + '/css/*.css',
                destAssets + '/js/*.js'
            ]
        },
        production: {
            proxy: "localhost:3000" //apache或iis等代理地址
        }
    },
    changed: {
        src: srcAssets + '/javascripts/*.js',
        dest: destAssets + '/js'
    },
    optimize: {
        html: {
            src: srcAssets + '/**/*.html',
            dest: destAssets,
            options: {
                collapseWhitespace: true
            }
        },
        css: {
            src: srcAssets + '/styles/**/*.css',
            dest: destAssets + '/css/',
            options: {
                restructure: false,
                sourceMap: true,
                debug: true
            }
        },
        js: {
            src: srcAssets + '/javascripts',
            dest: destAssets + '/js/',
            options: {}
        },
        images: {
            src: srcAssets + '/images/**/*.{jpg,jpeg,png}',
            dest: destAssets + '/img/',
            options: {
                optimizationLevel: 5,
                progressive: true,
                interlaced: true
            }
        }
    },
    jshint: {
        src: srcAssets + '/javascripts/*.js'
    },
    less: {
        src: srcAssets + '/less/*.less',
        dest: destAssets + '/css/'
    },
    lintStyles: {
        src: [
            srcAssets + '/styles/**/*.css',
            // '!' + srcAssets + '/styles/partials/_base.css' // 忽略语法检测
        ],
        options: {
            stylelint: {
                // "extends": "stylelint-config-standard", // 该配置是 stylelint 的官方推荐配置，https://github.com/stylelint/stylelint-config-standard
                'rules': {
                    // "block-no-empty": true, // 禁止空块
                    // "color-no-invalid-hex": true, // 禁止十六进制颜色
                    // "declaration-colon-space-after": "always", // 在声明的冒号之后需要一个空格或不允许空格
                    // "declaration-colon-space-before": "never", // 在声明的冒号之前需要一个空格或不允许空格
                    // "function-comma-space-after": "always", // 需要一个空格，或者在函数逗号后面禁止空格
                    // "function-url-quotes": "double", // 要求或不允许网址的引号
                    // "media-feature-colon-space-after": "always", // 在媒体功能中的冒号后需要一个空格或不允许空格
                    // "media-feature-colon-space-before": "never", // 在媒体功能中的冒号之前需要一个空格或不允许空格
                    // "media-feature-name-no-vendor-prefix": true, // 禁止媒体功能名称的供应商前缀
                    // "max-empty-lines": 5, // 限制相邻空行的数量
                    // "number-leading-zero": "never", // 对于小于1的分数，需要或禁止前导令零
                    // "number-no-trailing-zeros": true, // 禁止数字中的尾随零
                    // "property-no-vendor-prefix": true, // 禁止属性的供应商前缀
                    // "declaration-block-no-duplicate-properties": true, // 禁止声明块中的重复属性
                    // "declaration-block-single-line-max-declarations": true, // 限制单行声明块内的声明数
                    // "declaration-block-trailing-semicolon": "always", // 在声明块中要求或不允许尾随分号
                    // "selector-list-comma-space-before": "never", // 在选择器列表的逗号之前需要一个空格或不允许空格
                    // "selector-list-comma-newline-after": "always", // 在选择器列表的逗号后面需要换行符或不允许空格
                    // "string-quotes": "double", // 在字符串周围指定单引号或双引号
                    // "value-no-vendor-prefix": true, // 不允许值的供应商前缀
                    // rules 使用 [0, 1, 2] 来代表规则启用状态不同，具体的规则可在 https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md 中查找
                    "color-no-invalid-hex": true, // 禁止无效的十六进制颜色
                    "block-no-empty": true, // 禁止空块
                    "declaration-no-important": true, // !important在声明内不允许
                    "property-no-unknown": true, // 禁止未知的属性
                    "selector-pseudo-class-no-unknown": true, // 禁止未知的伪类选择器
                    "selector-pseudo-element-no-unknown": true, // 禁止未知的伪元素选择器
                    "selector-type-no-unknown": true, // 禁止未知类型选择器
                    "media-feature-name-no-unknown": true, // 禁止未知的媒体查询的名称
                }
            },
            reporter: {
                clearMessages: true
            }
        }
    },
    sass: {
        src: srcAssets + '/sass/*.scss',
        dest: destAssets + '/css/'
    },
    sprites: {
        src: srcAssets + '/images/sprites/*.png',
        dest: {
            css: destAssets + '/css/',
            image: destAssets + '/img/'
        },
        options: {
            name: 'sprites', //需要合并的图片文件夹的名称
            src: srcAssets + '/images/sprites/*.png',
            style: 'sprites.css',
            format: 'png',
            engine: 'gm', //设定图片引擎
            orientation: 'horizontal', //合并图片的排列方式
            processor: 'css' //设定生成样式的格式
        }
    },
    styles: {
        src: srcAssets + '/styles/**/*.css',
        dest: destAssets + '/css/'
    },
    watch: {
        styles:  srcAssets + '/styles/**/*.css',
        scripts: srcAssets + '/javascripts/**/*.js',
        images:  srcAssets + '/images/**/*.{jpg,png}',
        sprites: srcAssets + '/images/**/*.png'
    }
}