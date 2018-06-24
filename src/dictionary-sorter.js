
var utils = require('./utils');
var constants = require('./constants');
var ejs = require('ejs');

class DictionarySorter {
  constructor() {
    this.wordTypes = {
      noun: ['NF', 'NM'],
      verb: ['VT', 'VI', 'VP', 'VR'],
      adjective: ['ADJ'],
      adverb: ['ADV'],
      preposition: ['PREP'],
      phrase: ['PHR', 'PHRASE'],
    };
  }

  getRawDictContent(filePath) {
    var fileStr = utils.getFileContents(filePath);
    return fileStr;
  }

  getSortedDict(filePath) {
    const rawContent = this.getRawDictContent(filePath);
    const rawLines = rawContent.split('\n', null);
    return rawContent;
  }
}

module.exports = new DictionarySorter();
