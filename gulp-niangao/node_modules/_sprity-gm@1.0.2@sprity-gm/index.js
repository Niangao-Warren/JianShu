'use strict';

var Promise = require('bluebird');
var color = require('color');
var gm = require('gm');

var useImagemagick = function (options) {
  if (options && (options['gm-use-imagemagick'] === 'true' || options['gm-use-imagemagick'] === true)) {
    return true;
  }
  return false;
};

var getBgColor = function (opt) {
  if (opt.options) {
    if (opt.bgColor[3] === 0 && opt.options.format !== 'jpg') {
      return 'transparent';
    }
  }
  return color().rgb(opt.bgColor[0], opt.bgColor[1], opt.bgColor[2]).hexString();
};

module.exports = {
  create: function (tiles, opt) {
    return new Promise(function (resolve, reject) {
      var sprite = gm(opt.width, opt.height, getBgColor(opt));
      var type = opt.options && opt.options.format ? opt.options.format : 'PNG';
      sprite.options({imageMagick: useImagemagick(opt.options)});
      sprite._in = ['-background', getBgColor(opt)];

      tiles.forEach(function (tile) {
        sprite.out('-page');
        sprite.out('+' + (tile.x + tile.offset) + '+' + (tile.y + tile.offset));
        sprite.out(tile.path);
      });

      sprite
        .mosaic()
        .toBuffer(type.toUpperCase(), function (err, buffer) {
          if (err) {
            reject(err);
          }
          else {
            gm(buffer).size(function (e, size) {
              if (err) {
                reject(err);
              }
              else {
                resolve({
                  type: type,
                  mimeType: 'image/' + type,
                  contents: new Buffer(buffer),
                  width: size && size.width ? size.width : opt.width,
                  height: size && size.height ? size.height : opt.height
                });
              }
            });
          }
        });
    });
  },
  scale: function (base, opt) {
    return new Promise(function (resolve, reject) {
      var type = base.type || 'PNG';
      gm(base.contents)
        .options({imageMagick: useImagemagick(opt.options)})
        .scale(opt.width, opt.height)
        .toBuffer(type.toUpperCase(), function (err, buffer) {
          if (err) {
            reject(err);
          }
          else {
            gm(buffer).size(function (e, size) {
              if (err) {
                reject(err);
              }
              else {
                resolve({
                  type: type.toLowerCase(),
                  mimeType: 'image/' + type.toLowerCase(),
                  contents: new Buffer(buffer),
                  width: size && size.width ? size.width : opt.width,
                  height: size && size.height ? size.height : opt.height
                });
              }
            });
          }
        });
    });
  }
};
