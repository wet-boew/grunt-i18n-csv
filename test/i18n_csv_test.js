'use strict';

var grunt = require('grunt');

var supportFormats = {
  "yml": "YAML",
  "json": "JSON"
},
languages = {
  en: "English",
  fr: "French"
};
exports.i18n_csv = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  formats: function (test) {
    test.expect(Object.keys(languages).length * Object.keys(supportFormats).length);

    for (var format in supportFormats) {
      for (var lang in languages) {
        var file = lang + '.' + format;
        var actual = grunt.file.read('tmp/json/' + file);
        var expected = grunt.file.read('test/expected/json/' + file);
        test.equal(actual, expected, 'should create an ' + languages[lang] + ' ' + supportFormats[format] + ' file with all i18n strings.');
      }
    }

    test.done();
  },
  override_offset: function (test) {
    test.expect(Object.keys(languages).length);

    for (var lang in languages) {
      var file = lang + '.json';
      var actual = grunt.file.read('tmp/override_offset/' + file);
      var expected = grunt.file.read('test/expected/override_offset/' + file);
      test.equal(actual, expected, 'should use the overriden csv file and create an ' + languages[lang] + ' JSON file with all i18n strings, starting at the secopnd row and second column.');
    }

    test.done();
  },
  template: function (test) {
    test.expect(Object.keys(languages).length);

    for (var lang in languages) {
      var file = lang + '.json';
      var actual = grunt.file.read('tmp/template/' + file);
      var expected = grunt.file.read('test/expected/template/' + file);
      test.equal(actual, expected, 'should create an ' + languages[lang] + ' JSON file using the template and replacing the values between @@.');
    }

    test.done();
  }
};
