<script>
	import QuizHostHeader from '~/components/host/QuizHostHeader.vue'
	import QuizClient from '~/services/QuizClient'
	export default {
		components: { QuizHostHeader },
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
				QuizClient.next()
			}
		}
	}
</script>

<template>
	<div>

		<h2>Question {{ questionNumber }}</h2>
		<h3>{{ question.text }}</h3>
		<div class="box correct-answer">{{ question.answer }}</div>

		<div class="answers">
			<div class="answer box" v-for="(answer, name) in answers" :class="answer.answer">
				<div class="text">{{ answer.text }}</div>
				<div class="player">{{ name }}</div>
				<div class="badges">
					<button class="badge" @click="answer.answer = 'wrong'">X</button>
					<button class="badge" @click="answer.answer = 'half'">½</button>
					<button class="badge" @click="answer.answer = 'right'">✔</button>
				</div>
			</div>
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

	.answer {
		min-width: 150px;
		text-transform: uppercase;
		transition: all 0.2s ease-out;
	}

	.answer.wrong {
		background: #990000;
		color: #FFFFFF;
	}

	.answer.half {
		background: #C0E21F;
		color: #000000;
	}

	.answer.right {
		background: #4D9C36;
		color: #FFFFFF;
	}

	.answer .text {
		font-size: 1.5rem;
		margin-bottom: 0.75rem;
	}
	.answer .player {
		font-size: 1rem;
	}
</style>
