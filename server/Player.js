class Player {

	constructor(socket, name, quiz) {
		if (typeof name === 'string') {
			this.name = name.trim().toUpperCase()
		} else {
			this.name = 'Player ' + (quiz.players.length + 1)
		}

		this.socket = socket
		this.quiz = quiz
		this.score = 0
		this.colour = '#008DD4'
		this.state = 'ready'
		this.answer = null
	}

	privateJSON() {
		return {
			state: this.state,
			name: this.name,
			score: this.score,
			colour: this.colour
		}
	}

	publicJSON() {
		return {
			state: this.state,
			name: this.name,
			score: this.score,
			colour: this.colour
		}
	}

	setState(state) {
		this.state = state
	}

	update() {
		this.socket.emit('playerState', this.privateJSON())
	}

	reset() {
		this.setState('...')
		this.answer = null
	}

	submitAnswer(answer) {
		console.log(`${this.name} submited the answer: ${answer}`)
		this.setState('submitted')
		this.answer = answer
		this.quiz.checkPlayers()
		this.quiz.update()
		this.update()
	}

}

module.exports = Player
