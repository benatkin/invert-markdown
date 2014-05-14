# invert-markdown

inverts markdown code, converting fenced code into the body and markdown into comments

To install, run `npm install invert-markdown`.

This contains a script. For usage run `./node_modules/.bin/invert-markdown --help`.
You can try it on this file with `./node_modules/.bin/invert-markdown README.md`.
The output will be written to stdout.

``` javascript
var invertMarkdown = require('./');
var assert = require('assert');

function testConvertToJavascript() {
  var input = "# Hello\n\n``` javascript\nconsole.log('Hello World')\n```\n\nThis is an example\n";
  var expected = "// # Hello\n\nconsole.log('Hello World')\n\n// This is an example\n";
  var output = invertMarkdown(input);
  assert.strictEqual(output, expected);
}

function testConvertToMarkdown() {
  var input = "// # Hello\n\nconsole.log('Hello World')\n\n// This is an example\n";
  var expected = "# Hello\n\n``` javascript\nconsole.log('Hello World')\n```\n\nThis is an example\n";
  var output = invertMarkdown(input);
  assert.strictEqual(output, expected);
}

testConvertToJavaScript();
testConvertToMarkdown();

console.log('it worked!');
```

# LICENSE

[MIT](http://bat.mit-license.org/)
