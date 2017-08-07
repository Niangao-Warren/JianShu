'use strict';

var fs = require('fs');
var should = require('chai').should();
var gm = require('gm');

require('mocha');

var gmProc = require('../index');

var tiles = [{
  height: 128,
  width: 128,
  x: 0,
  y: 0,
  type: 'png',
  offset: 4,
  contents: fs.readFileSync('test/fixtures/png.png'),
  path: 'test/fixtures/png.png'
}, {
  height: 128,
  width: 128,
  x: 0,
  y: 136,
  type: 'png',
  offset: 4,
  contents: fs.readFileSync('test/fixtures/png.png'),
  path: 'test/fixtures/png.png'
}];

var log = {
  log: console.log,
  warn: console.warn,
  debug: console.log,
  error: console.error,
  success: console.log
};

describe('sprity-gm', function () {
  it('should return a png image buffer', function (done) {
    gmProc.create(tiles, {
      width: 136,
      height: 268,
      bgColor: [255, 255, 255, 0],
      log: log,
      options: {
        format: 'png'
      }
    }).then(function (image) {
      image.should.have.property('type', 'png');
      image.should.have.property('mimeType', 'image/png');
      image.should.have.property('width', 132);
      image.should.have.property('height', 268);
      image.should.have.property('contents');
      fs.writeFileSync('test/expected/result.png', image.contents);
      gm.compare('test/expected/image.png', 'test/expected/result.png', function (err, isEqual, equality) {
        fs.unlinkSync('test/expected/result.png');
        if (err) {
          throw err;
        }
        else {
          isEqual.should.be.true;
        }
        done();
      });
    });
  });

  it('should return a jpg image', function (done) {
    gmProc.create(tiles, {
      width: 136,
      height: 268,
      bgColor: [255, 255, 255, 100],
      log: log,
      options: {
        format: 'jpg'
      }
    }).then(function (image) {
      image.should.have.property('type', 'jpg');
      image.should.have.property('mimeType', 'image/jpg');
      image.should.have.property('width', 132);
      image.should.have.property('height', 268);
      image.should.have.property('contents');
      fs.writeFileSync('test/expected/result.jpg', image.contents);
      gm.compare('test/expected/image.jpg', 'test/expected/result.jpg', function (err, isEqual, equality) {
        fs.unlinkSync('test/expected/result.jpg');
        if (err) {
          throw err;
        }
        else {
          isEqual.should.be.true;
        }
        done();
      });
    });
  });

  it('should return a resized png image', function (done) {
    gmProc.scale({
      contents: fs.readFileSync('test/expected/image.png'),
      width: 136,
      height: 268
    }, {
      scale: 0.5,
      width: 136 / 2,
      height: 264 / 2,
      log: log
    }).then(function (image) {
      image.should.have.property('type', 'png');
      image.should.have.property('mimeType', 'image/png');
      image.should.have.property('width', 65);
      image.should.have.property('height', 132);
      image.should.have.property('contents');
      fs.writeFileSync('test/expected/result-image-scaled.png', image.contents);
      gm.compare('test/expected/image-scaled.png', 'test/expected/result-image-scaled.png', function (err, isEqual, equality) {
        fs.unlinkSync('test/expected/result-image-scaled.png');
        if (err) {
          throw err;
        }
        else {
          isEqual.should.be.true;
        }
        done();
      });
    });
  });

});
