const express = require('express')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
const PORT = process.env.PORT || 7050

const app = express()
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/mongodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

requireDir('./src/models')

//Rotas
app.use('/', require('./src/routes'))

app.listen(PORT, () => {
  console.log('Server is connected!')
})
