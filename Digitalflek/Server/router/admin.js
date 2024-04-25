const express = require("express")
const db = require("../db")
const crypto = require('crypto-js')
const utils = require("../utils")
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('../config')




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






// #### Working Api ####
router.get('/profile', (request, response) => {
  // Get the token sent by client
  const token = request.query.token;
  console.log(token)

  if (!token) {
    return response.status(401).json({
      status: 'error',
      error: 'Token is missing'
    });
  }

  try {
    // Verify the token
    const data = jwt.verify(token, config.secret);
    const admin_id = data.admin_id;

    // Fetch admin profile using the admin_id
    const statement = `SELECT email_id FROM admin WHERE admin_id=?`;
    db.query(statement, [admin_id], (error, result) => {
      if (error) {
        response.status(500).json({
          status: 'error',
          error: 'Internal server error'
        });
        console.error(error);
      } else {
        response.status(200).json({
          status: 'success',
          data: result
        });
      }
    });
  } catch (ex) {
    console.error(ex);
    response.status(401).json({
      status: 'error',
      error: 'Unauthorized access'
    });
  }
});








module.exports = router


// router.get('/profile', (request, response) => {
//   //  get the token sent by client
//    const token = request.query.token;

//   const data=jwt.verify(token,config.secret)
//   const admin_id =data['admin_id']
//   // const admin_id = request.params.admin_id
//   const statement = `SELECT email_id from admin WHERE admin_id=?`
//   db.query(statement, [admin_id], (error, result) => {
//     response.send(utils.createResult(error, result))
//     console.log(error)
//   })
// })


// //        ##working api##
// router.get('/profile', (request, response) => {

//   //  const token = request.headers['token']
//    const token=request.query.token;
//   console.log(token)
//   const payload = jwt.verify(token,config.secret);
//   const admin_id=payload['admin_id']
//   const statement = `SELECT email_id from admin WHERE admin_id=?`
//   // console.log(admin_id)
//   db.query(statement, [admin_id], (error, result) => {
//     response.send(utils.createResult(error, result))
//     // console.log(error)
//   })
// })


// router.get('/profile', (request, response) => {
//   console.log('Admin ID:', request.admin_id); // Log the admin ID
//   const statement = `SELECT email_id FROM admin WHERE admin_id=?`;
//   db.query(statement, [ request.admin_id], (error, result) => {
//     if (error) {
//       // If there's an error, send back an error response
//       response.status(500).json({ status: 'error', error: 'Internal Server Error' });
//       console.error(error);
//     } else {
//       // If the query was successful, send back the result
//       response.status(200).json({ status: 'success', data: result });
//     }
//   });
// });




// router.get('/profile', (request, response) => {
// const statement = `SELECT email_id from admin WHERE admin_id=?`
//    console.log(request.token)
//   db.query(statement, [request.admin_id], (error, result) => {
//     response.send(utils.createResult(error, result))
//     console.log(error)
//   })
// })



// router.get('/profile', (request, response) => {
//   const statement = `SELECT email_id FROM admin WHERE admin_id=?`;
//   // console.log(request.admin_id); // Corrected to request.admin_id
//   db.query(statement, [request.id], (error, result) => {
//     response.send(utils.createResult(error, result));
//     console.log(error);
//   });
// });