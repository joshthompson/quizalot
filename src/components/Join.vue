<script>
	export default {
		data() {
			return {
				name: 'josh',
				code: 'hoho'
			}
		},
		methods: {
			join() {
				this.$emit('join', {
					name: this.name,
					code: this.code
				})
			}
		}
	}
</script>

<template>
	<div>
		<h1>Quiz Lobby</h1>
		<h2>Type in the code</h2>

		<div>
			<span>Name:</span>
			<input type="text" v-model="name" placeholder="Your name..." />
		</div>

		<div>
			<span>Code:</span>
			<input type="text" v-model="code" placeholder="Room code..." />
		</div>

		<button @click="join">Join</button>
	</div>
</template>

<style scoped>
</style>
