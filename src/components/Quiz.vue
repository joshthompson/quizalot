<script>
	import QuizPlayers from './QuizPlayers.vue'
	export default {
		props: [ 'quiz' ],
		components: { QuizPlayers },
		data() {
			return {
				title: true
			}
		},
		created() {
			this.$emit('question', {
				round: this.quiz.round,
				question: this.quiz.question
			})
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
		<h1 class="round">{{ round.name }}</h1>
		<div class="content">
			<div class="middle">
				<h2>Question {{ questionNumber }}</h2>
				<h3>{{ question.text }}</h3>
			</div>
		</div>
		<div class="players">
			<QuizPlayers :players="quiz.players" @points="$emit('points', $event)" />
		</div>
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
</style>
