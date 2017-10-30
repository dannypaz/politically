'use strict';

/**
 * File utilities for politcally
 *
 * @author dannypaz
 */

const readline = require('readline');
const fs = require('fs');

/**
 * Handler for all exceptions on #readFile
 *
 * @param {Exception} err
 */
function handleAllFileErrors(err) {
  console.error(err);
}

/**
 * Reads a specified file line by line and outputs each line to the callback specified
 * in the arguments.
 *
 * @param {String} filepath - absolute path to file to be read
 * @param {Function} callback - callback used to manipulate a given file's individual lines
 * @return {String} each line is returned to the callback
 */
function readFile(filepath, callback) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filepath),
    crlfDelay: Infinity,
  });

  return (
    rl.
      on('error', handleAllFileErrors).
      on('line', callback)
  );
}

module.exports = {
  readFile,
};
