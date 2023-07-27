const bcryptjs = require("bcryptjs")

/**
* Passworod not encrypted
* @param {*} passwordPlain
*/
const encrypt = async (passwordPlain) => {
  return await bcryptjs.hash(passwordPlain, 10)
}


/**
* pass password encrypted and not
* @param {*} passwordPlain
*/
const compare = async (passwordPlain,hashPassword) => {
  return await bcryptjs.compare(passwordPlain,hashPassword)
}

module.exports = { encrypt, compare }