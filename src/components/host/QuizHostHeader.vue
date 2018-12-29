<script>
	import QuizClient from '~/services/QuizClient'
	export default {
		props: ['suffix'],
		data() {
			return {
				client: QuizClient
			}
		},
		methods: {
			quit() {
				QuizClient.quit()
			}
		},
		computed: {
			quiz() {
				return this.client.quiz
			},
			round() {
				return this.quiz.rounds[this.quiz.round]
			},
			header() {
				if (this.suffix) {
					return `${this.round.name}: ${this.suffix}`
				} else {
					return this.round.name
				}
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
		<button class="badge quit" @click="quit">x</button>
		<h1 class="round">{{ header }}</h1>
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

	.quit {
		position: absolute;
		top: 10px;
		left: 10px;
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
