<script>
	import QuizHostHeader from '~/components/host/QuizHostHeader.vue'
	import Question from '~/components/host/Question.vue'
	import QuizHostReviewAnswer from '~/components/host/QuizHostReviewAnswer.vue'
	import QuizClient from '~/services/QuizClient'
	export default {
		components: { QuizHostHeader, Question, QuizHostReviewAnswer },
		data() {
			return {
				client: QuizClient,
				scores: []
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
			},
			answers() {
				return this.quiz.answers[this.quiz.round][this.quiz.question]
			},
			noAnswers() {
				return Object.keys(this.answers).length === 0
			}
		},
		methods: {
			next() {
				QuizClient.scores(this.getScores())
				QuizClient.next()
			},
			getScores() {
				const round = this.quiz.round
				const question = this.quiz.question
				this.scores[round] = this.scores[round] || []
				this.scores[round][question] = this.scores[round][question] || {}
				return this.scores[round][question]
			},
			setScore(name, score) {
				this.getScores()[name] = score
			}
		}
	}
</script>

<template>
	<div>
		<QuizHostHeader :suffix="`Question ${questionNumber}`" />

		<Question :question="question" />

		<div class="correct-answer box">{{ question.answer }}</div>

		<div class="answers">
			<QuizHostReviewAnswer
				v-for="(answer, name) in answers"
				:answer="answer"
				:name="name"
				:key="quiz.question + '.' + quiz.round + '.' + name"
				@score="setScore(name, $event)"
			/>
			<h2 v-if="noAnswers">No answers</h2>
		</div>

		<button @click="next">Next</button>

	</div>
</template>

<style scoped>
	.correct-answer {
		border: 2px solid #000000;
		font-size: 2rem;
		text-transform: uppercase;
	}
</style>
