<script>
	import QuizClient from '~/services/QuizClient'
	export default {
		data() {
			return {
				client: QuizClient
			}
		}
	}
</script>

<template>
	<div class="quiz-player-header">
		{{ client.player.name }}
	</div>
</template>

<style scoped>
	.quiz-player-header {
		background: #000000;
		color: #FFFFFF;
		padding: 0.5rem;
		text-transform: uppercase;
	}
</style>
