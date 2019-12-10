<template>
	<view class="black">
		<image :src="cover"
		 mode="widthFix"
		 @longpress="action"
		 ></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cover:''
			};
		},
		onLoad(params) {
			var cover = params.cover;
			this.cover = cover;
			uni.setNavigationBarColor({
				frontColor:"#ffffff",
				backgroundColor:'#000000'
			})
		},
		methods:{
			action(){
				var that = this;
				uni.showActionSheet({
					itemList:[' 保存图片到本地','点击更换','上传图片'],
					success(res) {
						if(res.tapIndex ==0){
							uni.showLoading({
								title:'图片保存中。。。'
							})
							uni.downloadFile({
								url:that.cover,
								success(result) {
									var tempFliePath = result.tempFilePath
									uni.saveImageToPhotosAlbum({
										filePath:tempFliePath,
										success() {
											uni.showToast({
												title:'保存成功',
												duration:2000
											})
										},
										complete() {
											uni.hideLoading()
										}
									})
								}
							})
							
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.black{
		width:100%;
		height: 100%;
		background:#000000;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: fixed;
	}
	.black image{
		width: 100%;
		height: 100%;
		align-self: center;
	}
</style>
