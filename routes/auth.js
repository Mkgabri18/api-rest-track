const express = require('express')
const { matchedData } = require("express-validator")
const { encrypt, compare } = require("../utils/handlePassword")
const { tokenSign } = require("../utils/handleJwt")
const router = express.Router()
const { usersModel } = require("../models")
const { validatorRegister, validatorLogin } = require("../validators/auth")
const { loginCtrl, registerCtrl } = require("../controllers/auth")


// create register
router.post("/register", validatorRegister, registerCtrl)

// Create item
router.post("/login", validatorLogin, loginCtrl)

module.exports = router