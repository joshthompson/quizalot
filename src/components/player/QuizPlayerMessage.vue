<template>
	<div class="quiz-player-message">
		<div class="inner">
			<slot></slot>
		</div>
	</div>
</template>

<style scoped>
	.quiz-player-message {
		/* height: 100vh; */
	}
	.quiz-player-message .inner {
		/* margin-top: 50vh;
		transform: translateY(-50%); */
		font-size: 1.5rem;
		padding: 1rem;
	}
</style>
