'use strict';

/**
 * Reporting class that handles the orchestration of ingestion and output of various
 * reports from a defined input.
 *
 * @author dannypaz
 */

const fs = require('fs');
const path = require('path');

const medianByDate = require('./median-by-date');
const medianByZip = require('./median-by-zip');

/**
 * Fields of the Political Contributions file as detailed by FEC.
 *
 * @see http://classic.fec.gov/finance/disclosure/metadata/DataDictionaryContributionsbyIndividuals.shtml
 */
const FIELDS = {
  CMTE_ID: 1,
  ZIPCODE: 11,
  TRANSACTION_DT: 14,
  TRANSACTION_AMT: 15,
  OTHER_ID: 16,
};

const FORMATTERS = {
  medianByDate: (l) => medianByDate.addLineToOutput(l),
  medianByZip: (l) => medianByZip.addLineToOutput(l),
};

const SEPARATER = '|';
const FIELD_OFFSET = 1;

/**
 * Processes a line (string) whose origin is from a file ReadStream.
 *
 * @param {String} line - string that represents a line from a file
 * @return {Void}
 */
function processLine(line) {
  const data = line.split(SEPARATER);

  const result = Object.keys(FIELDS).reduce((acc, key) => {
    return acc.concat(data[FIELDS[key] - FIELD_OFFSET]);
  }, []);

  return Object.keys(FORMATTERS).forEach(f => FORMATTERS[f](result));
}

module.exports = {
  processLine,
  separater: SEPARATER,
  field_offset: FIELD_OFFSET,
  fields: FIELDS,
  formatters: FORMATTERS,
};
