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
app.use(express.json()); // Middleware to parse JSON bodies


app.use((request, response, next) => {
  if (request.path === '/admin/signup' || request.path === '/admin/signin') {
    // Skip token verification for sign-in and sign-up requests
    next();
  } else {
    const token = request.query.token;
    if (!token) {
      // Token is not provided
      response.status(401).json({
        status: 'error',
        error: 'JWT must be provided'
      });
    } else {
      try {
        // Verify the token and extract data
        const data = jwt.verify(token, config.secret);
        request.admin_id = data.admin_id; // Assuming the token contains the admin_id
        next();
      } catch (ex) {
        console.error(ex);
        response.status(401).json({
          status: 'error',
          error: 'Unauthorized access'
        });
      }
    }
  }
});


app.use("/admin", routerAdmin)
app.use("/category", routercategory)
app.use("/product", routerProduct)
app.use("/pass",routerPass)


  app.listen(4001, "0.0.0.0", () => {
    console.log("Server started at port 4001")
  })




