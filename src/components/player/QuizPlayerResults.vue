<script>
	import QuizPlayerHeader from '~/components/player/QuizPlayerHeader.vue'
	import QuizPlayerMessage from '~/components/player/QuizPlayerMessage.vue'
	export default {
		components: { QuizPlayerHeader, QuizPlayerMessage }
	}
</script>

<template>
	<div>
		<QuizPlayerHeader />
		<QuizPlayerMessage>Waiting...</QuizPlayerMessage>
	</div>
</template>
