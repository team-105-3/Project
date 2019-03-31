const tests = require('auto-load')('./tests');

function runTestSuite() {
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('./TestOrder.txt')
    });
      
    lineReader.on('line', function (line) {
        var runTest = require("./tests/" + line);
        runTest();

        //console.log(line);
    });
}

module.exports = runTestSuite;