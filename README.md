# Politically

A possible political donor identifier for upcoming campaigns

### Summary

Application written in NodeJS because I primarily work in Ruby/JavaScript and haven't used Python in about a year.

`src` - contains all application code
`input` - input file location
`output` - output file location
`insight_testsuite` - all functional tests for application
`test` - unit tests for application

### Goals of Application

1. Parse files without blowing up your computer (memory)
2. Speed
3. Error handling for bad data
4. Create 'endpoints' for you to grab information

# Getting Started

`index.js` contains a way to run the file processor without creating an endpoint. Index.js
would essential be the network call to the API that we would create for this service.

I use file streaming for both reading and writing to files. Due to using file streaming from
writing files, on every run I will delete the output folder and recreate.

### Commands

- `npm test` to run the entire test suite (located in /test)
- `npm run file-ingestion` to run the entire program

### Output Files

1. medianvals_by_date
2. medianvals_by_zip
