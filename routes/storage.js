const express = require('express')
const router = express.Router()
const uploadMiddleware = require("../utils/handleStorage")
const { validatorGetItem } = require("../validators/storage")
const { getItems, getItem, createItem, updateItem, deleteItem  } = require("../controllers/storage")

// List of items
router.get("/", getItems)

// Details of item
router.get("/:id", validatorGetItem, getItem)

// Create item
router.post("/", uploadMiddleware.single("myfile"), createItem)

// Update item
router.put("/:id", validatorGetItem, updateItem)

// Delete item
router.delete("/:id", validatorGetItem, deleteItem)

module.exports = router