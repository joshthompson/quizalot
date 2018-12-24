const questions = require('./questions')

class Quiz {

	constructor(socket) {
		this.socket = socket
		this.code = this.generateCode(4)
		this.state = 'setup'
		this.players = []
		this.questions = questions
		this.round = 0
		this.question = 0
		console.log(`Quiz created: ${this.code}`)
	}

	addPlayer(player) {
		this.players.push(player)
		this.update()
	}

	privateJSON() {
		return {
			code: this.code,
			state: this.state,
			players: this.players.map(p => p.publicJSON()),
			questions: this.questions,
			round: this.round,
			question: this.question
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
		})
	}

	end() {
		console.log(`Quiz ended: ${this.code}`)
		this.socket.emit('ended')
		this.players.forEach(player => player.socket.emit('ended'))
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

}

module.exports = Quiz
