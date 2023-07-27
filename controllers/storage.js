const fs = require("fs")
const { matchedData } = require("express-validator")
const { handleHttpError } = require("../utils/handleError")
const { storageModel } = require("../models")
const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_URL = `${__dirname}/../storage`

/**
* get list of items
* param {*} req
* param {*} res
*/
const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({})
    res.send(data)    
  }catch (e) {
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
    const { id } = matchedData(req)
    const data = await storageModel.findById(id)
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
    const { body, file } = req
    // console.log(file)
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`
    }
    const data = await storageModel.create(fileData)
    res.send({data})
  } catch (e) {
    handleHttpError(res, 'ERROR_GET_ITEM')
  }
}

/**
* update single item
* param {*} req
* param {*} res
*/
const updateItem = async (req, res) => {}

/**
* delete item
* param {*} req
* param {*} res
*/
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req)
    const dataFile = await storageModel.findById(id) //.delete({_id:id})
    await storageModel.delete({_id: id}) //deleteOne(id) //hard delete
    const {filename} = dataFile
    const filePath = `${MEDIA_URL}/${filename}`
    
    //fs.unlinkSync(filePath) //hard delete
    
    const data = {
      filePath,
      delete:1
    }
    res.send({data})
    
  } catch (e) {
    handleHttpError(res, 'ERROR_DELETE_ITEM')
  }
}


module.exports = { getItems, getItem, createItem, updateItem, deleteItem}