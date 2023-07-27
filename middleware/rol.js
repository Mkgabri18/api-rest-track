
const { handleHttpError } = require("../utils/handleError")


const checkRol = (roles) => (req, res, next) => {
  try {
    const {user} = req
    const rolesByUser = user.role
    console.log({user},rolesByUser)
    const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle))
    if(!checkValueRol) {
      handleHttpError(res, "USER_NOT_PERMISSION", 403)
      return
    }
    
    
    next()
  } catch (e) {
    handleHttpError(res, "ERROR_PERMISSION", 403)
  }
}

module.exports = checkRol