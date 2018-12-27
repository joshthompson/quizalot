<script>
	import QuizHostHeader from '~/components/host/QuizHostHeader.vue'
	import QuizHostPlayers from '~/components/host/QuizHostPlayers.vue'
	import QuizClient from '~/services/QuizClient'
	export default {
		components: { QuizHostHeader, QuizHostPlayers },
		data() {
			return {
				client: QuizClient
			}
		},
		computed: {
			quiz() {
				return this.client.quiz
			},
			questionNumber() {
				return this.quiz.question + 1
			},
			round() {
				return this.quiz.questions[this.quiz.round]
			},
			question() {
				return this.round.questions[this.quiz.question]
			}
		},
		methods: {
			next() {
				QuizClient.next()
			}
		}
	}
</script>

<template>
	<div class="quiz-host-question">
		<QuizHostHeader />

		<div class="question">
			<h2>Question {{ questionNumber }}</h2>
			<h3>{{ question.text }}</h3>
			<div><button @click="next">Next</button></div>
		</div>

		<div class="players">
			<QuizHostPlayers />
		</div>

	</div>
</template>

<style scoped>
	.quiz-host-question {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.quiz-host-question .question {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 32px;
	}

	.quiz-host-question .question h2 {
		font-size: 2em;
	}

	.quiz-host-question .question h3 {
		font-size: 1.5em;
	}
</style>
