
var utils = require('./utils');
var constants = require('./constants');
var ejs = require('ejs');

class DictionarySorter {
  constructor() {
    // Define categories/word types
    this.wordTypes = {
      nouns: ['NF', 'NM'],
      verbs: ['V', 'VT', 'VI', 'VP', 'VR'],
      adjectives: ['ADJ'],
      adverbs: ['ADV'],
      prepositions: ['PREP'],
      conjunctions: ['CON', 'CONJ'],
      phrases: ['PHR', 'PHRASE'],
    };
  }

  getRawDictContent(filePath) {
    var fileStr = utils.getFileContents(filePath);
    return fileStr;
  }

  determineWordType(typeAbbrev) {
    for (var wordType in this.wordTypes) {
      if(this.wordTypes[wordType].includes(typeAbbrev)) {
        return wordType;
      }
    }
    return 'misc';
  }

  sortRawEntries(rawLines) {
    // returns a dict of all entries, sorted by type (see constructor)
    const sortedEntries = {};
    let currentLine, lineDataRaw, lineData, currentWordType;
    for (var i = 0, len = rawLines.length; i < len; i++) {
      currentLine = rawLines[i];
      lineDataRaw = currentLine.split(' -- ');

      if(lineDataRaw.length != 3) {
        // Line is not formatted properly if this is the case.
        // Skip it!
        break;
      }

      lineData = {
        word: lineDataRaw[0],
        typeAbbrev: lineDataRaw[1],
        definition: lineDataRaw[2]
      }

      currentWordType = this.determineWordType(lineData.typeAbbrev);
      if(!sortedEntries[currentWordType]) {
        sortedEntries[currentWordType] = [];
      }
      sortedEntries[currentWordType].push(currentLine);
    }

    // Sort each category alphabetically
    for (var entryType in sortedEntries) {
      sortedEntries[entryType].sort();
    }

    return sortedEntries;
  }

  getSortedDict(filePath) {
    const rawContent = this.getRawDictContent(filePath);
    
    // Read each entry
    const rawLines = rawContent.split(/\r?\n/);
    
    console.log('filePath', filePath);
    console.log('rawContent', rawContent);
    console.log('rawLines', rawLines);
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
