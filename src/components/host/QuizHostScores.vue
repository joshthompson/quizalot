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
			players() {
				this.quiz.players.sort((a, b) => a.score < b.score ? 1 : -1)
				return this.quiz.players
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
		<QuizHostHeader suffix="Scores" />
		<div v-for="player in players" class="scores">
			<div class="player-name">{{ player.name }}</div>
			<div class="player-score">{{ player.score }}</div>
		</div>
		<button @click="next">Next Round</button>
	</div>
</template>

<style scoped>
	.scores {
		display: flex;
		background: #FFFFFF;
		color: #000000;
		padding: 1rem;
		text-transform: uppercase;
		font-size: 2rem;
		margin: 1rem 200px;
	}

	.scores .player-name {
		flex-grow: 1;
		text-align: left;
	}
</style>
