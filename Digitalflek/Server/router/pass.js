
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// MySQL database configuration
const dbConfig = {
    user: "root",
    password: "manager",
    host: "localhost",
    port: 3306,
    database: "DigitalFlex",
};

// Create a MySQL pool
const pool = mysql.createPool(dbConfig);

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'akashb2211@gmail.com', // Your Gmail email address
    pass: 'seydrneegbczkfyn' // Your Gmail password or app-specific password if 2-factor authentication is enabled
  }
});

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specified methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specified headers
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Respond to preflight requests
  }
  next(); // Pass control to the next middleware
});

// POST endpoint to handle forgot password requests
app.post('/forgotpassword', (req, res) => {
  try {
    const { email } = req.body;

    // Generate a unique token
    const token = crypto.randomBytes(20).toString('hex');
    const expires = Date.now() + 3600000; // 1 hour expiration

    // Store the token and expiration time in the database
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
        return res.status(500).json({ error: 'Failed to connect to database.' });
      }

      const query = 'INSERT INTO password_reset_tokens (email, token, expires) VALUES (?, ?, ?)';
      connection.query(query, [email, token, expires], (error, results) => {
        connection.release(); // Release the connection back to the pool
        if (error) {
          console.error('Error executing MySQL query:', error);
          return res.status(500).json({ error: 'Failed to store reset token in database.' });
        }

        // Define the email options
        const resetLink = `http://akash1.com/resetpassword?token=${token}`;
        const mailOptions = {
          from: 'akashb2211@gmail.com', // Sender address (should be same as auth.user)
          to: email, // Recipient's email address
          subject: 'Password Reset', // Subject line
          text: `Click the following link to reset your password: ${resetLink}` // Body of the email with reset link
        };

        // Send email
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send password reset email.' });
          } else {
            console.log('Password reset email sent:', info.response);
            res.status(200).json({ message: 'Password reset email sent successfully.' });
          }
        });
      });
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

// POST endpoint to handle password reset
app.post('/resetpassword', (req, res) => {
  const { token, newPassword } = req.body;

  // Verify the token and its expiration time
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return res.status(500).json({ error: 'Failed to connect to database.' });
    }

    const now = Date.now();
    const query = 'SELECT email FROM password_reset_tokens WHERE token = ? AND expires > ?';
    connection.query(query, [token, now], (error, results) => {
      connection.release(); // Release the connection back to the pool
      if (error) {
        console.error('Error executing MySQL query:', error);
        return res.status(500).json({ error: 'Failed to verify reset token.' });
      }

      if (results.length === 0) {
        return res.status(400).json({ error: 'Invalid or expired reset token.' });
      }

      const email = results[0].email;

      // Update the user's password in the database
      const updateQuery = 'UPDATE users SET password = ? WHERE email = ?';
      connection.query(updateQuery, [newPassword, email], (updateError, updateResults) => {
        if (updateError) {
          console.error('Error executing MySQL query:', updateError);
          return res.status(500).json({ error: 'Failed to update password in database.' });
        }

        // Delete the used token from the database
        const deleteQuery = 'DELETE FROM password_reset_tokens WHERE token = ?';
        connection.query(deleteQuery, [token], (deleteError, deleteResults) => {
          if (deleteError) {
            console.error('Error executing MySQL query:', deleteError);
            return res.status(500).json({ error: 'Failed to delete reset token from database.' });
          }

          res.status(200).json({ message: 'Password reset successfully.' });
        });
      });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
















































// const express = require('express');
// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');

// const app = express();
// // const PORT = process.env.PORT || 5000;

// app.use(bodyParser.json());

// // Enable CORS
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specified methods
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specified headers
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200); // Respond to preflight requests
//   }
//   next(); // Pass control to the next middleware
// });

// // Create a transporter object using the default SMTP transport
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'akashb2211@gmail.com', // Your Gmail email address
//     pass: 'seydrneegbczkfyn' // Your Gmail password or app-specific password if 2-factor authentication is enabled
//   }
// });

// // POST endpoint to handle forgot password requests
// app.post('/forgotpassword', (req, res) => {
//   try {
//     const { email } = req.body;
    
//     // Define the email options
//     const mailOptions = {
//       from: 'akashb2211@gmail.com', // Sender address (should be same as auth.user)
//       to: email, // Recipient's email address
//       subject: 'Password Reset', // Subject line
//       text: 'Your password reset link goes here...' // Body of the email
//     };
  
//     // Send email
//     transporter.sendMail(mailOptions, function(error, info) {
//       if (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ error: 'Failed to send password reset email.' });
//       } else {
//         console.log('Password reset email sent:', info.response);
//         res.status(200).json({ message: 'Password reset email sent successfully.' });
//       }
//     });
//   } catch (error) {
//     console.error('Error processing request:', error);
//     res.status(500).json({ error: 'An error occurred while processing your request.' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const express = require('express');
// const router = express.Router()
// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
// const mysql = require('mysql');
// const crypto = require('crypto-js')
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(bodyParser.json());

// // MySQL database configuration
// const dbConfig = {
//     user: "root",
//     password: "manager",
//     host: "localhost",
//     port: 3306,
//     database: "DigitalFlex",
// };

// // Create a MySQL pool
// const pool = mysql.createPool(dbConfig);

// // Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'akashb2211@gmail.com', // Your Gmail email address
//     pass: 'seydrneegbczkfyn' // Your Gmail password or app-specific password if 2-factor authentication is enabled
//   }
// });

// // Enable CORS
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specified methods
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specified headers
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200); // Respond to preflight requests
//   }
//   next(); // Pass control to the next middleware
// });

// // POST endpoint to handle forgot password requests
// app.post('/forgotpassword', (req, res) => {
//   try {
//     const { email } = req.body;

//     // Retrieve the user's password from the database
//     pool.getConnection((err, connection) => {
//       if (err) {
//         console.error('Error connecting to MySQL:', err);
//         return res.status(500).json({ error: 'Failed to connect to database.' });
//       }

//       const query = 'SELECT password FROM admin WHERE email_id = ?';
//       connection.query(query, [email], (error, results) => {
//         connection.release(); // Release the connection back to the pool
//         if (error) {
//           console.error('Error executing MySQL query:', error);
//           return res.status(500).json({ error: 'Failed to retrieve password from database.' });
//         }

//         if (results.length === 0) {
//           return res.status(404).json({ error: 'User not found.' });
//         }

//         const password = results[0].password;
//         const encryptedPassword = '' + crypto.SHA256(password)
//         // Define the email options
//         const mailOptions = {
//           from: 'akashb2211@gmail.com', // Sender address (should be same as auth.user)
//           to: email, // Recipient's email address
//           subject: 'Your Password', // Subject line
//           text: `Your password is: ${encryptedPassword}` // Body of the email with password
//         };

//         // Send email
//         transporter.sendMail(mailOptions, function(error, info) {
//           if (error) {
//             console.error('Error sending email:', error);
//             res.status(500).json({ error: 'Failed to send password email.' });
//           } else {
//             console.log('Password email sent:', info.response);
//             res.status(200).json({ message: 'Password email sent successfully.' });
//           }
//         });
//       });
//     });
//   } catch (error) {
//     console.error('Error processing request:', error);
//     res.status(500).json({ error: 'An error occurred while processing your request.' });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

 
// module.exports = router
