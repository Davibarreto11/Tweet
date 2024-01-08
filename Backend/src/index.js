const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect('mongodb://127.0.0.1:27017/test')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});


app.use(cors());
app.use(express.json())
app.use((req, res, next) => {
  req.io = io

  return next()
})

app.use(require('./routes'))


server.listen(3333, () => {
  console.log('Server started on port 3333')
})
