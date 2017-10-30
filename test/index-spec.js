// Getting started with tests
const test = require('tape');
const index = require('../src/index.js');

test('index returns the correct filename', (t) => {
  t.equal(index.filename, 'input.txt');
  t.end();
});

test('index returns the correct input folder', (t) => {
  t.equal(index.folder.includes('/input'), true);
  t.end();
});

