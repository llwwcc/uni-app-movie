<template class="start">
	<view class="xingxing">
		<!-- <image src="../../static/icos/star-yellow.png"></image>
		<image src="../../static/icos/star-yellow.png"></image>
		<image src="../../static/icos/star-yellow.png"></image>
		<image src="../../static/icos/star-yellow.png"></image>
		<image src="../../static/icos/star-gray.png" ></image>
		<view class="fenshu">9.1</view> -->
		
		<image 
		 v-for="(yellow,yInd) in yellowScore" :key="yInd"
		src="../../static/icos/star-yellow.png"
		 ></image>
		<image 
		 v-for="gray in grayScore" 
		src="../../static/icos/star-gray.png"
		 ></image>
		 <view class="fenshu" v-if="showNum ==1">
			 {{innerScore}}
		 </view>
	</view>
</template>

<script>
	export default {
		name:'start',
		data() {
			return {
				yellowScore:0,
				grayScore:5
			};
		},
		props:{
			innerScore:0,        // 外部传入的分数值
			showNum:0            //是否显示具体的分数 1是显示 0不显示
		},
		created() {
			var tempScore =0;
			if(this.innerScore !==null && this.innerScore !==undefined && this.innerScore !==''){
				tempScore=this.innerScore
			}
			var yellowScore = parseInt(tempScore/2)
			var grayScore = 5 -yellowScore
			
			this.yellowScore =yellowScore;
			this.grayScore = grayScore;
			
		}
	}
</script>

<style lang="scss">
	.xingxing{
		margin-top: 10upx;
		display: flex;
		flex-direction: row;
	}
	.xingxing image{
		width:20upx;
		height: 20upx;
		vertical-align: middle;
	}
	.xingxing .fenshu{
		font-size: 14px;
		margin-left: 6upx;
	}
</style>
