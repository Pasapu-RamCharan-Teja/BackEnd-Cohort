const express = require("express");
const router = express.Router();
const groceryController = require("../controllers/groceryController");

router.get("", groceryController.getGroceries);

router.get("/pending", groceryController.getPendingGroceries);

router.get("/:id", groceryController.getGrocery);

router.post("", groceryController.createGrocery);

router.put("/:id", groceryController.updateGrocery);

router.delete("/:id", groceryController.deleteGrocery);

module.exports = router;