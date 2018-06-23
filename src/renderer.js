// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var _ = require('lodash');
var utils = require('./utils');
var constants = require('./constants');
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

function printOutput(text) {
  getOutputTextArea().innerHTML = text;
}

function getDirectoryPathFromExplorer() {
  const { dialog } = require('electron').remote;

  var inputDirectories = dialog.showOpenDialog({
    properties: ['openDirectory']
  });

  return inputDirectories[0];
}

function getFilePathFromExplorer() {
  const { dialog } = require('electron').remote;

  var inputDirectories = dialog.showOpenDialog({
    properties: ['openFile']
  });

  return inputDirectories[0];
}

function getMarkdownFilePathFromExplorer() {
  const { dialog } = require('electron').remote;

  var inputDirectories = dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Markdown files', extensions: ['md', 'markdown'] }
    ],
  });

  return !_.isEmpty(inputDirectories) ? inputDirectories[0] : null;
}

function switchOutputPanel(htmlContent) {
  getOutputWrapper().innerHTML = htmlContent;
}

function resetOutputPanel() {
  var ejsLoader = require('./ejs-loader');
  var simpleOutputPanel = ejsLoader.getSimpleOutput();
  switchOutputPanel(simpleOutputPanel);
}



///// Event handlers

function handleTimestamps() {
  return new Promise((resolve, reject) => {
    try {
      resetOutputPanel();
      var tGen = new TimestampGenerator();
      var outVal = tGen.getAllTimestamps();
      resolve(outVal);
    } catch(error) {
      reject(error);
    }
  });
}

function handleUUID() {
  return new Promise((resolve, reject) => {
    try {
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
      resolve(outVal);
    } catch(error) {
      reject(error);
    }
  });
}

function handleRandomWords() {
  return new Promise((resolve, reject) => {
    try {
      resetOutputPanel();
      var wordGen = new RandomWordGenerator();
      var outVal = utils.convertListToString(wordGen.getDefaultRandomWords());
      resolve(outVal);
    } catch(error) {
      reject(error);
    }
  });
}

function handleMarkdown() {
  return new Promise((resolve, reject) => {
    try {
      resetOutputPanel();
      var mdGen = new MarkdownGenerator();
      var tGen = new TimestampGenerator();
      var date = tGen.getLongDate();
      var outVal = mdGen.generateMarkdownTemplate(date);
      resolve(outVal);
    } catch(error) {
      reject(error);
    }
  });
}

function handleRandomProg() {
  return new Promise((resolve, reject) => {
    try {
      resetOutputPanel();
      var pGen = new ProgressionGenerator();
      var outVal = pGen.getRandomPracticeProg();
      resolve(outVal);
    } catch(error) {
      reject(error);
    }
  });
}

function handleMarkdownPdfConversion() {
  var markdownpdf = require("markdown-pdf");
  var fs = fs || require("fs");
  var path = path || require("path");

  var inFilePath = document.querySelector('.input--item-picker').value;

  if (!inFilePath) {
    printOutput('No file specified!');
    return;
  }

  var parsedPath = path.parse(inFilePath);
  _.merge(parsedPath, { ext: '.pdf', base: '' });
  var outFilePath = path.format(parsedPath);
  var cssPath = path.join(constants.ROOT_DIR, 'src/css');

  // printOutput(inFilePath + '\n' + JSON.stringify(parsedPath, null, 2) + '\n' + outFilePath);

  markdownpdf({
    cssPath: cssPath,
    paperFormat: 'Letter',
    paperBorder: '0.5in',
  }).from(inFilePath).to(outFilePath, function () {
    printOutput('Markdown file converted to ' + outFilePath);
  });

  document.querySelector('.input--item-picker').value = '';
}

function setupMarkdownPdfConversion() {
  var ejsLoader = require('./ejs-loader');
  var itemPickerOutputPanel = ejsLoader.getItemPickerOutput('markdown-filename', 'Choose markdown file', 'Convert to PDF');
  switchOutputPanel(itemPickerOutputPanel);

  document.querySelector('.input-button--item-picker').addEventListener('click', function () {
    var mdPath = getMarkdownFilePathFromExplorer();
    document.querySelector('.input--item-picker').value = mdPath;
  });

  document.querySelector('.input-button--submit').addEventListener('click', handleMarkdownPdfConversion);
}

function triggerError() {
  return new Promise((resolve, reject) => {
    try {
      throw "Test error triggered!";
      resolve(outVal);
    } catch(error) {
      reject(error);
    }
  });
}



///// Register event handlers

document.querySelector('#btnTimestamps').addEventListener('click', ()=> {
  handleTimestamps().then(printOutput, printOutput);
});
document.querySelector('#btnUUID').addEventListener('click', () => {
  handleUUID().then(printOutput, printOutput);
});
document.querySelector('#btnRandomWords').addEventListener('click', () => {
  handleRandomWords().then(printOutput, printOutput);
});
document.querySelector('#btnMarkdown').addEventListener('click', () => {
  handleMarkdown().then(printOutput, printOutput);
});
document.querySelector('#btnRandomProg').addEventListener('click', () => {
  handleRandomProg().then(printOutput, printOutput);
});
document.querySelector('#btnMarkdownPdf').addEventListener('click', setupMarkdownPdfConversion);
document.querySelector('#btnErrorTest').addEventListener('click', ()=> {
  triggerError().then(printOutput, printOutput);
});



///// Display timestamps as default
handleTimestamps().then(printOutput, printOutput);
