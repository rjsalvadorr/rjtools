
class Utils {
  constructor() {
    this.uuid = require('uuid/v4');
  }

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
}

module.exports = new Utils();
