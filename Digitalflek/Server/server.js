const express = require("express")
const cors = require("cors")
const routerAdmin = require("./router/admin")
const routercategory = require("./router/category")
const routerProduct = require("./router/product")
const routerPass=require("./router/pass")
const jwt = require('jsonwebtoken')
const config = require('./config')

const app = express()
app.use(express.json())
app.use(cors("*"))
app.use(express.static("uploads"))
// app.use(bodyParser.json())
app.use("/admin", routerAdmin)
app.use("/category", routercategory)
app.use("/product", routerProduct)
app.use("/pass",routerPass)







  app.listen(4001, "0.0.0.0", () => {
    console.log("Server started at port 4001")
  })



// app.use((request, response, next) => {
//   // Get the token sent by client
//   const token = request.query.token;

//   try {
//     // Verify the token
//     const data = jwt.verify(token, config.secret);
//     console.log(data)
//     request.id = data['admin_id']
//     next();
//   } catch (ex) {
//     console.error(ex);
//     response.status(401).json({
//       status: 'error',
//       error: 'Unauthorized access'
//     });
//   }
// });

// app.use((request, response, next) => {
//   // Get the token sent by client
//   const token = request.query.token;
//   console.log('Token:', token); // Log the token

//   try {
//     // Verify the token
//     const data = jwt.verify(token, config.secret);
//     console.log('Decoded Data:', data); // Log the decoded data
//     request.admin_id = data['admin_id'];
//     next();
//   } catch (ex) {
//     console.error(ex);
//     response.status(401).json({
//       status: 'error',
//       error: 'Unauthorized access'
//     });
//   }
// });

