var Base64 = require('js-base64').Base64;
var fs = require('fs');
const {google} = require('googleapis');

module.exports = {
    sendMessage: function(auth, message) {
        var gmail = google.gmail({version: "v1", auth});
        var request = gmail.users.messages.send({
            auth: auth,
            userId: 'me',
            resource: {
                raw: message
            }
        });
        return true;
    },
    
    createEmail: function(from, to, subject, message) {
        var str = [
                "Content-Type: text/plain; charset=\"UTF-8\"\n",
                "MIME-Version: 1.0\n",
                "Content-Transfer-Encoding: 7bit\n",
                "to: ", to, "\n",
                "from: ", from, "\n",
                "subject: ", subject, "\n\n",
                message
            ].join('');
        
        return Base64.encodeURI(str);
    },

    authorizeAPI: function(credentials, callback, message) {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        // Check if we have previously stored a token.
        var f = fs.readFile("token.json", (err, token) => {
            if (err) {
                console.log('Unable to find token.json.');
                return false;
            };
            oAuth2Client.setCredentials(JSON.parse(token));
            return callback(oAuth2Client, message);
        });

        return f;
    }
}