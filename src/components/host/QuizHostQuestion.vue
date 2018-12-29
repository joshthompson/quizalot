<script>
	import QuizHostHeader from '~/components/host/QuizHostHeader.vue'
	import Question from '~/components/host/Question.vue'
	import QuizHostPlayers from '~/components/host/QuizHostPlayers.vue'
	import QuizClient from '~/services/QuizClient'
	export default {
		components: { QuizHostHeader, Question, QuizHostPlayers },
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
				return this.quiz.rounds[this.quiz.round]
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
		<QuizHostHeader :suffix="`Question ${questionNumber}`" />
		<Question :question="question" :showAnswer="false" />
		<div><button @click="next">Next</button></div>
		<QuizHostPlayers />
	</div>
</template>

<style scoped>
	.quiz-host-question {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
</style>
