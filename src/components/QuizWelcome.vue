<script>
	import QuizClient from '~/services/QuizClient'
	import Cookie from 'js-cookie'
	export default {
		data() {
			return {
				client: QuizClient,
				joinScreen: false,
				quizSelect: false,
				name: '',
				code: ''
			}
		},
		created() {
			QuizClient.getQuizes()
			this.name = QuizClient.previousPlayerName()
		},
		methods: {
			create(id) {
				QuizClient.create(id)
			},
			join() {
				QuizClient.join(this.name, this.code)
			},
			recover() {
				QuizClient.recoverActiveGame()
			}
		}
	}
</script>

<template>
	<div class="quiz-welcome">

		<div v-if="!joinScreen && !quizSelect">
			<h1>Welcome to the Quiz</h1>
			<button @click="quizSelect = true">Host Quiz</button>
			<button @click="joinScreen = true">Join Quiz</button>
			<div v-if="client.recoverable">
				<button @click="recover">Recover Active Quiz</button>
			</div>
		</div>

		<div v-if="quizSelect">
			<h1>Select A Quiz</h1>
			<div v-for="quiz in client.quizes" :key="quiz.id" class="box quiz">
				<div class="name">{{ quiz.name }}</div>
				<div class="description">{{ quiz.description }}</div>
				<div class="details"><strong>Rounds:</strong> {{ quiz.rounds }}</div>
				<div class="details"><strong>Questions:</strong> {{ quiz.questions }}</div>
				<button @click="create(quiz.id)" class="invert">Start</button>
			</div>
			<div v-if="client.quizes.length === 0">
				Loading quizes...
			</div>
			<div><button @click="quizSelect = false">Back</button></div>
		</div>

		<div v-if="joinScreen">
			<h1>Quiz Lobby</h1>
			<h2>Type in the code</h2>
			<div>
				<span>Name:</span>
				<input type="text" v-model="name" placeholder="Your name..." />
			</div>
			<div>
				<span>Code:</span>
				<input type="text" v-model="code" placeholder="Room code..." />
			</div>
			<button @click="joinScreen = false">Back</button>
			<button @click="join">Join</button>
		</div>

	</div>
</template>

<style scoped>
	h3 {
		margin: 40px 0 0;
	}
	.quiz .name {
		font-size: 1.5rem;
		font-weight: bold;
	}
	.quiz .description {
		margin: 0.5rem 0;
	}
	.quiz {
		padding-bottom: 0.5rem;
	}
</style>
