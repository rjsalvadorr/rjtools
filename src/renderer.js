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

try {

  ///// Event handlers

  function handleTimestamps() {
    resetOutputPanel();
    var tGen = new TimestampGenerator();
    var outVal = tGen.getAllTimestamps();
    printOutput(outVal);
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
    printOutput(outVal);
  }

  function handleRandomWords() {
    resetOutputPanel();
    var wordGen = new RandomWordGenerator();
    // var utils = new Utils();
    var outVal = utils.convertListToString(wordGen.getDefaultRandomWords());
    printOutput(outVal);
  }

  function handleMarkdown() {
    resetOutputPanel();
    var mdGen = new MarkdownGenerator();
    var tGen = new TimestampGenerator();
    var date = tGen.getLongDate();
    var outVal = mdGen.generateMarkdownTemplate(date);
    printOutput(outVal);
  }

  function handleRandomProg() {
    resetOutputPanel();
    var pGen = new ProgressionGenerator();
    var outVal = pGen.getRandomPracticeProg();
    printOutput(outVal);
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
} catch(error) {
  console.error(error);
  printOutput(error);
}

///// Register event handlers

document.querySelector('#btnTimestamps').addEventListener('click', handleTimestamps);
document.querySelector('#btnUUID').addEventListener('click', handleUUID);
document.querySelector('#btnRandomWords').addEventListener('click', handleRandomWords);
document.querySelector('#btnMarkdown').addEventListener('click', handleMarkdown);
document.querySelector('#btnRandomProg').addEventListener('click', handleRandomProg);
document.querySelector('#btnMarkdownPdf').addEventListener('click', setupMarkdownPdfConversion);



///// Display timestamps as default
handleTimestamps();
