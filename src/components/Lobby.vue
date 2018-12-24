<script>
	export default {
		props: [ 'quiz' ]
	}
</script>

<template>
	<div>
		<h1>Quiz Lobby</h1>

		<h2>Game Code: {{ quiz.code }}</h2>

		<h3>Players</h3>
		<ul>
			<li v-for="player in quiz.players" :key="player.name">
				{{ player.name }}
			</li>
		</ul>
		<p v-if="quiz.players.length === 0">Waiting for a players</p>
		<button @click="$emit('start')">Start</button>

	</div>
</template>

<style scoped>
	ul {
		padding: 0;
		list-style-type: none;
	}
</style>
