/*
 * grunt-i18n-csv
 * https://github.com/wet-boew/grunt-i18n-csv
 *
 * Copyright (c) 2014 Laurent Goderre
 * Licensed under the MIT license.
 */

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

				var match = new RegExp("@" + id + "@", "g");
				results[resultIndex] = results[resultIndex]
					.replace(match, value
						.replace(/"/g, "\\\"")
						.replace(/\\'/g, "'"));
			}
		},

		complete: function () {
			return results;
		}
	};
};