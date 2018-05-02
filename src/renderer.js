// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var utils = require('./utils');
var TimestampGenerator = require('./timestamp-generator');
var UUIDGenerator = require('./uuid-generator');
var RandomWordGenerator = require('./random-word-generator');
var MarkdownGenerator = require('./markdown-generator');
var ProgressionGenerator = require('./progression-generator');



///// Utility functions

function getOutputTextArea() {
  return document.querySelector('.output');
}

function getOutputWrapper() {
  return document.querySelector('#output-wrapper');
}

function switchOutputPanel(htmlContent) {
  getOutputWrapper().innerHTML = htmlContent;
}

function resetOutputPanel() {
  var ejsLoader = require('./ejs-loader');
  var simpleOutputPanel = ejsLoader.getEjsContent('simple-output.ejs');
  switchOutputPanel(simpleOutputPanel);
}



///// Event handlers

function handleTimestamps() {
  resetOutputPanel();
  var tGen = new TimestampGenerator();
  var outVal = tGen.getAllTimestamps();
  getOutputTextArea().value = outVal;
}

function handleUUID() {
  resetOutputPanel();
  var idGen = new UUIDGenerator();
  var outVal = idGen.getUUID() + '\r\n';
  outVal += idGen.getUUID() + '\r\n';
  outVal += idGen.getUUID() + '\r\n';
  outVal += idGen.getUUID() + '\r\n';
  outVal += idGen.getUUID() + '\r\n';
  outVal += idGen.getUUID() + '\r\n';
  outVal += idGen.getUUID() + '\r\n';
  outVal += idGen.getUUID() + '\r\n';
  getOutputTextArea().value = outVal;
}

function handleRandomWords() {
  resetOutputPanel();
  var wordGen = new RandomWordGenerator();
  // var utils = new Utils();
  var outVal = utils.convertListToString(wordGen.getDefaultRandomWords());
  getOutputTextArea().value = outVal;
}

function handleMarkdown() {
  resetOutputPanel();
  var mdGen = new MarkdownGenerator();
  var tGen = new TimestampGenerator();
  var date = tGen.getLongDate();
  var outVal = mdGen.generateMarkdownTemplate(date);
  getOutputTextArea().value = outVal;
}

function handleRandomProg() {
  resetOutputPanel();
  var pGen = new ProgressionGenerator();
  var outVal = pGen.getRandomPracticeProg();
  getOutputTextArea().value = outVal;
}

function handleMarkdownPdfConversion() {
  var ejsLoader = require('./ejs-loader');
  var itemPickerOutputPanel = ejsLoader.getEjsContent('item-picker.ejs');
  switchOutputPanel(itemPickerOutputPanel);
}



///// Register event handlers

document.querySelector('#btnTimestamps').addEventListener('click', handleTimestamps);
document.querySelector('#btnUUID').addEventListener('click', handleUUID);
document.querySelector('#btnRandomWords').addEventListener('click', handleRandomWords);
document.querySelector('#btnMarkdown').addEventListener('click', handleMarkdown);
document.querySelector('#btnRandomProg').addEventListener('click', handleRandomProg);
document.querySelector('#btnMarkdownPdf').addEventListener('click', handleMarkdownPdfConversion);



///// Display timestamps as default
handleTimestamps();
