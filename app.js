const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
