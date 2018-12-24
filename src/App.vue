<script>
	import Welcome from './components/Welcome.vue'
	import Lobby from './components/Lobby.vue'
	import Join from './components/Join.vue'
	import Quiz from './components/Quiz.vue'
	import QuizInput from './components/QuizInput.vue'
	import Results from './components/Results.vue'
	import api from './services/api'
	import io from 'socket.io-client'

	const socket = io(api)

	export default {
		components: { Welcome, Lobby, Join, Quiz, QuizInput, Results },
		data() {
			return {
				state: 'welcome',
				quiz: null,
				mode: null
			}
		},
		created() {
			socket.on('quizState', quiz => this.quiz = quiz)
			socket.on('playerState', player => {
				this.player = player
				document.body.style.backgroundColor = player.colour
			})
			socket.on('errorMessage', error => alert(`Error: ${error}`))
			socket.on('started', () => this.state = 'quiz')
		},
		methods: {
			create() {
				socket.emit('create')
				socket.on('created', (quiz) => {
					this.quiz = quiz
					this.mode = 'host'
					this.state = 'lobby'
				})
			},
			join() {
				this.state = 'join'
				this.mode = 'player'
			},
			joining(player) {
				socket.emit('join', player)
				socket.on('joined', data => {
					this.player = data.player
					this.quiz = data.quiz
					this.state = 'waiting'
				})
			},
			start() {
				socket.emit('start')
			},
			question(question) {
				socket.emit('setQuestion', question)
			},
			submitAnswer(answer) {
				socket.emit('submitAnswer', answer)
			},
			points(points) {
				socket.emit('points', points)
			}
		}
	}
</script>

<template>
	<div id="app">

		<!-- Pre Game -->
		<Welcome v-if="state === 'welcome'" @create="create" @join="join" />
		<Lobby   v-if="state === 'lobby'"   :quiz="quiz" @start="start" />
		<Join    v-if="state === 'join'"    @join="joining" />
		<div     v-if="state === 'waiting'">Waiting...</div>

		<!-- Game -->
		<div v-if="quiz && quiz.state === 'quiz'">
			<Quiz v-if="mode === 'host'" :quiz="quiz" @question="question" @points="points" />
			<QuizInput v-if="mode === 'player'" :quiz="quiz" :player="player" @submit="submitAnswer" />
		</div>

		<!-- Post Game -->
		<Results v-if="state === 'result'" />

	</div>
</template>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		height: 100vh;
		width: 100vw;
	}
	html, body {
		background: #008DD4;
		color: white;
		margin: 0;
		padding: 0;
		font-size: 20px;
		box-sizing: border-box;
	}
	*, *:before, *:after {
		box-sizing: inherit;
	}
	a {
		color: black;
	}

	button {
		display: inline-block;
		padding: 10px 20px;
		background: white;
		border: none;
		color: #000000;
		text-transform: uppercase;
		cursor: pointer;
		font-size: 1rem;
		margin: 0.5rem;
		transition: all 0.2s ease-out;
	}
	button:hover {
		transform: scale(1.05) translateY(-2px);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
	}

	input {
		font-size: 1rem;
		padding: 0.5rem;
		border: none;
		margin: 0.5rem;
		outline: none;
	}
</style>
