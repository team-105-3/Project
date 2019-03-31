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


To Use the test suite:
1. Navigate to `UnitTests` folder in terminal
2. Run `npm update` to install necessary packages
3. Open up two terminal windows
4. In the first window, start the backend server like normal
5. In the second window, cd back into the `UnitTests` folder, then run `node index.js` to run tests
6. The tests will run against the backend API, if a test fails that means one of our API's is messed up


To Create Tests for the Backend:
1. Create a new file inside the `tests` folder inside `UnitTests`
2. Copy the template inside the `blanktest.txt` into your new file
3. Modify the specified values in your file to create your test case
4. Inside the `TestOrder.txt` file insert the name of your newly created test file, keep in mind order matters. Tests will be executed from top to bottom, so make sure you have them in the correct order of execution. (EX: a 'login-success' test will fail if a user hasn't registered yet, so make sure you have some sort of `register-user` test before it for it to execute correctly)
