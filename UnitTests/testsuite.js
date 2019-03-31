/**
 * Runs all tests in the ./tests folder in the order they are listed in TestOrder.txt
 */
function runTestSuite() {
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('./TestOrder.txt')
    });
      
    lineReader.on('line', function (line) {
        var runTest = require("./tests/" + line);
        runTest();
    });
}

module.exports = runTestSuite;