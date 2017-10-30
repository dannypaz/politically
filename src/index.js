'use strict';

/**
 * itcont.txt. Each line of the input file contains information about a
 * campaign contribution that was made on a particular date from a donor to a
 * political campaign, committee or other similar entity. Out of the many
 * fields listed on the pipe-delimited line, you’re primarily interested in the
 * zip code associated with the donor, amount contributed, date of the transaction
 * and ID of the recipient.
 * @author dannypaz
 */

const path = require('path');

const fileHelpers = require('./helpers/file-helpers');
const report = require('./models/report');

const INPUT_FILENAME = 'itcont.txt';
const INPUT_FILE = path.resolve('./input', INPUT_FILENAME);

/**
 * Outputs information when file is closed or complete
 *
 * @return {Void}
 */
function closeFile() {
  return console.log(`File processing for ${INPUT_FILE} completed at ${new Date().toISOString()}`);
}

/**
 * File ingestion handler. Uses #fileHelpers and #report to parse files from `input`
 *
 * @return {void}
 */
function main() {
  console.log(`Starting file processing for ${INPUT_FILE} on ${new Date().toISOString()}`);
  return fileHelpers.readFile(INPUT_FILE, report.processLine).on('close', closeFile);
}

main();


