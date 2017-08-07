/*!
 * gulp-lwip
 * https://github.com/MaxArt2501/gulp-lwip
 *
 * Copyright (c) 2015 Massimo Artizzu
 * Licensed under the MIT license.
 */
"use strict";

var lwip = require("lwip"),
    fileType = require("file-type"),
    PluginError = require("gulp-util").PluginError,
    through = require("through2");

function isValidType(type) {
    return ~[ "jpg", "png", "gif" ].indexOf(type);
}

var extensions = {
    rescale: function(width, height/*, inter, callback*/) {
        var alen = arguments.length - 1,
            args = [ arguments[alen] ];

        if (typeof arguments[alen - 1] === "string")
            // Should be the interpolation option
            args.unshift(arguments[--alen]);

        if (alen < 2 || height == null)
            height = width * this.height() / this.width();
        else if (width == null)
            width = height * this.width() / this.height();

        this.resize.apply(this, [ width, height ].concat(args));
    },
    putImage: function(left, top, image, callback) {
        var that = this;

        function cb(err, layer) {
            if (err)
                return done(new PluginError("gulp-lwip", "Error opening the layer image: " + err.message));

            that.paste(left, top, layer, callback);
        }

        if (Buffer.isBuffer(image)) {
            var type = fileType(image);
            lwip.open(image, type && type.ext, cb);
        } else lwip.open(image, cb);
    }
};

var methods = [
    "resize", "scale", "contain", "cover", "rotate", "crop",
    "blur", "sharpen", "mirror", "flip", "border", "pad",
    "saturate", "lighten", "darken", "hue", "fade", "opacity", "setPixel"
].concat(Object.keys(extensions));

function lwipTask(actions, format, params) {
    var thru = through.obj(function(file, encoding, done) {
        if (file.isNull() || !actions.length && !format && !params) {
            // Nothing to do here
            this.push(file), done();
            return;
        }

        if (file.isBuffer()) {
            try {
                // Buffer mode
                var type = fileType(file.contents);
                if (!type || !isValidType(type.ext)) {
                    // Ignore unsupported files
                    this.push(file), done();
                    return;
                }
                    
                
                if (!actions.length && type.ext === format && !params) {
                    // No actions, and the file format is the same of the original
                    this.push(file), done();
                    return;
                }
                
                lwip.open(file.contents, type.ext, function(err, image) {
                    if (err)
                        return done(new PluginError("gulp-lwip", "Error opening the image: " + err.message));

                    for (var ext in extensions)
                        image[ext] = extensions[ext];

                    function executeActions(i) {
                        var now = Date.now();
                        if (i < actions.length) {
                            var action = actions[i][0],
                                args = actions[i].slice(1).concat(function(err, img) {
                                    if (err)
                                        return done(new PluginError("gulp-lwip", "Error processing the image: " + err.message));

                                    image = img;
                                    executeActions(i + 1);
                                });

                            image[action].apply(image, args);
                        } else {
                            image.toBuffer(format || type.ext, params || {}, function(err, buffer) {
                                if (err)
                                    return done(new PluginError("gulp-lwip", "Error writing the image: " + err.message));

                                file.contents = buffer;
                                done(null, file);
                            });
                        }

                    }
                    executeActions(0);
                });
            } catch (e) {
                done(new PluginError("gulp-lwip", e));
            }
        } else if (file.isStream()) {
            // Stream mode - not supported
            done(new PluginError("gulp-lwip", "Stream mode not supported"));
        } else done(new PluginError("gulp-lwip", "Invalid input type"));
    });

    thru.exportAs = function(type, par) {
        if (type != null) {
            type = String(type).toLowerCase();

            if (isValidType(type))
                format = type;
            else throw new PluginError("gulp-lwip", "Invalid image format")
        }
        if (par && typeof par === "object")
            params = par;

        return this;
    };

    methods.forEach(function(method) {
        thru[method] = function() {
            var action = [ method ].concat([].slice.call(arguments));

            return lwipTask(actions.concat([ action ]), format, params);
        };
    });

    return thru;
}

module.exports = exports = lwipTask([]);
