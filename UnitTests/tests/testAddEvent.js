/**
 * Tests the ability to add events to the server
 * 
 * @test tests if return status is 1 (successfully added event)
 */

//REQUIRED MODULES *(DO NOT MODIFY)*
var request = require('sync-request');
var Utilities = require('../testUtilities');
var equal = require('deep-equal');
var chalk = require('chalk');

function runTest() {

    //TEST NAME
    var testName = '=== Test Add Event ===';

    //SERVICE TO TEST
    var service = "createEvent";

    //DATA TO SEND TO SERVER
    var data = {
        key: "2e65b33504f2c9b3c76dfa5d17828e5a0b89bd5a8e1273081bb16124cf31b0df",
        event: {
            title: "Test Event",
            startTime: "3:00 PM",
            endTime: "4:00 PM",
            recurring: false,
            startDate: "4/10/19",
            endDate: "undefined",
            description: "This is a test event.",
            recurrency: 0,
            timeframe: 0
        }
    }


    //SERVER SEND (DO NOT MODIFY)
    var clientServerOptions = {
        uri: Utilities.URL + "/" + service + "/",
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    var res = request(clientServerOptions.method, clientServerOptions.uri, {
        headers: clientServerOptions.headers,
        body: clientServerOptions.body
    });

    //EXPECTED RESPONSE FROM SERVER
    var expected = {"status": 1};

    //ACTUAL RESPONSE FROM SERVER (DO NOT MODIFY)
    var actual = JSON.parse(res.body);

    //LOGGING (DO NOT MODIFY)
    if(res !== undefined && equal(expected, actual)) {
        console.log(chalk.white(testName), "   ", chalk.green("Test Passed..."));
    } else {
        console.log(chalk.white(testName), "   ", chalk.red("Test Failed..."));
    }
}

module.exports = runTest;