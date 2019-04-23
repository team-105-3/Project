var connectUrl = 'http://127.0.0.1:8081';

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

//non secure hash, used to generate unique id for events and projects
function fastHash(str) {
    var hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

function hexToRgb(hex) {
    // turn hex val to RGB
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
          }
        : null
}

// calc to work out if it will match on black or white better
function setContrast (rgb) {
    return ((rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 > 125) ? 'black' : 'white';
}
