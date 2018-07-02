
var utils = require('./utils');
var constants = require('./constants');
var ejs = require('ejs');
var _str = require('lodash/string');

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

  compareNounsWithoutArticle(firstEntry, secondEntry) {
    // Sorts without using "el" or "la" (in Spanish).
    // Should also work for similar languages.
    var firstEntryArray = firstEntry.split(' -- ');
    var secondEntryArray = secondEntry.split(' -- ');
    var firstPairArray = firstEntryArray[0].split(/[ ]+/);
    var secondPairArray = secondEntryArray[0].split(/[ ]+/);
    let firstNoun, secondNoun;

    if (firstPairArray.length === 1) {
      firstNoun = firstPairArray[0];
    } else if (firstPairArray.length === 2) {
      firstNoun = firstPairArray[1];
    }
    
    if (secondPairArray.length === 1) {
      secondNoun = secondPairArray[0];
    } else if (secondPairArray.length === 2) {
      secondNoun = secondPairArray[1];
    }

    const funcLocale = 'es'; // Spanish is our default!
    return firstNoun.localeCompare(secondNoun, funcLocale);
  }

  sortRawEntries(rawLines) {
    // returns a dict of all entries, sorted by type (see constructor)
    const sortedEntries = {};
    const typesThatKeepAbbrev = ['nouns', 'verbs'];
    let currentLine, lineDataRaw, lineData, currentWordType, modifiedLine;

    for (var i = 0, len = rawLines.length; i < len; i++) {
      currentLine = rawLines[i];
      lineDataRaw = currentLine.split(' -- ');

      if(lineDataRaw.length <= 0 || lineDataRaw.length != 3 || lineDataRaw[0].startsWith('//')) {
        // Line is not formatted properly if this is the case.
        // Skip it!
        continue;
      }

      lineData = {
        word: lineDataRaw[0].trim(),
        typeAbbrev: lineDataRaw[1].trim(),
        definition: lineDataRaw[2].trim()
      }

      currentWordType = this.determineWordType(lineData.typeAbbrev);
      if(!sortedEntries[currentWordType]) {
        sortedEntries[currentWordType] = [];
      }

      if (typesThatKeepAbbrev.includes(currentWordType)) {
        modifiedLine = `${lineData.word} -- ${lineData.typeAbbrev} -- ${lineData.definition}`;
      } else {
        modifiedLine = `${lineData.word} -- ${lineData.definition}`;
      }
      sortedEntries[currentWordType].push(modifiedLine);
    }

    // Sort each category alphabetically
    for (var entryType in sortedEntries) {
      if(entryType === 'nouns') {
        sortedEntries[entryType].sort(this.compareNounsWithoutArticle);
      } else {
        sortedEntries[entryType].sort();
      }
    }

    return sortedEntries;
  }

  getSortedDict(filePath) {
    const rawContent = this.getRawDictContent(filePath);
    
    // Read each entry
    const rawLines = rawContent.split(/\r?\n/);

    // Sort each entry by word type
    return this.sortRawEntries(rawLines);
  }

  formatDictionaryEntry(rawString) {
    const lineData = rawString.split(' -- ');
    if(lineData.length == 2) {
      return `**${lineData[0]}**: ${lineData[1]}`;
    }
    else if(lineData.length == 3) {
      return `**${lineData[0]}**: _${lineData[1].toLowerCase()}_ - ${lineData[2]}`;
    }
    throw new Error('Invalid string value!');
  }

  getSortedDictAsMarkdown(filePath) {
    // Write as markdown text, with each category being sorted into its own thing.
    const sortedDict = this.getSortedDict(filePath);
    let outputText = '# Vocabulario\n\nMi vocabulario castellano.\n';
    let entries, rawEntry, entry;
    
    for (var entryType in sortedDict) {
      outputText += `\n---\n\n## ${entryType.toUpperCase()}\n\n`;
      entries = sortedDict[entryType];
      for (var i = 0, len = entries.length; i < len; i++) {
        rawEntry = entries[i];
        entry = this.formatDictionaryEntry(rawEntry);
        outputText += `${entry}   \n`;
      }
    }
    return outputText;
  }
}

module.exports = new DictionarySorter();
