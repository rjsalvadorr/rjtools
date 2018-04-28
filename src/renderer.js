// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var utils = require('./utils');
var TimestampGenerator = require('./timestamp-generator');
var UUIDGenerator = require('./uuid-generator');
var RandomWordGenerator = require('./random-word-generator');
var MarkdownGenerator = require('./markdown-generator');
var ProgressionGenerator = require('./progression-generator');

var outputTextarea = document.querySelector('#output');

function handleTimestamps() {
  var tGen = new TimestampGenerator();
  var outVal = tGen.getAllTimestamps();
  outputTextarea.value = outVal;
}

function handleUUID() {
  var idGen = new UUIDGenerator();
  var outVal = idGen.getUUID() + '\r\n';
  outVal += idGen.getUUID() + '\r\n';
  outVal += idGen.getUUID() + '\r\n';
  outVal += idGen.getUUID() + '\r\n';
  outVal += idGen.getUUID() + '\r\n';
  outVal += idGen.getUUID() + '\r\n';
  outVal += idGen.getUUID() + '\r\n';
  outVal += idGen.getUUID() + '\r\n';
  outputTextarea.value = outVal;
}

function handleRandomWords() {
  var wordGen = new RandomWordGenerator();
  // var utils = new Utils();
  var outVal = utils.convertListToString(wordGen.getDefaultRandomWords());
  outputTextarea.value = outVal;
}

function handleMarkdown() {
  var mdGen = new MarkdownGenerator();
  var tGen = new TimestampGenerator();
  var date = tGen.getLongDate();
  var outVal = mdGen.generateMarkdownTemplate(date);
  outputTextarea.value = outVal;
}

function handleRandomProg() {
  var pGen = new ProgressionGenerator();
  var outVal = pGen.getRandomPracticeProg();
  outputTextarea.value = outVal;
}

// Register event handlers
document.querySelector('#btnTimestamps').addEventListener('click', handleTimestamps);
document.querySelector('#btnUUID').addEventListener('click', handleUUID);
document.querySelector('#btnRandomWords').addEventListener('click', handleRandomWords);
document.querySelector('#btnMarkdown').addEventListener('click', handleMarkdown);
document.querySelector('#btnRandomProg').addEventListener('click', handleRandomProg);

// Display timestamps as default
handleTimestamps();
