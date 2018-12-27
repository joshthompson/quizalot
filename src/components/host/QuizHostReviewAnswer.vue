<script>
	import QuizClient from '~/services/QuizClient'
	export default {
		props: ['answer', 'name'],
		data() {
			return {
				client: QuizClient,
				score: 0,
				scoreClass: 'none'
			}
		},
		methods: {
			setScore(score) {
				this.score = score
				this.$emit('score', score)
				switch (score) {
					case 0:
						this.scoreClass = 'wrong'
						break
					case 0.5:
						this.scoreClass = 'half'
						break
					case 1:
						this.scoreClass = 'right'
						break
					default:
						this.scoreClass = 'none'
						break
				}
			}
		}
	}
</script>

<template>
	<div class="answer box" :class="scoreClass">
		<div class="text">{{ answer }}</div>
		<div class="player">{{ name }}</div>
		<div class="badges">
			<button class="badge" @click="setScore(0)">X</button>
			<button class="badge" @click="setScore(0.5)">½</button>
			<button class="badge" @click="setScore(1)">✔</button>
		</div>
	</div>
</template>

<style scoped>

	.answer {
		min-width: 150px;
		text-transform: uppercase;
		transition: all 0.2s ease-out;
	}

	.answer.wrong {
		background: #990000;
		color: #FFFFFF;
	}

	.answer.half {
		background: #C0E21F;
		color: #000000;
	}

	.answer.right {
		background: #4D9C36;
		color: #FFFFFF;
	}

	.answer .text {
		font-size: 1.5rem;
		margin-bottom: 0.75rem;
	}
	.answer .player {
		font-size: 1rem;
	}
</style>
