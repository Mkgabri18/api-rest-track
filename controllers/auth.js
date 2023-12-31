const { matchedData } = require("express-validator")
const { encrypt, compare } = require("../utils/handlePassword")
const { tokenSign } = require("../utils/handleJwt")
const { handleHttpError } = require("../utils/handleError")
const { usersModel } = require("../models")

/**
* create register items
* param {*} req
* param {*} res
*/
const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req)
    const password = await encrypt(req.password)
    const body = {...req, password}
    const dataUser = await usersModel.create(body)
    dataUser.set("password", undefined, { strict:false})
    const data = {
      token: await tokenSign(dataUser),
      user: dataUser
    }
    res.send({data})
  } catch(e) {
    handleHttpError(res, "ERROR_REGISTER_USER")
  }
}

/**
* Login
* param {*} req
* param {*} res
*/
const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req)
    console.log("pass from login", req)
    const user = await usersModel.findOne({email: req.email}).select("password")
    if(!user) {
      handleHttpError(res, "USER_NOT_EXIST", 404)
      return
    }
    
    const hashPassword = user.get("password")
    const check = await compare(req.password, hashPassword)
    if(!check) {
      handleHttpError(res, "USER_NOT_EXIST", 401)
      return
    }
    
    // hide password to protect
    user.set('password', undefined,  {strict: false})
    const data = {
      token: await tokenSign(user),
      user
    }
    
    res.send({data})
  } catch(e) {
    
  }
}

module.exports = { loginCtrl, registerCtrl }