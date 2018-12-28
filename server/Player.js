var sha512 = require('js-sha512').sha512

let avatars = [
	'avatar1',
	'avatar2',
	'avatar3',
	'avatar4',
	'avatar5',
	'avatar6',
	'avatar7',
	'avatar8',
	'avatar9',
	'avatar10',
	'avatar11',
	'avatar12'
]

class Player {

	constructor(socket, name, quiz) {
		if (typeof name === 'string') {
			this.name = name.trim().toUpperCase()
		} else {
			this.name = 'Player ' + (quiz.players.length + 1)
		}

		this.socket = socket
		this.token = this.createToken()
		this.quiz = quiz
		this.score = 0
		this.colour = '#008DD4'
		this.state = 'ready'
		this.answer = null
		this.avatar = this.setAvatar()
	}

	setAvatar() {
		const avatar = avatars.splice(Math.floor(Math.random() * avatars.length), 1)
		return avatar
	}

	createToken() {
		return sha512(`quiz-token-thing-${new Date()}-${Math.random()}`)
	}

	privateJSON() {
		return {
			state: this.state,
			token: this.token,
			name: this.name,
			avatar: this.avatar,
			score: this.score,
			colour: this.colour
		}
	}

	publicJSON() {
		return {
			state: this.state,
			name: this.name,
			avatar: this.avatar,
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
		if (this.quiz.state === 'question') {
			if (this.answer === '' || !this.answer) {
				console.log(`${this.name} submitted the answer: ${answer}`)
				this.setState('submitted')
				this.answer = answer
				this.quiz.answer(this, answer)
				this.quiz.checkPlayers()
				this.quiz.update()
				this.update()
			}
		}
	}

}

module.exports = Player
