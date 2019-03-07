function login(data) {
    var email = data.email;
    var password = data.password;
    /**
     * TODO: pass login data to mongodb
     *  check if person is registered with smartcal
     *      -if they are registered, bring them to their calendar page (some sort of key?)
     *      -if not found in db, tell them they have a bad login
     */

     return "bad-login";
}

module.exports = login;