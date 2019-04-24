/**
 * Tests login response if user exists and correct password
 * 
 * @test Checks for return status of users unique key, if unique key is returned, then successful login
 */

//REQUIRED MODULES *(DO NOT MODIFY)*
var request = require('sync-request');
var Utilities = require('../testUtilities');
var equal = require('deep-equal');
var chalk = require('chalk');

function runTest() {

    //TEST NAME
    var testName = '=== Test Login Success ===';

    //SERVICE TO TEST
    var service = "login";

    //DATA TO SEND TO SERVER
    var data = {
        "email": "smartcalteam@gmail.com",
        "password": "SmartCalIsCool!"
    }


    //SERVER SEND *(DO NOT MODIFY)*
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
    var expected = {"status": "2e65b33504f2c9b3c76dfa5d17828e5a0b89bd5a8e1273081bb16124cf31b0df"};

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