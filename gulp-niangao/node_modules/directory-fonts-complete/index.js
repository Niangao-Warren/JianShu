var fontWeights = require('./helper-font-weights.js');
var fontStyles = require('./helper-font-styles.js');
var fs = require('fs');
var isEot = require('is-eot');
var isOtf = require('is-otf');
var isTtf = require('is-ttf');
var isWoff = require('is-woff');
var opentype = require('./helper-opentype.js');
var path = require('path');
var utf8decode = require('./helper-utf8decode.js');

function getNormalizedFontFamilyByLangData(langData) {
	var hasLangDataKeys = 1 in langData && 2 in langData;

	if (hasLangDataKeys) {
		var lastIndex = langData[1].lastIndexOf(langData[2]);
		var unsubbedFontName = lastIndex === -1 ? langData[1] : langData[1].slice(0, lastIndex);

		var spacedFontName = unsubbedFontName.replace(/([A-z0-9])([A-Z][a-z])/g, '$1 $2').replace(/([A-z0-9])([A-Z][a-z])/g, '$1 $2').replace(/([a-z0-9])([A-Z])$/g, '$1 $2');
		var trimmedFontName = spacedFontName.replace(/^[^A-z0-9]+|[^A-z0-9]+$/g, '');

		return trimmedFontName;
	}
}

function getNormalizedFontFormatByBuffer(buffer) {
	return isWoff(buffer) ? 'woff' : isTtf(buffer) ? 'ttf' : isEot(buffer) ? 'eot' : isOtf(buffer) ? 'otf' : undefined;
}

function getNormalizedFontStyleByLangData(langData) {
	if (2 in langData) {
		for (regex in fontStyles) {
			if (langData[2].toLowerCase().match(regex)) return fontStyles[regex];
		}
	}

	return 'normal';
}

function getNormalizedFontWeightByLangData(langData) {
	if (2 in langData) {
		for (regex in fontWeights) {
			if (langData[2].toLowerCase().match(regex)) return fontWeights[regex];
		}
	}

	return 400;
}

function addFontToFoundryByPath(foundry, resolvedFilePath, relativeFilePath) {
	var buffer = fs.readFileSync(resolvedFilePath);
	var fontFormat = getNormalizedFontFormatByBuffer(buffer);

	if (fontFormat) {
		var arrayBuffer = new Uint8Array(buffer).buffer;
		var rawData = opentype.parse(arrayBuffer);
		var nameData = rawData && rawData.tables && rawData.tables.name;

		if (nameData) {
			var hasEnUS = 'en-US' in nameData;
			var tableKey = hasEnUS ? 'en-US' : 'en';
			var langData = nameData[tableKey];

			if (hasEnUS) {
				Object.keys(langData).forEach(function (key) {
					langData[key] = utf8decode(langData[key]);
				});
			}

			var fontFamily = getNormalizedFontFamilyByLangData(langData);
			var fontWeight = getNormalizedFontWeightByLangData(langData);
			var fontStyle = getNormalizedFontStyleByLangData(langData);
			var fontSrcLocal = 4 in langData && 6 in langData ? [langData[4], langData[6]] : 4 in langData ? [langData[4]] : [];

			if (fontFamily && fontWeight && fontStyle) {
				var foundryFamily = foundry[fontFamily] = foundry[fontFamily] || {};
				var foundryVariants = foundryFamily.variants = foundryFamily.variants || {};
				var foundryWeight = foundryVariants[fontWeight] = foundryVariants[fontWeight] || {};
				var foundryStyle  = foundryWeight[fontStyle] = foundryWeight[fontStyle] || { local: [], url: {} };

				if (fontSrcLocal.length) {
					foundryStyle.local = fontSrcLocal;
				}

				foundryStyle.url[fontFormat] = relativeFilePath;
			}
		}
	}
}

module.exports = function (relativeDirPath, relativeFontPath) {
	relativeDirPath = relativeDirPath.replace(/\/$/, '');
  relativeFontPath = relativeFontPath || relativeDirPath;

	var resolvedDirPath = path.resolve(relativeDirPath);

	var foundry = {};

	if (fs.existsSync(resolvedDirPath) && fs.lstatSync(resolvedDirPath).isDirectory()) {
		var filePaths = fs.readdirSync(resolvedDirPath);

		filePaths.forEach(function (filePath) {
			var resolvedFilePath = resolvedDirPath + '/' + filePath;
			var relativeFilePath = relativeFontPath + '/' + filePath;

			addFontToFoundryByPath(foundry, resolvedFilePath, relativeFilePath);
		});
	}

	return foundry;
};
