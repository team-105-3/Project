const express = require('express');
const app = express();
const cron = require('node-cron');
const runTestSuite = require('./testsuite');

cron.schedule(' 0 7 * * *', function() {
  /*
  TODO: Add test scheduling for CI so tests are automated
  */
});

app.listen(8000, () => {
  console.log('Unit Tests running on port 8000...')
  runTestSuite();
});