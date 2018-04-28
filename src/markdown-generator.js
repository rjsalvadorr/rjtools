
var utils = require('./utils');
var constants = require('./constants');

class MarkdownGenerator {
  constructor() {
  }

  generateMarkdownTemplate(date) {
    var path = require('path');
    var filePath = path.join(constants.TEMPLATES_DIR, 'template.md');
    var fileStr = utils.getFileContents(filePath);
    return fileStr.replace('{{{date}}}', date);
  }
}

module.exports = MarkdownGenerator;
