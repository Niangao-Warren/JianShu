'use strict';

var Promise = require('bluebird');
var lwip = require('lwip');

var getBgColor = function (color, format) {
  if (format === 'jpg') {
    return [color[0], color[1], color[2], 100];
  }
  return [color[0], color[1], color[2], color[3]];
};

var createCanvas = function (width, height, color) {
  return new Promise(function (resolve, reject) {
    lwip.create(width, height, color, function (err, image) {
      if (!err) {
        resolve(image);
      }
      else {
        reject(err);
      }
    });
  });
};

var paste = function (tile, canvas) {
  return new Promise(function (resolve, reject) {
    lwip.open(tile.contents, tile.type, function (err, img) {
      if (err) {
        reject(err);
      }
      else {
        canvas.paste(tile.x + tile.offset, tile.y + tile.offset, img, function (e) {
          if (!e) {
            resolve(canvas);
          }
          else {
            reject(e);
          }
        });
      }
    });
  });
};

var toBuffer = function (canvas, opt) {
  return new Promise(function (resolve, reject) {
    var format = opt.options && opt.options.format ? opt.options.format : 'png';
    canvas.toBuffer(format, {}, function (err, buf) {
      if (!err) {
        resolve({
          type: format,
          mimeType: 'image/' + format,
          contents: buf,
          width: canvas.width(),
          height: canvas.height()
        });
      }
      else {
        reject(err);
      }
    });
  });
};

var scaleImage = function (base, type, opt) {
  return new Promise(function (resolve, reject) {
    lwip.open(base, type, function (err, img) {
      if (err) {
        reject(err);
      }
      else {
        var interpolation = opt['lwip-interpolation'] || opt.options['lwip-interpolation'] || 'lanczos';
        img.scale(opt.scale, interpolation, function (e, image) {
          if (!e) {
            resolve(image);
          }
          else {
            reject(e);
          }
        });
      }
    });
  });
};

module.exports = {
  create: function (tiles, opt) {
    var format = opt.options && opt.options.format ? opt.options.format : 'png';
    return createCanvas(opt.width, opt.height, getBgColor(opt.bgColor, format))
      .then(function (c) {
        return Promise.map(tiles, function (tile) {
          return paste(tile, c);
        }, {concurrency: 1});
      })
      .then(function (c) {
        return toBuffer(c[0], opt);
      });
  },
  scale: function (base, opt) {
    return scaleImage(base.contents, base.type, opt)
      .then(function (image) {
        return toBuffer(image, opt);
      });
  }
};
