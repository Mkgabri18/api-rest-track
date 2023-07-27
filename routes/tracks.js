const express = require('express')
const router = express.Router()
const authMiddleware = require("../middleware/session")
const checkRol = require("../middleware/rol")
const { validatorCreateItem, validatorGetItem } = require("../validators/tracks")
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks")

// List of items
router.get("/", authMiddleware, getItems)

// Details of item
router.get("/:id", authMiddleware, validatorGetItem, getItem)

// Create item
router.post("/", authMiddleware, checkRol(["admin"]), validatorCreateItem, createItem)
  
// Update item
router.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem, updateItem)

// Delete item
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem)

module.exports = router