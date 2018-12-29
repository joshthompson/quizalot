<script>
	import QuizClient from '~/services/QuizClient'
	import PlayerAvatars from '~/services/PlayerAvatars'
	export default {
		data() {
			return {
				client: QuizClient,
				avatars: PlayerAvatars
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
			},
			exit() {
				QuizClient.quit()
			}
		}
	}
</script>

<template>
	<div>
		<h1>Quiz Lobby</h1>
		<h2>Game Code: {{ quiz.code }}</h2>
		<h3>Players</h3>
		<div class="players">
			<div v-for="player in players" :key="player.name" class="player">
				<img :src="avatars[player.avatar]" />
				<span class="name">{{ player.name }}</span>
			</div>
		</div>
		<p v-if="players.length === 0">Waiting for a players</p>
		<button @click="start">Start</button>
		<br/>
		<button @click="exit">Exit</button>
	</div>
</template>

<style scoped>
	.player {
		width: 200px;
		display: inline-block;
		vertical-align: top;
	}
	.player img {
		width: 100px;
		margin: 0 auto 0;
		display: block;
	}
</style>
