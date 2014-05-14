var EOL = require('os').EOL;
var fenceStartRegex = /^```\s*javascript\s*$/;
var fenceStart = "``` javascript";
var fenceEndRegex = /^```\s*$/;
var fenceEnd = "```";
var commentRegex = /^\/\/\ /;
var comment = "// ";

var inFenceMessage = "Already in a code block yet received beginning fence.";
var notInFenceMessage = "" +
  "Not in code block yet received fence without code type.\n" +
  "Code type limited to JavaScript and must be specificed.";
var finishedInFenceMessage = "Expected end of code block (```)";

function convertToMarkdown(input) {
  var inputLines = input.split(/\r\n|\r|\n/);
  var codeLines = [];
  var outputLines = [];

  function addCodeLines() {
    var i, line, lastNonEmpty;
    for (i=0; i < codeLines.length; i++) {
      var line = codeLines[i];
      var empty = line.trim() === '';
      if (! empty) lastNonEmpty = i;
    }

    outputLines.push(fenceStart);
    for (i=0; i < codeLines.length; i++) {
      var line = codeLines[i];
      outputLines.push(line);
      if (i === lastNonEmpty) {
        outputLines.push(fenceEnd);
      }
    }
    codeLines = [];
  }

  for (var i=0; i < inputLines.length; i++) {
    var line = inputLines[i];
    var empty = line.trim() === '';

    if (commentRegex.test(line)) {
      if (codeLines.length > 0) addCodeLines();
      outputLines.push(line.substring(3));
    } else if (codeLines.length === 0 && empty) {
      outputLines.push('');
    } else {
      codeLines.push(line);
    }
  }
  if (codeLines.length > 0) addCodeLines();

  return outputLines.join(EOL);
}

function convertToJavaScript(input) {
  var inputLines = input.split(/\r\n|\r|\n/);
  var outputLines = [];

  var inFence = false;
  for (var i=0; i < inputLines.length; i++) {
    var line = inputLines[i];
    if (fenceStartRegex.test(line)) {
      if (inFence) throw new Error(inFenceMessage);
      inFence = true;
    } else if (fenceEndRegex.test(line)) {
      if (! inFence) throw new Error(notInFenceMessage);
      inFence = false;
    } else {
      if (inFence) {
        outputLines.push(line);
      } else if (line.trim() === '') {
        outputLines.push('');
      } else {
        outputLines.push(comment + line);
      }
    }
  }

  return outputLines.join(EOL);
}

function invertMarkdown(input) {
  var inputLines = input.split(/\r\n|\r|\n/);

  for (var i=0; i < inputLines.length; i++) {
    var line = inputLines[i];
    if (commentRegex.test(line)) {
      return convertToMarkdown(input);
    } else if (fenceStartRegex.test(line)) {
      return convertToJavaScript(input);
    }
  }

  return outputLines.join(EOL);
}

module.exports = invertMarkdown;
