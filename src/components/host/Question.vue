<script>
	export default {
		props: ['number', 'question']
	}
</script>

<template>
	<div class="question">
		<h2>Question {{ number }}</h2>
		<h3 v-if="question.text">{{ question.text }}</h3>
		<img v-if="question.image" class="question-image" :src="question.image" />
	</div>
</template>

<style scoped>
	.question {
		flex-grow: 1;
		font-size: 32px;
	}

	.question h2 {
		font-size: 2em;
	}

	.question h3 {
		font-size: 1.5em;
	}

	.question .question-image {
		width: 700px;
	}
</style>
