/**
 * Test login response if user does not exist. Meant to be run before registration test
 * 
 * @test Checks for a status response of "bad-login", self explanatory here...
 */

//REQUIRED MODULES *(DO NOT MODIFY)*
var request = require('sync-request');
var Utilities = require('../testUtilities');
var equal = require('deep-equal');
var chalk = require('chalk');

function runTest() {

    //TEST NAME
    var testName = '=== Test Login Failure (No User) ===';

    //SERVICE TO TEST
    var service = "login";

    //DATA TO SEND TO SERVER
    var data = {
        "email": "smartcalteam@gmail.com",
        "password": "SmartCalIsCool!"
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
    var expected = {"status": "bad-login"};

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