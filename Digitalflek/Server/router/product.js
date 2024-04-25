const express = require("express")
const db = require("../db")
const router = express.Router()
const utils = require("../utils")




router.get("/:product_name", (request, response) => {
    const product_name = request.params.product_name
    const statement = `SELECT * FROM product WHERE product_name=?`
    db.query(statement, [product_name], (error, result) => {
      response.send(utils.createResult(error, result))
      console.log(error)
    })
  })

  router.get("/", (request, response) => {
    const statement = `SELECT 
    product.product_id,
    product.name As product_name,
    product.pack_size,
    category.name,
    product.mrp,
    product.image,
    product.status
FROM 
    product
JOIN 
    category ON product.category_id = category.category_id;
`
    db.query(statement, (error, result) => {
      response.send(utils.createResult(error, result))
    })
  })

  router.post("/addproduct", (request, response) => {
    const { name, pack_size, category_id, mrp, image, status } = request.body;
    console.log(request.body);
    db.query(
      'INSERT INTO product (name, pack_size, category_id, mrp, image, status) VALUES (?, ?, ?, ?, ?, ?)',
      [name, pack_size, category_id, mrp, image, status],
      (error, result) => {
        response.send(utils.createResult(error, result));
      }
    );
  });
  



router.put("/updateproduct/:product_id", (request, response) => {
  const product_id = request.params.product_id;
  const { name, pack_size, mrp, status, image } = request.body;
  const statement =
      "UPDATE product SET name = ?, pack_size = ?, mrp = ?, status = ?, image = ? WHERE product_id = ?";
  db.query(
      statement,
      [name, pack_size, mrp, status, image, product_id],
      (error, result) => {
          if (error) {
              response.status(500).json({ status: "error", error: error });
          } else {
              response.status(200).json({ status: "success", message: "Product updated successfully" });
          }
      }
  );
});


// router.delete('/cancelproduct/:category_id', (request, response) => {
//   const { category_id } = request.params
//   db.query(`delete from product where category_id = ? `, [category_id], (error, result) => {
//     response.send(utils.createResult(error, result))
//   })
// })

  
router.put('/changestatus/:product_id', (request, response) => {
  const { product_id } = request.params;
  const { status } = request.body; 

  
  const Inactive = "Inactive"; // Define Inactive with the correct value

  const statement = "UPDATE product SET status = ? WHERE product_id = ?";
  
  db.query(
    statement, 
    [Inactive, product_id],
    (error, result) => {
      if (error) {
        console.error("Error updating category status:", error);
        response.status(500).json({ error: "Error updating category status" });
      } else {
        console.log("Category status updated successfully");
        response.status(200).json({ message: "Category status updated successfully" });
      }
    }
  );
});


















  module.exports = router