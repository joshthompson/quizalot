<script>
	export default {
		props: [ 'players' ],
		methods: {
			points(player, points) {
				this.$emit('points', {
					player: player,
					points: points
				})
			},
			state(state) {
				if (state === '...') {
					return '✍️'
				} else {
					return state
				}
			}
		}
	}
</script>

<template>
	<div class="quiz-players">
		<div class="player" v-for="player in players" :key="player.name">
			<div class="name">{{ player.name }}</div>
			<div class="score">
				<a class="minus" @click="points(player.name, -1)">-</a>
				{{ player.score }}
				<a class="plus" @click="points(player.name, 1)">+</a>
			</div>
			<div class="status" :data-status="player.status">{{ state(player.state) }}</div>
		</div>
	</div>
</template>

<style scoped>
	.quiz-players {
		padding: 1rem;
		text-align: center;
		text-transform: uppercase;
	}
	.player {
		display: inline-block;
		padding: 1rem;
		background: white;
		margin: 0 0.5rem;
		min-width: 150px;
		color: #000000;
		position: relative;
	}
	.score {
		font-size: 2rem;
		line-height: 2rem;
	}
	.status {
		color: #999999;
		font-size: 0.75;
	}
	.plus, .minus {
		display: inline-block;
		background: #000000;
		color: #FFFFFF;
		border-radius: 50%;
		height: 1rem;
		width: 1rem;
		line-height: 1rem;
		font-size: 1rem;
		text-align: center;
		margin-bottom: 2px;
		vertical-align: 0.4rem;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.2s ease-out;
		user-select: none;
	}
	.plus:hover {
		transform: scale(1.1);
		background: #8DD400;
	}
	.minus:hover {
		transform: scale(1.1);
		background: #D4008D;
	}
</style>
