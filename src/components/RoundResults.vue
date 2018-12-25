<script>
	export default {
		props: ['quiz'],
		data() {
			return {
				question: 0
			}
		},
		computed: {
			round() {
				return this.quiz.questions[this.quiz.round]
			},
			answers() {
				return this.quiz.answers[this.quiz.round][this.question]
			},
			players() {
				this.quiz.players
			},
			another() {
				return this.question < this.round.questions.length
			},
			currentQuestion() {
				return this.round.questions[this.question]
			},
			sortedPlayers() {
				this.quiz.players.sort((a, b) => a.score < b.score ? 1 : -1)
				return this.quiz.players
			}
		},
		methods: {
			next() {
				this.applyPoints()
				this.question += 1
			},
			nextRound() {
				this.$emit('next')
			},
			applyPoints() {
				const points = []
				for (let name in this.answers) {
					points.push({
						name: name,
						points: this.pointAmount(this.answers[name].answer)
					})
				}
				this.$emit('points', points)
			},
			pointAmount(answer) {
				switch (answer) {
					case 'right': return 1
					case 'half': return 0.5
					default: return 0
				}
			}
		}
	}
</script>

<template>
	<div>
		<div v-if="another">
			<h2>Question {{ question + 1 }}</h2>
			<h3>{{ currentQuestion.text }}</h3>
			<div class="correct-answer">{{ currentQuestion.answer }}</div>

			<div class="answers">
				<div class="answer" v-for="(answer, name) in answers" :class="answer.answer">
					<div class="text">{{ answer.text }}</div>
					<div class="player">{{ name }}</div>
					<div class="badges">
						<button class="badge" @click="answer.answer = 'wrong'">X</button>
						<button class="badge" @click="answer.answer = 'half'">½</button>
						<button class="badge" @click="answer.answer = 'right'">✔</button>
					</div>
				</div>
				<h2 v-if="Object.keys(answers).length === 0">No answers</h2>
			</div>
			<button @click="next" v-if="another">Next</button>
		</div>

		<div v-if="!another">
			<h2>SCORES</h2>
			<div v-for="player in sortedPlayers" class="scores">
				<div class="player-name">{{ player.name }}</div>
				<div class="player-score">{{ player.score }}</div>
			</div>
			<button @click="nextRound">Next Round</button>
		</div>

	</div>
</template>

<style scoped>
	.correct-answer {
		background: #000000;
		color: #FFFFFF;
		padding: 1rem;
		margin: 1rem;
		text-transform: uppercase;
		font-size: 2rem;
		display: inline-block;
	}

	.answers {
		text-align: center;
	}

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

	.scores .player-score {
	}

	.answer {
		display: inline-block;
		padding: 1rem;
		background: white;
		margin: 0 0.5rem 1rem;
		min-width: 150px;
		color: #000000;
		position: relative;
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
