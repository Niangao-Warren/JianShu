# sprity-lwip

[![NPM version](https://badge.fury.io/js/sprity-lwip.svg)](http://badge.fury.io/js/sprity-lwip) [![Build Status](https://travis-ci.org/sprity/sprity-lwip.svg?branch=master)](https://travis-ci.org/sprity/sprity-lwip) [![Dependencies](https://david-dm.org/sprity/sprity-lwip.svg)](https://david-dm.org/sprity/sprity-lwip)

> Image processor for [sprity](https://npmjs.org/package/sprity) that uses [lwip](https://www.npmjs.com/package/lwip) as the image processing library

> [sprity's](https://npmjs.org/package/sprity) default image processor

> javascript only, no external library dependencies

## Requirements

- [sprity](https://npmjs.org/package/sprity) version >= 1.0

## Install

By default `sprity-lwip` is installed with `sprity`.

```sh
npm install sprity
```

If you want to use the command line interface of `sprity` install it globally.

```
npm install sprity -g
```

## Supported image formats

* png (**Default**)
* jpg
* gif

## Options

* **lwip-interpolation:** Optional interpolation method. Defaults to "lanczos". Possible values:
  * nearest-neighbor
  * moving-average
  * linear
  * grid
  * cubic
  * lanczos

## Usage

See [sprity](https://npmjs.org/package/sprity) documentation

---
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/sprity/sprity?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
