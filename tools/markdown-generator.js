
var utils = require('./utils');

class MarkdownGenerator {
  constructor() {
  }

  generateMarkdownTemplate(date) {
    var path = require('path');
    var filePath = path.join(__dirname, 'templates/template.md');
    var fileStr = utils.getFileContents(filePath);
    return fileStr.replace('{{{date}}}', date);
  }
}

module.exports = MarkdownGenerator;
