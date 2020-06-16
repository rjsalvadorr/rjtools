
class Utils {
  // constructor() {
  //   const { v4: uuidv4 } = require('uuid');
  //   this.uuid = require('uuid/v4');
  // }

  convertListToString(list) {
    var str = '';
    var LF = '\n';
    var CRLF = '\r\n';

    list.forEach(function (item) {
      str += item + LF;
    });

    return str;
  }

  getFileContents(filePath) {
    var fs = require('fs');
    var buffer = fs.readFileSync(filePath);
    return buffer.toString();
  }

  getJsonContents(filePath) {
    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return obj;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Returns first line of the file that has content, or "undefined" in any other case.
  getFirstLineOfFile(filePath) {
    const fileContent = this.getFileContents(filePath);
    const fileLines = fileContent.split(/\r?\n/);
    let currentLine;
    for (var i = 0, len = fileLines.length; i < len; i++) {
      currentLine = fileLines[i];
      const isFalse = !currentLine;
      const isEmpty = currentLine.length === 0;
      const isWhitespaceOnly = /^\s*$/.test(currentLine);
      const hasContent = !isFalse && !isEmpty && !isWhitespaceOnly;

      if(hasContent) {
        // This line has actual content. Return it!
        return currentLine;
      }
    }
  }

  getMarkdownTitle(filePath) {
    const firstLine = this.getFirstLineOfFile(filePath);
    const titleRegex = /^\s*#+\s/;
    const cleanedFirstLine = firstLine.replace(titleRegex, '');
    return cleanedFirstLine;
  }
}

module.exports = new Utils();
