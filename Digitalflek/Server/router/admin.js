const express = require("express")
const db = require("../db")
const crypto = require('crypto-js')
const utils = require("../utils")
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('../config')
const app = express();



router.post("/signup", (request, response) => {
  const { email_id, password } = request.body
  //  encrypt password
  const encryptedPassword = '' + crypto.SHA256(password)

  db.query(
    "INSERT INTO admin(email_id,password) VALUES(?,?)",
    [email_id, encryptedPassword],
    (error, result) => {
      response.send(utils.createResult(error, result))

    }
  )
})





router.post("/signin", (request, response) => {
  const { email_id, password } = request.body;
  // Encrypt password using SHA256
  const encryptedPassword = '' + crypto.SHA256(password)
  const statement = `SELECT admin_id, email_id FROM admin WHERE email_id=? and password=?`;
  db.query(statement, [email_id, encryptedPassword], (error, admins) => {
    const result = {
      status: ''
    }
    if (error != null) {
      result['status'] = 'error'
      result['error'] = error
    }
    else {
      if (admins.length == 0) {
        // admin does not exist
        result['status'] = 'error'
        result['error'] = 'Admin does not exist'
      }
      else {
        const admin = admins[0]
        const token = jwt.sign({ admin_id: admin['admin_id'] }, config.secret)
        console.log(token);
        result['status'] = 'success'
        result['data'] = {
          token: token,
          email_id: admin['email_id']
        }
      }
    }
    response.send(utils.createResult(error, result));
    console.log(error);
  });
});






router.get('/profile', (request, response) => {
const statement = `SELECT email_id from admin WHERE admin_id=?`
   console.log(request.token)
  db.query(statement, [request.admin_id], (error, result) => {
    response.send(utils.createResult(error, result))
    console.log(error)
  })
})




module.exports = router





