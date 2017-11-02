gulp-lwip
=========

[![Version](http://img.shields.io/npm/v/gulp-lwip.svg)](https://www.npmjs.org/package/gulp-lwip)
[![Build Status](https://travis-ci.org/MaxArt2501/gulp-lwip.svg?branch=master)](https://travis-ci.org/MaxArt2501/gulp-lwip)

[Gulp.js](http://gulpjs.com/) plugin wrapping [lwip](https://github.com/EyalAr/lwip) image manipulation library.

## Installation

You'll probably use this plugin together with gulp.js as build tool/task runner:

```bash
npm install --save-dev gulp-lwip
```

## Notes

The strong point of `lwip` is that it allows to manipulate images without external dependencies like ImageMagick or similar. However, this doesn't mean you won't need anything else: during the installation, source files will be compiled using [`node-gyp`](https://github.com/TooTallNate/node-gyp), which means Python and a C++ compiler will be used. In particular, Windows installations will need Visual Studio 2013 at least.

See `node-gyp`'s page for more informations.

## Usage

```js
var lwip = require("gulp-lwip");

gulp.src("./src/images/*.jpg")
    .pipe(lwip
        .scale(.5)
        .exportAs("png")
    )
    .pipe(gulp.dest("./assets/img/"));
```

`gulp-lwip`'s usage is similar to `lwip`'s in [batch mode](https://github.com/EyalAr/lwip#usage), chaining the desired filters one after the other, together with their parameters. Basically every processing filter can be used like that (`resize`, `blur`, `saturate` and so on). `paste` is replaced by `putImage` (read later). Check `lwip`'s documentation to further informations.

Getters like `width` or `getPixel` are, of course, not supported, while `writeFile` and `toBuffer` are replaced by `exportAs(format, parameters)`. `format` can be one of the formats accepted by lwip (i.e., `"jpg"`, `"png"` or `"gif"`), or `null`, meaning that the original format is used; the optional argument `parameters` is a plain object meant to provide specific parameters when outputting the image file. `exportAs` might *not* be the last method in the call chain.

### Additional methods

* `rescale(width[, height][, inter])`

  `rescale`, when given both `width` and `height`, works exactly like `resize`. When `height` is omitted, though, the picture is scaled to the given `width` keeping the image's aspect ratio, whereas `resize` would produce square images. Similarly, when `width == null` and `height` is a number, the picture is resized to the given `height` with the same aspect ratio.

* `putImage(left, top, image)`

  This method takes the role of `paste`. `image` can be either a `Buffer` object containing encoded image data, or a path pointing to an image file. The format is inferred from the content.

## Tests

Tests are performed using [mocha](http://mochajs.org/). Execute `npm run test` after installing the development dependencies, or just `mocha` if you have a compatible version installed globally.

## License

MIT. See [LICENSE](LICENSE) for details.
