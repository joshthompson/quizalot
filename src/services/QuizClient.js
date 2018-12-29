import api from '~/services/api'
import io from 'socket.io-client'
import Cookie from 'js-cookie'

class QuizClient {

	constructor() {
		this.quizes = []
		this.recoverable = Cookie.get('gameData')
		this.setup()
		this.setupSocket()
	}

	setup() {
		this.socket = io(api)
		this.quiz = null
		this.player = null
		this.mode = null
	}

	setupSocket() {
		// Common
		this.socket.on('quizState', quiz => this.quiz = quiz)
		this.socket.on('playerState', player => this.player = player)
		this.socket.on('background', colour => document.body.style.backgroundColor = colour)
		this.socket.on('errorMessage', message => this.error(message))
		this.socket.on('started', () => this.state = 'quiz')
		this.socket.on('recovered', mode => this.mode = mode)
		this.socket.on('recoverFailed', () => this.recoverFailed())

		// Host
		this.socket.on('created', quiz => this.created(quiz))
		this.socket.on('quizes', quizes => this.quizes = quizes)

		// Player
		this.socket.on('joined', data => this.joined(data))
	}

	error(message) {
		alert(`Error: ${message}`)
	}

	recoverFailed() {
		this.error('Recover game is no longer active')
		this.removeActiveGame()
	}

	getQuizes() {
		this.socket.emit('quizes')
	}

	storeActiveGame() {
		if (this.quiz) {
			Cookie.set('gameData', {
				code: this.quiz.code,
				token: this.player ? this.player.token : this.quiz.token
			})
		}
	}

	recoverActiveGame() {
		const gameData = Cookie.getJSON('gameData')
		if (gameData) {
			this.socket.emit('recoverGame', gameData)
		}
	}

	recoverable() {
		return Cookie.get('gameData')
	}

	removeActiveGame() {
		Cookie.remove('gameData')
		this.recoverable = false
	}

	create(id) {
		this.socket.emit('create', id)
	}

	created(quiz) {
		this.mode = 'host'
		this.quiz = quiz
		this.storeActiveGame()
	}

	join(name, code) {
		Cookie.set('playerName', name)
		this.socket.emit('join', { name, code })
	}

	previousPlayerName() {
		const name = Cookie.get('playerName')
		return name || ''
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

	submitAnswer(answer) {
		this.socket.emit('submitAnswer', answer)
	}

	scores(scores) {
		const points = Object.keys(scores).map(name => ({
			name: name,
			points: scores[name]
		}))
		this.socket.emit('points', points)
	}

	quit() {
		this.removeActiveGame()
		this.setup()
	}
}

const client = new QuizClient()

export default client
