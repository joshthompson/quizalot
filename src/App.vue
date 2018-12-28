<script>
	import QuizWelcome from '~/components/QuizWelcome.vue'

	import QuizHostSetup from '~/components/host/QuizHostSetup.vue'
	import QuizHostQuestion from '~/components/host/QuizHostQuestion.vue'
	import QuizHostReview from '~/components/host/QuizHostReview.vue'
	import QuizHostScores from '~/components/host/QuizHostScores.vue'
	import QuizHostResults from '~/components/host/QuizHostResults.vue'

	import QuizPlayerSetup from '~/components/player/QuizPlayerSetup.vue'
	import QuizPlayerQuestion from '~/components/player/QuizPlayerQuestion.vue'
	import QuizPlayerReview from '~/components/player/QuizPlayerReview.vue'
	import QuizPlayerScores from '~/components/player/QuizPlayerScores.vue'
	import QuizPlayerResults from '~/components/player/QuizPlayerResults.vue'

	import QuizClient from '~/services/QuizClient'

	export default {
		components: {
			QuizWelcome,
			QuizHostSetup,
			QuizHostQuestion,
			QuizHostReview,
			QuizHostScores,
			QuizHostResults,
			QuizPlayerSetup,
			QuizPlayerQuestion,
			QuizPlayerReview,
			QuizPlayerScores,
			QuizPlayerResults
		},
		data() {
			return {
				client: QuizClient
			}
		},
		computed: {
			state() {
				if (this.client.quiz) {
					return this.client.quiz.state
				} else {
					return 'welcome'
				}
			},
			mode() {
				return this.client.mode
			}
		}
	}
</script>

<template>
	<div id="app">
		<QuizWelcome v-if="state === 'welcome'" />
		<div v-if="mode === 'host'">
			<QuizHostQuestion v-if="state === 'question'" />
			<QuizHostSetup v-if="state === 'setup'" />
			<QuizHostReview v-if="state === 'review'" />
			<QuizHostScores v-if="state === 'scores'" />
			<QuizHostResults v-if="state === 'results'" />
		</div>
		<div v-if="mode === 'player'">
			<QuizPlayerQuestion v-if="state === 'question'" />
			<QuizPlayerSetup v-if="state === 'setup'" />
			<QuizPlayerReview v-if="state === 'review'" />
			<QuizPlayerScores v-if="state === 'scores'" />
			<QuizPlayerResults v-if="state === 'results'" />
		</div>
	</div>
</template>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		height: 100vh;
		width: 100vw;
	}

	html {
		font-size: 20px;
		box-sizing: border-box;
	}

	body {
		background: #008DD4;
		color: white;
		margin: 0;
		padding: 0;
	}

	*, *:before, *:after {
		box-sizing: inherit;
	}

	a {
		color: black;
	}

	button {
		display: inline-block;
		padding: 10px 20px;
		background: white;
		border: none;
		color: #000000;
		text-transform: uppercase;
		cursor: pointer;
		font-size: 1rem;
		margin: 0.5rem;
		transition: all 0.2s ease-out;
		outline: none;
	}

	button:hover {
		transform: scale(1.05) translateY(-2px);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
	}

	input {
		font-size: 1rem;
		padding: 0.5rem;
		border: none;
		margin: 0.5rem;
		outline: none;
		text-transform: uppercase;
	}

	button.badge {
		border-radius: 50%;
		padding: 0;
		height: 1.5rem;
		width: 1.5rem;
		color: #FFFFFF;
		background: #000000;
	}

	button.invert {
		background: #000000;
		color: #FFFFFF;
	}

	.box {
		background: #FFFFFF;
		color: #000000;
		display: inline-block;
		padding: 1rem;
		margin: 1rem;
		position: relative;
	}

</style>
