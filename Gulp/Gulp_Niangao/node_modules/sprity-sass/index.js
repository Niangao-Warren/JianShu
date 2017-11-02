'use strict';

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs-extra'));
var path = require('path');

var getTemplate = function (opt) {
  var type = opt['style-type'] ? opt['style-type'] : 'scss';
  return fs.readFileAsync(path.join(__dirname, 'template', type + '.hbs'), 'utf8');
};

var transform = Promise.method(function (layouts, source, opt, Handlebars) {
  var template = Handlebars.compile(source);
  var classIndicator = '.'; // opt['style-indicator'] ? opt['style-indicator'] : '.';
  return template({
    layouts: layouts,
    opt: opt,
    indicator: classIndicator
  });
});

module.exports = {
  process: function (layouts, opt, Handlebars) {
    return getTemplate(opt)
      .then(function (source) {
        return transform(layouts, source, opt, Handlebars);
      });
  },
  isBeautifyable: function (opt) {
    if (opt['style-type'] && opt['style-type'] === 'sass') {
      return false;
    }
    return true;
  },
  extension: function (opt) {
    return opt['style-type'] ? opt['style-type'] : 'scss';
  }
};
