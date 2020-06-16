var NUM_WORDS = 24;

class RandomWordGenerator {
  constructor() {
    this.sentencer = require('sentencer');
  }

  getRandomWord() {
    var randomBool = Math.random() < 0.5;
    return randomBool ? this.sentencer.make('{{ noun }}') : this.sentencer.make('{{ adjective }}');
  }

  getRandomPair() {
    var randomBool = Math.random() < 0.5;
    return `${this.sentencer.make('{{ adjective }}')}-${this.sentencer.make('{{ noun }}')}`;
  }

  getRandomWords(numWords) {
    var wordList = [];

    for(var i = 0; i < numWords; i++) {
      wordList.push(this.getRandomPair());
    }

    return wordList;
  }

  getDefaultRandomWords() {
    return this.getRandomWords(NUM_WORDS);
  }
}

module.exports = RandomWordGenerator;
