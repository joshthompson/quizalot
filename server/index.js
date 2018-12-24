var QuizServer = require('./QuizServer')
var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

let quizes = [] // Stores all active quizes mapped to the room code
io.on('connection', (socket) => new QuizServer(socket, quizes))

let port = process.env.PORT || 3000

http.listen(port, () => {
	console.log(`                 OO
  OOOO
 OO  OO  OO  OO  OO  OOOOO
 OO  OO  OO  OO  OO    OO
 OO  OO  OO  OO  OO   OO
  OOOOO   OOOO   OO  OOOOO
     OO
     OO    Quiz Server
     OO    Copyright 2018
     OO    github.com/joshthompson/quizalot
     OO    Listening on *:${port}
      OO
       OOOOOOOOOOOOOOOOOOO
`)
})

app.use(express.static('dist'))
