<script>
	import QuizPlayerHeader from '~/components/player/QuizPlayerHeader.vue'
	import QuizPlayerMessage from '~/components/player/QuizPlayerMessage.vue'
	import DrawingInput from '~/components/common/DrawingInput.vue'
	import QuizClient from '~/services/QuizClient'
	export default {
		components: { QuizPlayerHeader, QuizPlayerMessage, DrawingInput },
		data() {
			return {
				client: QuizClient,
				answer: ''
			}
		},
		computed: {
			state() {
				return this.client.player.state
			},
			question() {
				return this.client.quiz.currentQuestion
			},
			questionNumber() {
				return this.client.quiz.question
			},
			mode() {
				if (this.question.input === 'drawing') {
					return 'drawing'
				}
				if (this.question.extra && this.question.extra.options) {
					return 'options'
				}
				return 'input'
			}
		},
		methods: {
			submitAnswer() {
				QuizClient.submitAnswer(this.answer)
			},
			submitDrawing(drawing) {
				this.answer = drawing
				this.submitAnswer()
			}
		},
		watch: {
			questionNumber() {
				this.answer = ''
			}
		}
	}
</script>

<template>
	<div>
		<QuizPlayerHeader />
		<div class="submit" v-if="state === '...'">

			<div v-if="mode === 'drawing'">
				<DrawingInput :value="answer" @input="submitDrawing" />
			</div>

			<div v-if="mode === 'options'" class="options">
				<label
					class="box" v-for="(option, i) in question.extra.options"
					:key="`option_${i}`"
					:class="{selected: answer === option, notSelected: answer !== '' && answer !== option}"
				>
					<input type="radio" v-model="answer" :value="option" />
					<span>{{ option }}</span>
				</label>
				<button @click="submitAnswer">Submit</button>
			</div>


			<div v-if="mode === 'input'">
				<input class="answer" v-model="answer" />
				<button @click="submitAnswer">Submit</button>
			</div>

		</div>
		<QuizPlayerMessage v-if="state === 'submitted'">Waiting...</QuizPlayerMessage>
	</div>
</template>

<style scoped>
	.submit {
		flex-grow: 1;
		padding: 1rem;
	}
	.options label.box {
		display: block;
		cursor: pointer;
	}
	.options label.box span {
		user-select: none;
	}
	.options label.box input {
		display: none;
	}
	.options label.box.notSelected {
		opacity: 0.7;
	}
	.options label.box.selected {
		outline: 2px solid black;
	}
</style>
