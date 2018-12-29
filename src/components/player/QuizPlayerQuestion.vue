<script>
	import QuizPlayerHeader from '~/components/player/QuizPlayerHeader.vue'
	import QuizPlayerMessage from '~/components/player/QuizPlayerMessage.vue'
	import QuizClient from '~/services/QuizClient'
	export default {
		components: { QuizPlayerHeader, QuizPlayerMessage },
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
				if (this.question.extra && this.question.extra.options) {
					return 'options'
				}
				return 'input'
			}
		},
		methods: {
			submitAnswer() {
				QuizClient.submitAnswer(this.answer)
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

			<div v-if="mode === 'options'" class="options">
				<label
					class="box" v-for="(option, i) in question.extra.options"
					:key="`option_${i}`"
					:class="{selected: answer === option, notSelected: answer !== '' && answer !== option}"
				>
					<input type="radio" v-model="answer" :value="option" />
					<span>{{ option }}</span>
				</label>
			</div>

			<div v-if="mode === 'input'"><input class="answer" v-model="answer" /></div>

			<button @click="submitAnswer">Submit</button>
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
