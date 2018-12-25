<script>
	import QuizPlayers from './QuizPlayers.vue'
	import RoundResults from './RoundResults.vue'

	export default {
		props: [ 'quiz' ],
		components: { QuizPlayers, RoundResults },
		data() {
			return {
				title: true,
				roundSummary: false
			}
		},
		created() {
			this.$emit('question', {
				round: this.quiz.round,
				question: this.quiz.question
			})
		},
		methods: {
			next() {
				if (this.quiz.question === this.round.questions.length - 1) {
					this.roundSummary = true
					this.$emit('lock')
				} else {
					this.$emit('next')
				}
			},
			nextRound() {
				this.$emit('nextRound')
				this.roundSummary = false
			}
		},
		computed: {
			round() {
				return this.quiz.questions[this.quiz.round]
			},
			questionNumber() {
				return this.quiz.question + 1
			},
			question() {
				return this.round.questions[this.quiz.question]
			}
		}
	}
</script>

<template>
	<div class="question">
		<div id="room-code">
			<div class="text">Room Code</div>
			<div class="code">{{ quiz.code }}</div>
		</div>
		<h1 class="round">{{ round.name }}</h1>

		<div class="content" v-if="!roundSummary">
			<div class="middle">
				<h2>Question {{ questionNumber }}</h2>
				<h3>{{ question.text }}</h3>
				<button @click="next">Next</button>
			</div>
		</div>

		<div class="players" v-if="!roundSummary">
			<QuizPlayers :players="quiz.players" :scores="false" @points="$emit('points', $event)" />
		</div>

		<RoundResults :quiz="quiz" v-if="roundSummary" @points="$emit('points', $event)" @next="nextRound" />
	</div>
</template>

<style scoped>
	.question {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
	.question h1 {
		color: white;
		background: black;
		margin: 0;
		padding: 1rem;
	}
	.content {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 32px;
	}
	.content h2 {
		font-size: 2em;
	}
	.content h3 {
		font-size: 1.5em;
	}

	#room-code {
		position: absolute;
		top: 2rem;
		right: 2rem;
		transform: rotate(15deg);
		text-transform: uppercase;
		text-align: center;
		font-weight: bold;
		background: #FFFFFF;
		color: #000000;
		border-radius: 50%;
		padding: 1.5rem 1rem 1rem;
		transition: all 0.2s ease-out;
		cursor: default;
	}

	#room-code:hover {
		transform: rotate(25deg) scale(1.3);
	}

	#room-code .text {
		font-size: 0.875rem;
		line-height: 0.5rem;
		margin-bottom: 0.5rem;
	}

	#room-code .code {
		font-size: 1.75rem;
		line-height: 1.75rem;
	}

</style>
