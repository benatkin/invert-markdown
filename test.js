var assert = require('assert');
var invertMarkdown = require('./');

describe('simple example', function() {
  it('should convert to javascript', function() {
    var input = "# Hello\n\n``` javascript\nconsole.log('Hello World')\n```\n\nThis is an example\n";
    var expected = "// # Hello\n\nconsole.log('Hello World')\n\n// This is an example\n";
    var output = invertMarkdown(input);
    assert.strictEqual(output, expected);
  });

  it('should convert to markdown', function() {
    var input = "// # Hello\n\nconsole.log('Hello World')\n\n// This is an example\n";
    var expected = "# Hello\n\n``` javascript\nconsole.log('Hello World')\n```\n\nThis is an example\n";
    var output = invertMarkdown(input);
    assert.strictEqual(output, expected);
  });
});
