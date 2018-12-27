const questions = require('./questions')
var sha512 = require('js-sha512').sha512

class Quiz {

	constructor(socket) {
		this.socket = socket
		this.code = this.generateCode(4)
		this.token = this.createToken()
		this.state = 'setup'
		this.players = []
		this.questions = questions
		this.answers = this.setupAnswers()
		this.round = 0
		this.question = 0
		console.log(`Quiz created: ${this.code}`)
	}

	createToken() {
		return sha512(`quiz-token-thing-${new Date()}-${Math.random()}`)
	}

	setupAnswers() {
		return this.questions.map(round => round.questions.map(() => ({})))
	}

	addPlayer(player) {
		const colours = [
			'#008DD4',
			'#00D48D',
			'#8D00D4',
			'#8DD400',
			'#D48D00',
			'#D4008D'
		]
		player.colour = colours[this.players.length % colours.length]
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
			code: this.code,
			token: this.token,
			state: this.state,
			players: this.players.map(p => p.publicJSON()),
			questions: this.questions,
			round: this.round,
			question: this.question,
			answers: this.answers
		}
	}

	publicJSON() {
		return {
			code: this.code,
			state: this.state,
			players: this.players.map(p => p.publicJSON()),
			round: this.questions[this.round].name,
			questionNumber: this.question + 1,
			question: this.questions[this.round].questions[this.question].text
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

	currentQuestion() {
		return this.questions[this.round].questions[this.question]
	}

	answer(player, answer) {
		if (this.state === 'question') {
			this.answers[this.round][this.question][player.name] = {
				text: answer,
				answer: null
			}
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
		return this.questions[this.round].questions
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
				if (this.round < this.questions.length - 1) {
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
