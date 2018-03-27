// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var Utils = require('./tools/utils');
var TimestampGenerator = require('./tools/timestamp-generator');
var UUIDGenerator = require('./tools/uuid-generator');
var RandomWordGenerator = require('./tools/random-word-generator');

function handleTimestamps() {
  document.querySelector('#output').value = "TEST1";
  var tGen = new TimestampGenerator();
  var outVal = tGen.getAllTimestamps();
  document.querySelector('#output').value = outVal;
}

function handleUUID() {
  document.querySelector('#output').value = "TEST2";
  var idGen = new UUIDGenerator();
  var outVal = idGen.getUUID() + '\r\n';
  outVal += idGen.getUUID() + '\r\n';
  outVal += idGen.getUUID() + '\r\n';
  document.querySelector('#output').value = outVal;
}

function handleRandomWords() {
  document.querySelector('#output').value = "TEST3";
  var wordGen = new RandomWordGenerator();
  var utils = new Utils();
  var outVal = utils.convertListToString(wordGen.getDefaultRandomWords());
  document.querySelector('#output').value = outVal;
}

document.querySelector('#btnTimestamps').addEventListener('click', handleTimestamps);
document.querySelector('#btnUUID').addEventListener('click', handleUUID);
document.querySelector('#btnRandomWords').addEventListener('click', handleRandomWords);
