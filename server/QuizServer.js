const Quiz = require('./Quiz')
const Quizes = require('./Quizes')
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
		this.inactiveQuizTimeout = 60 * 1000
	}

	setupSocket() {

		this.socket.on('create', id => {
			this.mode = 'host'
			this.setupSocketForHost()
			this.quiz = new Quiz(this.socket, id)
			this.quizes.push(this.quiz)

			this.quiz.addPlayer(FakePlayer(this.quiz))
			this.quiz.addPlayer(FakePlayer(this.quiz))
			// this.quiz.addPlayer(FakePlayer(this.quiz))
			// this.quiz.addPlayer(FakePlayer(this.quiz))

			this.socket.emit('created', this.quiz.privateJSON())
		})

		this.socket.on('join', data => {
			const name = data.name.trim()
			const code = data.code.toUpperCase().trim()

		 	this.quiz = this.quizes.find(q => q.code === code)
			if (!this.quiz) {
				return this.socket.emit('errorMessage', `Quiz with code '${code}' was not found`)
			}
			if (this.quiz.players.find(p => p.name.toUpperCase() === name.toUpperCase())) {
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
				}, this.inactiveQuizTimeout)
			}
		})

		this.socket.on('recoverGame', recover => {
			const quiz = this.quizes.find(q => q.code === recover.code)
			if (quiz) {
				if (quiz.token === recover.token) {
					quiz.socket = this.socket
					quiz.socket.emit('recovered', 'host')
					this.quiz = quiz
					this.setupSocketForHost()
					quiz.update()
				} else {
					const player = quiz.players.find(p => p.token === recover.token)
					if (player) {
						player.socket = this.socket
						player.socket.emit('quizState', quiz.publicJSON())
						player.socket.emit('recovered', 'player')
						this.quiz = player.quiz
						this.player = quiz
						this.setupSocketForPlayer()
						player.update()
					}
				}
			} else {
				this.socket.emit('recoverFailed')
			}
		})

		this.socket.on('quizes', () => {
			this.socket.emit('quizes', Object.keys(Quizes).map(id => ({
				id: id,
				name: Quizes[id].name,
				description: Quizes[id].description,
				rounds: Quizes[id].rounds.length,
				questions: Quizes[id].rounds.map(r => r.questions.length).reduce((a, b) => a + b, 0)
			})))
		})
	}

	setupSocketForHost() {
		this.socket.on('start', () => {
			this.quiz.start()
		})

		this.socket.on('next', () => this.quiz.next())

		// this.socket.on('setQuestion', data => {
		// 	this.quiz.round = data.round
		// 	this.quiz.question = data.question
		// 	this.quiz.update()
		// })

		// this.socket.on('nextQuestion', () => {
		// 	this.quiz.question += 1
		// 	this.quiz.players.forEach(p => p.reset())
		// 	this.quiz.update()
		// })
		//
		// this.socket.on('nextRound', () => {
		// 	this.quiz.round += 1
		// 	this.quiz.question = 0
		// 	this.quiz.players.forEach(p => p.reset())
		// 	this.quiz.update()
		// })

		this.socket.on('points', pointData => {
			if (pointData instanceof Array) {
				pointData.forEach(data => {
					const player = this.quiz.players.find(p => p.name === data.name)
					if (player) {
						player.score += data.points
					} else {
						this.socket.emit('errorMessage', `Player '${data.player}' not found`)
					}
				})
				this.quiz.update()
			} else {
				this.socket.emit('errorMessage', 'Unexpected data')
			}
		})
	}

	setupSocketForPlayer() {
		this.socket.on('submitAnswer', answer => {
			this.player.submitAnswer(answer)
		})
	}

}

module.exports = QuizGameServer
