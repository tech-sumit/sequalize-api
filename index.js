const express = require('express')
require("dotenv").config();
const app = express()
const router = require('./router')

app.use(router)

app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`)
})