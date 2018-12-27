import api from '~/services/api'
import io from 'socket.io-client'
import Cookie from 'js-cookie'

class QuizClient {

	constructor() {
		// Data
		this.socket = io(api)
		this.quiz = null
		this.player = null
		this.mode = null

		// Start
		this.setup()
		// this.recoverActiveGame()
	}

	setup() {
		// Common
		this.socket.on('quizState', quiz => this.quiz = quiz)
		this.socket.on('playerState', player => {
			this.player = player
			document.body.style.backgroundColor = player.colour
		})
		this.socket.on('errorMessage', error => alert(`Error: ${error}`))
		this.socket.on('started', () => this.state = 'quiz')
		this.socket.on('recoverd', mode => this.mode = mode)

		// Host
		this.socket.on('created', quiz => this.created(quiz))

		// Player
		this.socket.on('joined', data => this.joined(data))
	}

	storeActiveGame() {
		if (this.quiz) {
			Cookie.set('game_data', {
				code: this.quiz.code,
				token: this.player ? this.player.token : this.quiz.token
			})
		}
	}

	recoverActiveGame() {
		const gameData = Cookie.getJSON('game_data')
		if (gameData) {
			this.socket.emit('recoverGame', gameData)
		}
	}

	create() {
		this.socket.emit('create')
	}

	created(quiz) {
		this.mode = 'host'
		this.quiz = quiz
		this.storeActiveGame()
	}

	join(name, code) {
		this.socket.emit('join', { name, code })
	}

	joined(data) {
		this.mode = 'player'
		this.quiz = data.quiz
		this.player = data.player
		this.storeActiveGame()
	}

	next() {
		this.socket.emit('next')
	}

}

const client = new QuizClient()

export default client
