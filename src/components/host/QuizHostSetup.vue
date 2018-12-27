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
			players() {
				return this.quiz.players
			}
		},
		methods: {
			start() {
				QuizClient.next()
			}
		}
	}
</script>

<template>
	<div>
		<h1>Quiz Lobby</h1>
		<h2>Game Code: {{ quiz.code }}</h2>
		<h3>Players</h3>
		<ul>
			<li v-for="player in players" :key="player.name">
				{{ player.name }}
			</li>
		</ul>
		<p v-if="players.length === 0">Waiting for a players</p>
		<button @click="start">Start</button>
	</div>
</template>

<style scoped>
	ul {
		padding: 0;
		list-style-type: none;
	}
</style>
