<script>
	export default {
		props: ['question', 'showAnswer']
	}
</script>

<template>
	<div class="question">
		<div v-if="question.text" class="question-text">
			<div>{{ question.text }}</div>
			<div v-if="showAnswer" class="correct-answer box">{{ question.answer }}</div>
		</div>
		<div v-if="question.extra">
			<img v-if="question.extra.image" class="question-image" :src="question.extra.image" />
			<ul v-if="question.extra.options" class="question-options">
				<li v-for="(option, i) in question.extra.options" :key="`option_${i}`" class="box">{{ option }}</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>


	.correct-answer {
		border: 2px solid #000000;
		font-size: 2rem;
		text-transform: uppercase;
	}

	.question {
		flex-grow: 1;
		font-size: 32px;
		display: flex;
		font-size: 1.5em;
	}

	.question > * {
		flex-grow: 1;
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 1rem;
	}

	.question-options {
		padding: 0;
	}

	.question-options li.box {
		text-align: center;
		display: block;
		font-size: 1.25em;
	}

	.question-text {
		font-size: 1.5em;
	}

	.question-image {
		max-width: 100%;
	}
</style>
