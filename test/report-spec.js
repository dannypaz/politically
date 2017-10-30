/**
 * @author dannypaz
 */

const test = require('tape');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const dateMock = sinon.spy();
const zipMock = sinon.spy();

// Using a very crude method of stubbing libraries here, but it is effective in testing
// the logic of index
const report = proxyquire('../src/models/report', {
  './median-by-date': {
    addLineToOutput: dateMock,
  },
  './median-by-zip': {
    addLineToOutput: zipMock,
  }
});

test('field offset is set to 1', (t) => {
  t.equal(report.field_offset, 1);
  t.end();
});

test('separater is a pipe, per spec for file', (t) => {
  t.equal(report.separater, '|');
  t.end();
});

test('report grabs the correct amount of fields', (t) => {
  t.equal(report.fields.length, 5);
  t.end();
});
