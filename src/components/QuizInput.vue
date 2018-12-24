<script>
	export default {
		props: [ 'quiz', 'player' ],
		data() {
			return {
				title: true,
				answer: ''
			}
		},
		created() {
			this.$emit('question', {
				round: this.quiz.round,
				question: this.quiz.question
			})
		},
		methods: {
			submit() {
				this.$emit('submit', this.answer)
			}
		}
	}
</script>

<template>
	<div class="question">
		<header>
			<h1 class="round">{{ quiz.round }}</h1>
			<h2 class="question-number">Question {{ quiz.questionNumber }}</h2>
		</header>

		<p>{{ quiz.question }}</p>

		<div class="content" v-if="player.state === '...'">
			<div><input class="answer" v-model="answer" /></div>
			<button @click="submit">Submit</button>
		</div>

		<div class="content" v-if="player.state === 'submitted'">
			Great Answer {{ player.name }}!
		</div>
	</div>
</template>

<style scoped>
	.question {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
	.question header {
		color: white;
		background: black;
		margin: 0;
		padding: 0.5rem;
	}
	.question header h1,
	.question header h2 {
		margin: 0;
	}
	.content {
		flex-grow: 1;
			padding: 1rem;
	}
	.answer {
		width: 100%;
		margin: 0;
	}
</style>
