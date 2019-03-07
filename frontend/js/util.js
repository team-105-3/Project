/**
 * Validates a users name to make sure it is not an empty string.
 * Returns true if both first and last names are valid strings, false if one or both names are invalid.
 * @param {Users first name} firstName 
 * @param {Users last name} lastName 
 */
function validateName(firstName, lastName) {
    return !emptyString(firstName) && !emptyString(lastName);
}

/**
 * Tests string to make see if it empty.
 * Returns true if empty string, false otherwise.
 * @param {Test string} str 
 */
function emptyString(str) {
    return str === undefined || str === "" || str === null;
}

/**
 * Uses regex black magic to validate an email string.
 * Returns true if email it valid, false if invalid email.
 * @param {Email address to validate} email 
 */
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Checks if users password is valid.
 * @param {User password} password 
 */
function validatePassword(password) {
    return !emptyString(password);
}