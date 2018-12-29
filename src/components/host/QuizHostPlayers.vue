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
			players() {
				return this.client.quiz.players
			}
		}
	}
</script>

<template>
	<div class="quiz-host-players">
		<div class="player" v-for="player in players" :key="player.name">
			<img :src="avatars[player.avatar]" />
			<div class="name">{{ player.name }}</div>
			<div class="status" :data-status="player.status">{{ player.state }}</div>
		</div>
	</div>
</template>

<style scoped>
	.quiz-host-players {
		padding: 1rem 1rem 0rem;
		text-align: center;
		text-transform: uppercase;
		background: #000000;
	}
	.player {
		display: inline-block;
		padding: 1rem;
		background: white;
		margin: 0 0.5rem 1rem;
		min-width: 150px;
		color: #000000;
		position: relative;
	}
	.player img {
		width: 50px;
		margin: -60px auto 0;
		display: block;
	}
	.status {
		color: #999999;
		font-size: 0.75;
	}
</style>
