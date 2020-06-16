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
var JsSnippets = require('./js-snippets');



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

function getDictEntryFilePathFromExplorer() {
  const { dialog } = require('electron').remote;

  var inputDirectories = dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Dictionary entries (txt)', extensions: ['txt'] }
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
  return new Promise((resolve, reject) => {
    try {
      printOutput('Beginning markdown conversion to PDF...');
      
      var markdownpdf = require("markdown-pdf");
      var path = path || require("path");

      var inFilePath = document.querySelector('.input--item-picker').value;

      if (!inFilePath) {
        throw 'ERROR: No file specified!';
        return;
      }

      var parsedPath = path.parse(inFilePath);
      _.merge(parsedPath, { ext: '.pdf', base: '' });
      var outFilePath = path.format(parsedPath);
      var cssPath = path.join(constants.ROOT_DIR, 'src/css');

      markdownpdf({
        cssPath: cssPath,
        paperFormat: 'Letter',
        paperBorder: '0.5in',
      }).from(inFilePath).to(outFilePath, function () {
        resolve('Markdown file converted to ' + outFilePath);
      });

      document.querySelector('.input--item-picker').value = '';
    } catch(error) {
      reject(error);
    }
  });
}

function setupMarkdownPdfConversion() {
  var ejsLoader = require('./ejs-loader');
  var itemPickerOutputPanel = ejsLoader.getItemPickerOutput('markdown-filename', 'Choose markdown file', 'Convert to PDF');
  switchOutputPanel(itemPickerOutputPanel);

  document.querySelector('.input-button--item-picker').addEventListener('click', function () {
    var mdPath = getMarkdownFilePathFromExplorer();
    document.querySelector('.input--item-picker').value = mdPath;
  });

  document.querySelector('.input-button--submit').addEventListener('click', () => {
    handleMarkdownPdfConversion().then(printOutput, printOutput);
  });
}

function handleMarkdownEpubConversion() {
  return new Promise((resolve, reject) => {
    try {
      printOutput('Beginning markdown conversion to EPUB...');
      
      var path = path || require("path");

      var inFilePath = document.querySelector('.input--item-picker').value;

      if (!inFilePath) {
        throw 'ERROR: No file specified!';
        return;
      }

      var parsedPath = path.parse(inFilePath);
      _.merge(parsedPath, { ext: '.epub', base: '' });
      var outFilePath = path.format(parsedPath);

      var metadata = {
        title: utils.getMarkdownTitle(inFilePath),
        author: 'RJ Salvador',
      }
      var metadataFlags = ['-M', `title=\"${metadata.title}\"`, '-M', `author=\"${metadata.author}\"`];
      var pandocFlags = ['-o', outFilePath, inFilePath, '--toc', '--toc-depth=2'];
      var allPandocFlags = _.concat(pandocFlags, metadataFlags);

      const { spawn } = require('child_process');
      const pandoc = spawn('pandoc', allPandocFlags);

      pandoc.stdout.on('data', data => {
        resolve(`data: ${data}`);
      });

      pandoc.stderr.on('data', data => {
        reject(`stderr: ${data}`);
      });

      pandoc.on('error', err => {
        const errorMessage = err + '\nYou may have to install Pandoc, if it\'s not in your system.';
        reject(errorMessage);
      });

      pandoc.on('close', code => {
        if(code != 0) {
          reject(`child process exited with code ${code}`);
        } else {
          resolve(`Markdown file converted to \"${outFilePath}\"`);
        }
      });

      document.querySelector('.input--item-picker').value = '';
    } catch(error) {
      reject(error);
    }
  });
}

function setupMarkdownEpubConversion() {
  var ejsLoader = require('./ejs-loader');
  var itemPickerOutputPanel = ejsLoader.getItemPickerOutput('markdown-filename', 'Choose markdown file', 'Convert to EPUB');
  switchOutputPanel(itemPickerOutputPanel);

  document.querySelector('.input-button--item-picker').addEventListener('click', function () {
    var mdPath = getMarkdownFilePathFromExplorer();
    document.querySelector('.input--item-picker').value = mdPath;
  });

  document.querySelector('.input-button--submit').addEventListener('click', () => {
    handleMarkdownEpubConversion().then(printOutput, printOutput);
  });
}

function handleDictionarySort() {
  return new Promise((resolve, reject) => {
    try {
      printOutput('Converting dictionary entries...');
      var fs = fs || require("fs");
      var path = path || require("path");
      const dictSorter = require('./dictionary-sorter');

      var inFilePath = document.querySelector('.input--item-picker').value;

      if (!inFilePath) {
        throw 'ERROR: No file specified!';
        return;
      }

      // Convert stuff...
      const outVal = dictSorter.getSortedDictAsMarkdown(inFilePath);
      resolve(outVal);
    } catch(error) {
      reject(error);
    }
  });
}

function handleJsSnippets() {
  return new Promise((resolve, reject) => {
    try {
      const outVal = JsSnippets.getJsSnippets();
      resolve(outVal);
    } catch(error) {
      reject(error);
    }
  });
}

function setupDictionarySort() {
  var ejsLoader = require('./ejs-loader');
  var itemPickerOutputPanel = ejsLoader.getItemPickerOutput('dict-entries-filename', 'Choose dictionary entry file', 'Sort dictionary entries');
  switchOutputPanel(itemPickerOutputPanel);

  document.querySelector('.input-button--item-picker').addEventListener('click', function () {
    var mdPath = getDictEntryFilePathFromExplorer();
    document.querySelector('.input--item-picker').value = mdPath;
  });

  document.querySelector('.input-button--submit').addEventListener('click', () => {
    handleDictionarySort().then(printOutput, printOutput);
  });
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

document.querySelector('#btnJsSnippets').addEventListener('click', () => {
  handleJsSnippets().then(printOutput, printOutput);
});
document.querySelector('#btnTimestamps').addEventListener('click', ()=> {
  handleTimestamps().then(printOutput, printOutput);
});
document.querySelector('#btnUUID').addEventListener('click', () => {
  handleUUID().then(printOutput, printOutput);
});
document.querySelector('#btnRandomWords').addEventListener('click', () => {
  handleRandomWords().then(printOutput, printOutput);
});
document.querySelector('#btnMarkdownPdf').addEventListener('click', setupMarkdownPdfConversion);
document.querySelector('#btnMarkdownEpub').addEventListener('click', setupMarkdownEpubConversion);
document.querySelector('#btnErrorTest').addEventListener('click', ()=> {
  triggerError().then(printOutput, printOutput);
});

// TODO - remove these functions
// document.querySelector('#btnMarkdown').addEventListener('click', () => {
//   handleMarkdown().then(printOutput, printOutput);
// });
// document.querySelector('#btnRandomProg').addEventListener('click', () => {
//   handleRandomProg().then(printOutput, printOutput);
// });
// document.querySelector('#btnDictionarySorter').addEventListener('click', setupDictionarySort);



///// Display timestamps as default
handleTimestamps().then(printOutput, printOutput);
