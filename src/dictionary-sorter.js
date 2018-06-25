
var utils = require('./utils');
var constants = require('./constants');
var ejs = require('ejs');

class DictionarySorter {
  constructor() {
    // Define categories/word types
    this.wordTypes = {
      nouns: ['NF', 'NM'],
      verbs: ['VT', 'VI', 'VP', 'VR'],
      adjectives: ['ADJ'],
      adverbs: ['ADV'],
      prepositions: ['PREP'],
      phrases: ['PHR', 'PHRASE'],
    };
  }

  getRawDictContent(filePath) {
    var fileStr = utils.getFileContents(filePath);
    return fileStr;
  }

  sortRawEntries(rawLines) {
    // Sort each category alphabetically
    // returns a dict of all entries, sorted by type (see constructor)
    return {
      nouns: ['nnnn', 'nnnn'],
      verbs: ['vvvv', 'vvvv', 'vvvv', 'vvvv'],
      adjectives: ['aaaa'],
      adverbs: ['dddd'],
      prepositions: ['pppp'],
      phrases: ['hhhh', 'hhhh'],
    };
  }

  getSortedDict(filePath) {
    const rawContent = this.getRawDictContent(filePath);

    // Read each entry
    const rawLines = rawContent.split('\n', null);

    // Sort each entry by word type
    return this.sortRawEntries(rawLines);
  }

  getSortedDictAsMarkdown(filePath) {
    // Write as markdown text, with each category being sorted into its own thing.
    const sortedDict = this.getSortedDict(filePath);
    return 'TODO - implement function';
  }
}

module.exports = new DictionarySorter();
