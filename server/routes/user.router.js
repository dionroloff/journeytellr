const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {  
  const email = req.body.email;
  const password = encryptLib.encryptPassword(req.body.password);
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  //must be updated with other user info, 
  //first name
  //last name
  //profile pic url optional 
  

  const queryText = 'INSERT INTO person (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id';
  pool.query(queryText, [email, password, first_name, last_name])
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/:id', (req, res) => {  //sets profile pic
  let user = req.params.id;
  let content = req.body.data.Location;  

  const queryText = `UPDATE "person" SET "profile_pic"= $1
                       WHERE "id" = $2;`;
  pool.query(queryText, [content, user])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
})

module.exports = router;
