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
			}
		},
		methods: {
			submitAnswer() {
				QuizClient.submitAnswer(this.answer)
			}
		}
	}
</script>

<template>
	<div>
		<QuizPlayerHeader />
		<div class="submit" v-if="state === '...'">
			<div><input class="answer" v-model="answer" /></div>
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
</style>
