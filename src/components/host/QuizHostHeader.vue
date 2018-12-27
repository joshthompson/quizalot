<script>
	import QuizClient from '~/services/QuizClient'
	export default {
		data() {
			return {
				client: QuizClient
			}
		},
		computed: {
			quiz() {
				return this.client.quiz
			},
			round() {
				return this.quiz.questions[this.quiz.round]
			}
		}
	}
</script>

<template>
	<div>
		<div class="room-code">
			<div class="text">Room Code</div>
			<div class="code">{{ quiz.code }}</div>
		</div>
		<h1 class="round">{{ round.name }}</h1>
	</div>
</template>

<style scoped>
	h1 {
		color: white;
		background: black;
		margin: 0;
		padding: 1rem;
	}

	.room-code {
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

	.room-code:hover {
		transform: rotate(25deg) scale(1.3);
	}

	.room-code .text {
		font-size: 0.875rem;
		line-height: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.room-code .code {
		font-size: 1.75rem;
		line-height: 1.75rem;
	}
</style>
