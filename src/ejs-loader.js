
var utils = require('./utils');
var constants = require('./constants');
var ejs = require('ejs');

class EjsLoader {
  constructor() {
  }

  getEjsContent(filename) {
    var path = require('path');
    var filePath = path.join(constants.TEMPLATES_DIR, filename);
    var fileStr = utils.getFileContents(filePath);
    return fileStr;
  }

  getSimpleOutput() {
    return this.getEjsContent('simple-output.ejs');
  }

  getItemPickerOutput(inputId, inputLabel, submitLabel) {
    var template = this.getEjsContent('item-picker.ejs');
    var data = {
      input: {
        id: inputId,
        label: inputLabel,
        submitLabel: submitLabel
      }
    }
    return ejs.render(template, data, {});
  }
}

module.exports = new EjsLoader();
