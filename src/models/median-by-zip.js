/**
 * Report contains a calculated running median, total dollar amount
 * and total number of contributions by recipient and zip code.
 *
 * File Considerations:
 * Records are omitted if CMTE_ID or TRANSACTION_AMT is empty
 * Records are omitted if they have a value in `OTHER_ID` field
 * We only use the first 5 characters of ZIP_CODE
 * Records are ommitted if ZIP_CODE is in the incorrect format
 *
 * @author dannypaz
 */

const path = require('path');
const fs = require('fs');
const _isEmpty = require('lodash.isempty');

const OUTPUT_FILENAME = 'medianvals_by_zip.txt';
const OUTPUT_FILE = path.resolve('./output', OUTPUT_FILENAME);

const FIELDS = {
  CMTE_ID: 0,
  ZIPCODE: 1,
  TRANSACTION_DT: 2,
  TRANSACTION_AMT: 3,
  OTHER_ID: 4,
};

const SEPARATER = '|';

/**
 * Formats a given line into the output specified by the Political Donor specs from
 * Insight Data Engineering. This includes making length correction to various fields
 * including ZIPCODE.
 *
 * @param {String} line
 * @return {String} string result delimited by a specified separater
 */
function formatLine(line) {
  line[FIELDS.ZIPCODE] = line[FIELDS.ZIPCODE].substring(0, 5);
  return line.join(SEPARATER, -1) + '\n';
}

/**
 * Checks whether the passed in zipcode is a valid number and has a length greater
 * than 5.
 * @todo Use a location library to check if the zipcode is correct
 * @param {String} zip - a zipcode
 * @return {Bool} true/false
 */
function validZipCode(zip) {
  return (!isNaN(zip) && zip.length >= 5);
}

/**
 * Takes a string and appends that to a file defined by OUTPUT_FILE. For each line
 * this function will automatically append a '\n' new line character.
 *
 * @param {String} line - string of data delimited by pipe
 * @return {Void}
 * @return {Promise} returns true if successful, or returns an error
 */
function addLineToOutput(line) {
  return new Promise((resolve, reject) => {
    if (_isEmpty(line[FIELDS.CMTE_ID]) || _isEmpty(line[FIELDS.TRANSACTION_AMT])) {
      return resolve(true);
    }

    if (!_isEmpty(line[FIELDS.OTHER_ID])) {
      return resolve(true);
    }

    if (!validZipCode(line[FIELDS.ZIPCODE])) {
      return resolve(true);
    }

    const formattedLine = formatLine(line);

    fs.appendFile(OUTPUT_FILE, formattedLine, 'utf8', (err) => {
      if (err) return reject(err);
      return resolve(true);
    });
  });
}

module.exports = {
  path: OUTPUT_FILE,
  separater: SEPARATER,
  addLineToOutput,
};

