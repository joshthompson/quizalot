const Quizes = require('./Quizes')
var sha512 = require('js-sha512').sha512

function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a
}

class Quiz {

	constructor(socket, quiz) {
		this.socket = socket
		this.data = Quizes[quiz]
		this.code = this.generateCode(4)
		this.token = this.createToken()
		this.state = 'setup'
		this.players = []
		this.answers = this.setupAnswers()
		this.round = 0
		this.question = 0
		this.colours = null
		console.log(`Quiz created: ${this.code}`)
	}

	get rounds() {
		return this.data.rounds
	}

	createToken() {
		return sha512(`quiz-token-thing-${new Date()}-${Math.random()}`)
	}

	setupAnswers() {
		return this.rounds.map(round => round.questions.map(() => ({})))
	}

	getColour() {
		if (!this.colours) {
			this.colours = shuffle([
				'#E91E63',
				'#9C27B0',
				'#3F51B5',
				'#2196F3',
				'#4CAF50',
				'#FF9800',
				'#795548'
			])
		}
		return this.colours[this.players.length % this.colours.length]
	}

	addPlayer(player) {
		player.colour = this.getColour()
		this.players.push(player)
		this.update()
	}

	start() {
		this.state = 'quiz'
		this.players.forEach(p => p.reset())
		this.broadcast('started')
		this.update()
	}

	broadcast(event, data) {
		this.socket.emit(event, data)
		this.players.forEach(p => p.socket.emit(event, data))
	}

	privateJSON() {
		return {
			token: this.token,
			code: this.code,
			state: this.state,
			players: this.players.map(p => p.publicJSON()),
			rounds: this.rounds,
			round: this.round,
			question: this.question,
			answers: this.answers
		}
	}

	publicJSON() {
		return {
			code: this.code,
			state: this.state,
			round: this.round,
			question: this.question,
			currentQuestion: this.currentQuestion(true),
			players: this.players.map(p => p.publicJSON())
		}
	}

	activeSockets() {
		let activeSockets = this.socket.connected ? 1 : 0
		this.players.forEach(player => activeSockets += player.socket.connected ? 1 : 0)
		return activeSockets
	}

	update() {
		this.socket.emit('quizState', this.privateJSON())
		this.players.forEach(p => {
			p.socket.emit('quizState', this.publicJSON())
			p.update()
		})
	}

	end() {
		console.log(`Quiz ended: ${this.code}`)
		this.socket.emit('ended')
		this.players.forEach(player => player.socket.emit('ended'))
	}

	checkPlayers() {
		let ready = true
		this.players.forEach(p => {
			if (p.status !== 'submitted') {
				ready = false
			}
		})
		// Do something
	}

	answer(player, answer) {
		if (this.state === 'question') {
			this.answers[this.round][this.question][player.name] = answer
		}
	}

	generateCode(length) {
		let code = ''
		const chars = this.data.codes ? this.data.codes : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		while (code.length < length) {
			code = code + chars[Math.floor(Math.random() * chars.length)]
		}
		return code
	}

	currentQuestions(hideAnswer) {
		return this.rounds[this.round].questions
	}

	currentQuestion(hideAnswer) {
		const question = this.currentQuestions()[this.question]
		if (hideAnswer) {
			return {
				text: question.text,
				extra: question.extra
			}
		}
		return question
	}

	next() {
		switch (this.state) {
			case 'setup':
				this.question = 0
				this.round = 0
				this.state = 'question'
				break;
			case 'question':
				if (this.question < this.currentQuestions().length - 1) {
					this.question++
				} else {
					this.question = 0
					this.state = 'review'
				}
				break;
			case 'review':
				if (this.question < this.currentQuestions().length - 1) {
					this.question++
				} else {
					this.state = 'scores'
				}
				break;
			case 'scores':
				if (this.round < this.rounds.length - 1) {
					this.question = 0
					this.round++
					this.state = 'question'
				} else {
					this.state = 'results'
				}
				break;
			case 'results':
				this.end()
				break;
		}
		this.players.forEach(p => p.reset())
		this.update()
	}

	end() {
		console.log('ENDED')
		console.log('ENDED')
		console.log('ENDED')
		console.log('ENDED')
		console.log('ENDED')
		console.log('ENDED')
		console.log('ENDED')
	}

}

module.exports = Quiz
