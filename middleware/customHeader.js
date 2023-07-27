const cuntomHeader = (req, res, next) => {
  try {
    const apiKey = req.headers.api_key
    if(apiKey === 'car-123') {
      next()
    } else {
      res.status(403)
      res.send({error: "API KEY NO CORRECTA"})
    }
    
  } catch(e) {
    res.status(403)
    res.send({error: "ALGO OCURRIO EN EL CUSTOM HEADER"})
  }
}

module.exports = cuntomHeader