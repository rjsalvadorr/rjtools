
var utils = require('./utils');
var constants = require('./constants');

class JsSnippets {
  constructor() {
  }

  static getJsSnippets() {
    var path = require('path');
    var filePath = path.join(constants.TEMPLATES_DIR, 'js-snippets.txt');
    return utils.getFileContents(filePath);
  }
}

module.exports = JsSnippets;
