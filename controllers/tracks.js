const { matchedData } = require("express-validator")
const { handleHttpError } = require("../utils/handleError")
const { tracksModel } = require("../models")


/**
* get list of items
* param {*} req
* param {*} res
*/
const getItems = async (req, res) => {
  try {
    // console.log(req.user)
    const user = req.user
    const data = await tracksModel.findAllData({})
    // console.log(data)
    res.send({data, user})
    
  } catch (e) {
    handleHttpError(res, 'ERROR_GET_ITEMS')
  }
}

/**
* get detail of single item
* @param {*} req
* @param {*} res
*/
const getItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { id } = req
    const data = await tracksModel.findOneData(id)
    // console.log(data)
    res.send({data})
    
  } catch (e) {
    handleHttpError(res, 'ERROR_GET_ITEM')
  }
}

/**
* create single items
* param {*} req
* param {*} res
*/
const createItem = async (req, res) => {
  try {
    const body = matchedData(req)
    const data = await tracksModel.create(body)
    res.send({data})
  } catch (e) {
    handleHttpError(res, 'ERROR_CREATE_ITEMS')
  }
}

/**
* update single item
* param {*} req
* param {*} res
*/
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req)
    const data = await tracksModel.findOneAndUpdate(
        id, body
    )
    res.send({data})
  } catch (e) {
    handleHttpError(res, 'ERROR_UPDATE_ITEMS')
  }
}

/**
* delete item
* param {*} req
* param {*} res
*/
const deleteItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { id } = req
    const data = await tracksModel.delete({_id:id})
    res.send({data})
    
  } catch (e) {
    handleHttpError(res, 'ERROR_DELETE_ITEM')
  }
}


module.exports = { getItems, getItem, createItem, updateItem, deleteItem}