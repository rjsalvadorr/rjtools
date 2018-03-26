
class Utils {
  constructor() {
    this.uuid = require('uuid/v4');
  }

  convertListToString(list) {
    var str = '';
    var CRLF = '\r\n';

    list.forEach(function(item) {
      str += item + CRLF;
    });

    return str;
  }
}

module.exports = Utils;
