
var utils = require('./utils');
var constants = require('./constants');

class ProgressionGenerator {
  constructor() {
  }

  getRandomPracticeProg() {
    var path = require('path');

    var filePath = path.join(constants.DATA_DIR, 'progressions.json');
    var progData = utils.getJsonContents(filePath);
    var randomProgId = utils.getRandomInt(1, progData.numProgressions);
    var randomProg = progData.progressions.find(function(prog) {
      return prog.id === randomProgId;
    });

    var displayProg = randomProg.part1 + '\n' + randomProg.part2 + '\n';
    return displayProg;
  }
}

module.exports = ProgressionGenerator;
