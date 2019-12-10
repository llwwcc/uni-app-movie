<template>
	<view class="black">
		<image src="http://122.152.205.72:88/superhero/MARVEL/Venom/cover.png" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.black{
		width:100%;
		height: 100%;
		background:#333333;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: fixed;
	}
	.black image{
		width: 100%;
		height: 100%;
	}
</style>
