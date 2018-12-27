<script>
	import QuizClient from '~/services/QuizClient'
	export default {
		data() {
			return {
				joinScreen: false,
				name: '',
				code: ''
			}
		},
		methods: {
			create() {
				QuizClient.create()
			},
			join() {
				QuizClient.join(this.name, this.code)
			}
		}
	}
</script>

<template>
	<div class="quiz-welcome">

		<div v-if="!joinScreen">
			<h1>Welcome to the Quiz</h1>
			<button @click="create">Start Quiz</button>
			<button @click="joinScreen = true">Join Quiz</button>
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
</style>
