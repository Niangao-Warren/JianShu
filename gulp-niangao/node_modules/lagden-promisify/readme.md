# lagden-promisify [![NPM version](https://img.shields.io/npm/v/lagden-promisify.svg)](https://www.npmjs.com/package/lagden-promisify)
[![Build Status](https://travis-ci.org/lagden/promisify.svg?branch=master)](https://travis-ci.org/lagden/promisify)
[![Coverage Status](https://coveralls.io/repos/lagden/promisify/badge.svg?branch=master&service=github)](https://coveralls.io/github/lagden/promisify?branch=master)
[![Dependency Status](https://david-dm.org/lagden/promisify.svg)](https://david-dm.org/lagden/promisify)
[![devDependency Status](https://david-dm.org/lagden/promisify/dev-status.svg)](https://david-dm.org/lagden/promisify#info=devDependencies)

> Convert callback to promise


## Install

Compatible with **Node.js >= 6**

```
$ npm i -S lagden-promisify
```

Compatible with **Node.js >= 5.0.0**

```
$ npm i -S lagden-promisify@2.0.0
```

Compatible with **Node.js >= 4**

```
$ npm i -S lagden-promisify@1.0.2
```


## Usage

```javascript
const promisify = require('lagden-promisify');
const fs = require('fs');
const readfile = promisify(fs.readFile);

readfile('./sample.txt')
  .then(data => console.log);
  .catch(err => console.log);
```


## License

MIT © [Thiago Lagden](http://lagden.in)
