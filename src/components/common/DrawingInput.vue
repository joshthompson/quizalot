<script>
	export default {
		props: ['value'],
		data() {
			return {
				down: false,
				drawing: []
			}
		},
		created() {
			this.clear()
		},
		computed: {
			ctx() {
				return this.$refs.canvas.getContext('2d')
			}
		},
		methods: {
			clear() {
				if (this.$refs.canvas) {
					this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)
					this.ctx.beginPath()
					this.drawing = []
				}
			},
			pos(event) {
				const rect = this.$refs.canvas.getBoundingClientRect()
				return {
					x: event.clientX - rect.left,
					y: event.clientY - rect.top
				}
			},
			mousedown(event) {
				this.down = true
				const pos = this.pos(event)
				this.moveTo(pos.x, pos.y)
			},
			end(event) {
				this.down = false
			},
			mousemove(event) {
				if (this.down) {
					const pos = this.pos(event)
					this.lineTo(pos.x, pos.y)
				}
			},
			moveTo(x, y) {
				this.ctx.moveTo(x, y)
				this.drawing.push(`m:${x}:${y}`)
			},
			lineTo(x, y) {
				this.ctx.strokeStyle = '#000000'
				this.ctx.lineWidth = 3
				this.ctx.lineTo(x, y)
				this.drawing.push(`${x}:${y}`)
				this.ctx.stroke()
			},
			submit() {
				const gif = this.$refs.canvas.toDataURL('image/gif')
				const path = this.drawing.join(',')
				this.$emit('input', gif.length <= path.length ? gif : path)
			},
			touchstart(event) {
				this.moveTo(
					event.touches[0].clientX,
					event.touches[0].clientY
				)
			},
			touchmove(event) {
				this.lineTo(
					event.touches[0].clientX,
					event.touches[0].clientY
				)
			}
		}
	}
</script>

<template>
	<div class="drawing-box">
		<canvas
			ref="canvas"
			width="300"
			height="300"

			@mousedown="mousedown"
			@mousemove="mousemove"
			@mouseup="end"
			@mouseleave="end"

			@touchstart="touchstart"
			@touchmove="touchmove"
			@touchend="end"
			@touchcancel="end"

		></canvas>
		<div>
			<button @click="clear">Clear</button>
			<button @click="submit">Submit</button>
		</div>
	</div>
</template>

<style scoped>
	canvas {
		width: 300px;
		height: 300px;
		background: white;
		cursor: default;
	}
</style>
