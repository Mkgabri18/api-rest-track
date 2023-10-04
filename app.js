require('dotenv').config()
const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const dbConnect = require("./config/mongo");
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("storage")) //* path static files to send

const port = process.env.PORT || 3000

app.use("/api",  routes)

app.listen(port, () => {
    console.log("app ready on http://localhost:"+port)
});


dbConnect()
