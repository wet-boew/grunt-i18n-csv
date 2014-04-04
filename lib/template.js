/*
 * grunt-i18n-csv
 * https://github.com/wet-boew/grunt-i18n-csv
 *
 * Copyright (c) 2014 Laurent Goderre
 * Licensed under the MIT license.
 */

 var path = require('path');

var options;
var results;

module.exports = function (opts) {
	options = opts;
	results = [];

	return {
		process: function(row) {
			for (var s = 1; s < row.length; s++) {
				var id = row[0];
				var value = row[s];
				var resultIndex = s - 1;

				if (results[resultIndex] === undefined) {
					results[resultIndex] = options.templateContent;
				}

				if (value === '' && options.useDefaultOnMissing) {
					value = row[1];
				}

				if (options.ext === '.js' || options.ext === '.json') {
					value = JSON.stringify(value);
					value = value.substring(1, value.length - 1);
				}

				var match = new RegExp("@" + id + "@", "g");
				results[resultIndex] = results[resultIndex].replace(match, value);
			}
		},

		complete: function () {
			return results;
		}
	};
};