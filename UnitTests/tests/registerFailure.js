/**
 * Registers old user to server.
 * 
 * @test Checks for return status of '0', since user should already be registered.
 */

//REQUIRED MODULES *(DO NOT MODIFY)*
var request = require('sync-request');
var Utilities = require('../testUtilities');
var equal = require('deep-equal');
var chalk = require('chalk');

function runTest() {

    //TEST NAME
    var testName = '=== Test Registration Failure ===';

    //SERVICE TO TEST
    var service = "register";

    //DATA TO SEND TO SERVER
    var data = {
        "f_name":   Utilities.FirstName,
        "l_name":   Utilities.LastName,
        "email":    Utilities.Email,
        "password": Utilities.Password
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
    var expected = {"status": 0};

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