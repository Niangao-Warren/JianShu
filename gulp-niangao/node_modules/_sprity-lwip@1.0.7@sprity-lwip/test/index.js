'use strict';

var fs = require('fs');
var should = require('chai').should();

require('mocha');

var lwipProc = require('../index');

var tiles = [{
  height: 128,
  width: 128,
  x: 0,
  y: 0,
  type: 'png',
  offset: 4,
  contents: fs.readFileSync('test/fixtures/png.png')
}, {
  height: 512,
  width: 512,
  x: 0,
  y: 136,
  type: 'jpg',
  offset: 4,
  contents: fs.readFileSync('test/fixtures/jpg.jpg')
}];

describe('sprity-lwip', function () {
  it('should return a png image buffer', function (done) {
    lwipProc.create(tiles, {
      width: 520,
      height: 656,
      bgColor: [0, 0, 0, 0],
      options: {
        format: 'png'
      }
    }).then(function (image) {
      image.should.have.property('width', 520);
      image.should.have.property('height', 656);
      image.should.have.property('contents');
      image.contents.toString().should.equal(fs.readFileSync('test/expected/image.png').toString());
      done();
    });
  });

  it('should return a jpg image buffer', function (done) {
    lwipProc.create(tiles, {
      width: 520,
      height: 656,
      bgColor: [0, 0, 0, 0],
      options: {
        format: 'jpg'
      }
    }).then(function (image) {
      image.should.have.property('width', 520);
      image.should.have.property('height', 656);
      image.should.have.property('contents');
      image.contents.toString().should.equal(fs.readFileSync('test/expected/image.jpg').toString());
      done();
    });
  });

  it('should return a gif image buffer', function (done) {
    lwipProc.create(tiles, {
      width: 520,
      height: 656,
      bgColor: [0, 0, 0, 0],
      options: {
        format: 'gif'
      }
    }).then(function (image) {
      image.should.have.property('width', 520);
      image.should.have.property('height', 656);
      image.should.have.property('contents');
      image.contents.toString().should.equal(fs.readFileSync('test/expected/image.gif').toString());
      done();
    });
  });
});
