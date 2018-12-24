class Player {

	constructor(socket, name, quiz) {
		this.socket = socket
		if (typeof name === 'string') {
			this.name = name.trim().toUpperCase()
		} else {
			this.name = 'Player ' + (quiz.players.length + 1)
		}
		this.quiz = quiz
		this.score = 0
		this.status = 'ready'
	}

	privateJSON() {
		return {
			status: this.status,
			name: this.name,
			score: this.score
		}
	}

	publicJSON() {
		return {
			status: this.status,
			name: this.name,
			score: this.score
		}
	}

	update() {
		this.socket.emit('playerState', this.privateJSON())
	}

}

module.exports = Player
