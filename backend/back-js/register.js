function register(data) {
    var firstName = data.f_name;
    var lastName = data.l_name;
    var email = data.email;
    var password = data.password;

    /**
     * TODO: pass login info to mongo
     * 
     *  check if user is already registered (email already exists)
     *      -if already in, fail to register
     *      -if not in, add them and redirect to login page
     */

     return true;
}

module.exports = register;