'use strict';

var grunt = require('grunt');

var supportFormats = {
  "yaml": "yml",
  "json": "json"
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
        var file = format + '/' + lang + '.' + supportFormats[format];
        var actual = grunt.file.read('tmp/' + file);
        var expected = grunt.file.read('test/expected/' + file);
        test.equal(actual, expected, 'should create an ' + languages[lang] + ' ' + format.toUpperCase() + ' file with all i18n strings.');
      }
    }

    test.done();
  },
  missing_simple: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/missing_simple/fr.json');
    var expected = grunt.file.read('test/expected/missing_simple/fr.json');
    test.equal(actual, expected, 'should use the default language string for missing translations');

    test.done();
  },
  header_has_key: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/header_has_key/en.json');
    var expected = grunt.file.read('test/expected/header_has_key/en.json');
    test.equal(actual, expected, 'should use the first row for headers and values');

    test.done();
  },
  override_offset: function (test) {
    test.expect(Object.keys(languages).length);

    for (var lang in languages) {
      var file = lang + '.json';
      var actual = grunt.file.read('tmp/override_offsets/' + file);
      var expected = grunt.file.read('test/expected/override_offsets/' + file);
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
  },
  missing_template: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/missing_template/fr.json');
    var expected = grunt.file.read('test/expected/missing_template/fr.json');
    test.equal(actual, expected, 'should use the default language string for missing translations when using a template');

    test.done();
  }
};
