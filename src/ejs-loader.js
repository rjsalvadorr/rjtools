
var utils = require('./utils');
var constants = require('./constants');

class EjsLoader {
  constructor() {
  }

  getEjsContent(filename) {
    var path = require('path');
    var filePath = path.join(constants.TEMPLATES_DIR, filename);
    var fileStr = utils.getFileContents(filePath);
    return fileStr;
  }
}

module.exports = new EjsLoader();
