# sprity-gm

[![NPM version](https://badge.fury.io/js/sprity-gm.svg)](http://badge.fury.io/js/sprity-gm) [![Build Status](https://travis-ci.org/sprity/sprity-gm.svg?branch=master)](https://travis-ci.org/sprity/sprity-gm) [![Dependencies](https://david-dm.org/sprity/sprity-gm.svg)](https://david-dm.org/sprity/sprity-gm)

> Image processor for [sprity](https://npmjs.org/package/sprity) that uses [gm](https://www.npmjs.com/package/gm) as its image processing library.

## Requirements

- [sprity](https://npmjs.org/package/sprity) version >= 1.0
- [gm](https://www.npmjs.com/package/easy-gm) which depends on [GraphicsMagick](http://www.graphicsmagick.org/) or [ImageMagick](http://www.imagemagick.org/).
  - Please refer to the [installation guide](https://www.npmjs.com/package/gm#getting-started).

## Install

* install [GraphicsMagick](http://www.graphicsmagick.org/) or [ImageMagick](http://www.imagemagick.org/)
* install sprity-gm

```sh
npm install sprity sprity-gm
```

Install sprity-gm globally if you want to use `sprity's` command line interface

```sh
npm install sprity sprity-gm -g
```

## Supported image formats

* png (**Default**)
* jpg
* gif

Other formats supported by GraphicsMagick or ImageMagick may also work.

## Options

* **gm-use-imagemagick:** use [ImageMagick](http://www.imagemagick.org/) instead of [GraphicsMagick](http://www.graphicsmagick.org/) [*Default:* false]

## Usage

See [sprity](https://npmjs.org/package/sprity) documentation

---
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/sprity/sprity?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
