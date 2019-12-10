<template>
	<view class="page page-fill">
		<view class="header">
			<!-- 头像 -->
			<view v-if="userIsLogin">
				<image :src="userInfo.faceImage" class="face"></image>
			</view>
			<view v-else>
				<image src="../../static/icos/default-face.png" class="face"></image>
			</view>
			
			<!-- 用户名称 -->
			<view class="info-wrapper" v-if="userIsLogin">
				<view class="nickname">
					{{ userInfo.nickname }}
				</view>
				<view class="nav-info">
					ID: {{ userInfo.id }}
				</view>
			</view>
			<view v-else>
				<navigator url="../registLogin/registLogin">
					<view class="nickname regist-login">
						注册/登录
					</view>
				</navigator>
			</view>
			
			<!-- 设置 -->
			<view class="set-wrapper" v-if="userIsLogin" @click="setting">
				<image src="../../static/icos/settings.png" class="settings"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userIsLogin: false,
				userInfo: {}
			}
		},
		methods: {
			setting() {
				uni.navigateTo({
					url: '../meInfo/meInfo'
				});
			}
		},
		onShow() {
			// 进入页面判断用户是否登录
			var that = this;
			// var userInfo  =uni.getStorageSync("globalUser")
			// if(userInfo != null && userInfo != "" && userInfo !=undefined){
			// 	that.userIsLogin = true;
			// 	that.userInfo = userInfo;
			// 	// console.log(that.userInfo)
			// }else{
			// 	that.userIsLogin = false;
			// 	that.userInfo = {};
			// }
			
			// 利用全局挂载得到unserInfo
			var userInfo  =that.GetUserIfo("globalUser")
			if(userInfo != null ){
				that.userIsLogin = true;
				that.userInfo = userInfo;
				// console.log(that.userInfo)
			}else{
				that.userIsLogin = false;
				that.userInfo = {};
			}
				
			
		}
	}
</script>

<style lang="scss" scoped>
	@import url('me.css')
</style>
