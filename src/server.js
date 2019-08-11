const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes/dev')
const server = express()
mongoose.connect('mongodb+srv://everson_delmaschio:Agosto94@cluster0-ashs8.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(3083);