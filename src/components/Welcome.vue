<script>
	export default {
		methods: {
			create() {
				this.$emit('create')
			},
			join() {
				this.$emit('join')
			}
		}
	}
</script>

<template>
	<div class="hello">
		<h1>Welcome to the Quiz</h1>

		<button @click="create">Start Quiz</button>
		<button @click="join">Join Quiz</button>
	</div>
</template>

<style scoped>
	h3 {
		margin: 40px 0 0;
	}
</style>
