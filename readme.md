To run backend:
1. Install [`node.js` and `npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [`mongodb`](https://docs.mongodb.com/manual/installation/)
2. After you have `node.js` and `npm` installed, cd into the backend folder
4. Run `npm update` to install all dependencies for the project
4. Start local `mongodb` server 
   1. Open a new terminal window
   2. Set up mongo environment <br>
      Run `mkdir /data/db`<br>
      Edit permissions for mongo environment by running ``sudo chown -R `id -un` ./data/db``
      1. If that doesn't work (illegal username error) type `whoami` to get your username
      2. run ``sudo chown -R <username> ./data/db``
   3. Enter your password
   4. Start local mongo server<br>
      Run `mongod --port 27017`
5. Back in your first terminal window, run `npm start`
6. Navigate to the `index.html` file in the frontend directory and open in your browser
