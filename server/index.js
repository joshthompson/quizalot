var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var QuizServer = require('./QuizServer')

let quizes = [] // Stores all active quizes
io.on('connection', socket => new QuizServer(socket, quizes))

let port = process.env.PORT || 3000

http.listen(port, () => {
	console.log(`
                 OO
  OOOO
 OO  OO  OO  OO  OO  OOOOO
 OO  OO  OO  OO  OO    OO
 OO  OO  OO  OO  OO   OO
  OOOOO   OOOO   OO  OOOOOOOOOOOOOOOOOOOOOOOOO
     OO                                       O
     OO    Quiz Server                        O
     OO    Copyright 2018                     O
     OO    github.com/joshthompson/quizalot   O
     OO    Listening on *:${port}                O
      OO                                      O
       OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
`)
})

app.use(express.static('dist'))
