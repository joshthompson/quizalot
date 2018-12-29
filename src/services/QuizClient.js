import api from '~/services/api'
import io from 'socket.io-client'
import Cookie from 'js-cookie'

class QuizClient {

	constructor() {
		this.setup()
		this.setupSocket()
		this.recoverActiveGame()
	}

	setup() {
		this.socket = io(api)
		this.quiz = null
		this.player = null
		this.mode = null
		this.quizes = []
	}

	setupSocket() {
		// Common
		this.socket.on('quizState', quiz => this.quiz = quiz)
		this.socket.on('playerState', player => {
			this.player = player
			document.body.style.backgroundColor = player.colour
		})
		this.socket.on('errorMessage', error => alert(`Error: ${error}`))
		this.socket.on('started', () => this.state = 'quiz')
		this.socket.on('recovered', mode => this.mode = mode)

		// Host
		this.socket.on('created', quiz => this.created(quiz))
		this.socket.on('quizes', quizes => this.quizes = quizes)

		// Player
		this.socket.on('joined', data => this.joined(data))
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

	removeActiveGame() {
		Cookie.remove('gameData')
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
