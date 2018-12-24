const Quiz = require('./Quiz')
const Player = require('./Player')
const FakePlayer = require('./FakePlayer')

class QuizGameServer {

	constructor(socket, quizes) {
		// Data
		this.socket = socket
		this.quizes = quizes
		this.mode = null
		this.quiz = null
		this.player = null
		this.setupSocket()
		// Settings
		this.inactiveGameTimeout = 60 * 1000				* 0 + 1
	}

	setupSocket() {
		// Common
		// this.socket.on('disconnect', (...args) => this.actions.common.disconnect(...args))
		// this.socket.on('recoverGame', (...args) => this.actions.common.recoverGame(...args))
		// this.socket.on('requestStats', (...args) => this.actions.common.requestStats(...args))

		this.socket.on('create', () => {
			this.mode = 'host'
			this.setupSocketForHost()
			this.quiz = new Quiz(this.socket)
			this.quizes.push(this.quiz)

			this.quiz.addPlayer(FakePlayer(this.quiz))
			this.quiz.addPlayer(FakePlayer(this.quiz))
			this.quiz.addPlayer(FakePlayer(this.quiz))
			this.quiz.addPlayer(FakePlayer(this.quiz))

			this.socket.emit('created', this.quiz.privateJSON())
		})

		this.socket.on('join', data => {
			const name = data.name.trim()
			const code = data.code.toUpperCase().trim()

		 	this.quiz = this.quizes.find(q => q.code === code)
			if (!this.quiz) {
				return this.socket.emit('errorMessage', `Quiz with code '${code}' was not found`)
			}
			if (this.quiz.players.find(p => p.name === name)) {
				return this.socket.emit('errorMessage', `Player with the name '${name}' has already joined`)
			}
			this.player = new Player(this.socket, name, this.quiz)
			this.mode = 'player'
			this.setupSocketForPlayer()
			this.quiz.addPlayer(this.player)
			this.socket.emit('joined', {
				player: this.player.privateJSON(),
				quiz: this.quiz.publicJSON()
			})
		})

		this.socket.on('disconnect', () => {
			if (this.quiz && !this.quiz.activeSockets()) {
				setTimeout(() => {
					if (!this.quiz.activeSockets()) {
						// Remove inactive quiz
						this.quiz.end()
						const n = this.quizes.findIndex(q => q.code = this.quiz.code)
						this.quizes.splice(n, 1)
						delete this.quiz

					}
				}, this.inactiveGameTimeout)
			}
		})
	}

	setupSocketForHost() {
		this.socket.on('start', () => {
			this.quiz.state = 'quiz'
			this.quiz.update()
			this.socket.emit('started')
			this.quiz.players.forEach(p => p.socket.emit('started'))
		})

		this.socket.on('setQuestion', data => {
			this.quiz.round = data.round
			this.quiz.question = data.question
			this.quiz.update()
		})

		this.socket.on('points', data => {
			const player = this.quiz.players.find(p => p.name === data.player)
			if (player) {
				player.score += data.points
				this.quiz.update()
			} else {
				this.socket.emit('errorMessage', `Player '${data.player}' not found`)
			}
		})
	}

	setupSocketForPlayer() {

	}

}

module.exports = QuizGameServer
