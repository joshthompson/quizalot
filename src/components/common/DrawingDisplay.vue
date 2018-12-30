<script>
	export default {
		props: ['drawing'],
		data() {
			return {
				type: null,
				path: [],
				size: 280
			}
		},
		mounted() {
			if (this.drawing.substr(0, 2) === 'm:') {
				this.type = 'path'
				this.path = this.drawing.split(',').map(s => s.split(':'))
				this.drawPath()
			} else {
				this.type = 'gif'
			}
		},
		computed: {
			ctx() {
				return this.$refs.canvas.getContext('2d')
			},
			style() {
				return {
					width: `${this.size}px`,
					height: `${this.size}px`
				}
			}
		},
		methods: {
			drawPath() {
				this.ctx.beginPath()
				this.path.forEach(p => {
					if (p[0] === 'm') {
						this.ctx.moveTo(parseFloat(p[1]), parseFloat(p[2]))
					} else {
						this.ctx.strokeStyle = '#000000'
						this.ctx.lineWidth = 3
						this.ctx.lineTo(parseFloat(p[0]), parseFloat(p[1]))
						this.ctx.stroke()
					}
				})
			}
		}
	}
</script>

<template>
	<div class="drawing-display">
		<canvas v-show="type === 'path'" ref="canvas" :width="size" :height="size" :style="style"></canvas>
		<img v-if="type ==='gif'" :src="drawing" :style="style" />
	</div>
</template>

<style scoped>
	canvas, img {
		width: 300px;
		height: 300px;
		background: white;
		cursor: default;
	}
</style>
