const express = require("express")
const db = require("../db")
const router = express.Router()
const utils = require("../utils")


router.get("/:category_id", (request, response) => {
    const category_id = request.params.category_id
    const statement = `SELECT * FROM category WHERE category_id=?`
    db.query(statement, [category_id], (error, result) => {
      response.send(utils.createResult(error, result))
      console.log(error)
    })
  })

  router.get("/", (request, response) => {
    const statement = `SELECT * FROM category`
    db.query(statement, (error, result) => {
      response.send(utils.createResult(error, result))
    })
  })

  router.post("/addcategory", (request, response) => {
    const {name,description,status} = request.body
    console.log(request.body)
    db.query(
      'INSERT INTO category(name,description,status) VALUES(?,?,?)',
      [name,description,status],
      (error, result) => {
        response.send(utils.createResult(error, result))
      }
    )
  })




router.put('/:category_id', (request, response) => {
  const { category_id } = request.params;
  const { name, description, status } = request.body;
  const statement = "UPDATE category SET name = ?, description = ?, status = ? WHERE category_id = ?";
  
  db.query(
      statement, 
      [name, description, status, category_id],
      (error, result) => {
          response.send(utils.createResult(error, result));
          console.log(result);
          console.log(error);
      }
  );
});


router.put('/changestatus/:category_id', (request, response) => {
  const { category_id } = request.params;
  const { status } = request.body; 

  
  const Inactive = "Inactive"; // Define Inactive with the correct value

  const statement = "UPDATE category SET status = ? WHERE category_id = ?";
  
  db.query(
    statement, 
    [Inactive, category_id],
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





router.delete('/cancelcategory/:category_id', (request, response) => {
  const { category_id } = request.params
  db.query(`delete from category where category_id = ? `, [category_id], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

  
  module.exports = router