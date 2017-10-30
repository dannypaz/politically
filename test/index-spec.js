/**
 * @author dannypaz
 */

const test = require('tape');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const readFile = sinon.spy();
const processLine = sinon.spy();

// Using a very crude method of stubbing libraries here, but it is effective in testing
// the logic of index
const index = proxyquire('../src/index', {
  './helpers/file-helpers': {
    readFile: readFile,
  },
  './models/report': {
    processLine: processLine,
  }
});

test('index returns the correct filename', (t) => {
  t.equal(index.filename, 'itcont.txt');
  t.end();
});

test('index returns the correct input folder', (t) => {
  t.equal(index.file.includes('/input'), true);
  t.end();
});

test('main function reads a file', (t) => {
  index.main();
  t.equal(readFile.calledOnce, true);
  t.equal(readFile.calledWith(index.file, sinon.match.any), true);
  t.end();
});
