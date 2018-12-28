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
		this.code = this.generateCode(4)
		this.token = this.createToken()
		this.state = 'setup'
		this.players = []
		this.name = Quizes[quiz].name
		this.rounds = Quizes[quiz].rounds
		this.answers = this.setupAnswers()
		this.round = 0
		this.question = 0
		this.colours = null
		console.log(`Quiz created: ${this.code}`)
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
		let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		chars = [
			'YULE',
			'HOHO',
			'XMAS',
			'COAL',
			'TREE',
			'BALL',
			'SNOW',
			'STAR'
		]
		while (code.length < length) {
			code = code + chars[Math.floor(Math.random() * chars.length)]
		}
		return code
	}

	currentQuestions() {
		return this.rounds[this.round].questions
	}

	currentQuestion() {
		return this.currentQuestions()[this.question]
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
