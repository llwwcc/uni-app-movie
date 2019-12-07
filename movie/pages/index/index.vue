<template>
	<view class="page ">
		<!-- 轮播图开始 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
			class="swiper"
		>
			<swiper-item class="swiper-item" v-for="(carousel,index) in carouselList" :key="index">
				<image :src="carousel.image" ></image>
			</swiper-item >
		<!-- 	<swiper-item class="swiper-item">
				<image src="../../static/carousel/spiderman.png" ></image>
			</swiper-item>
			<swiper-item class="swiper-item">
				<image src="../../static/carousel/batmanvssuperman.png" ></image>
			</swiper-item> -->
		</swiper>
		<!-- 轮播图结束 -->
		
		<!-- 超英预告开始 -->
		<view class="supero">
			<view class="hot">
				<view class="icon">
					<image src="../../static/icos/hot.png" mode=""></image>
				</view>
				<view class="text">超英预告</view>
			</view>
			<scroll-view scroll-x="true" class="pageScroll">
				<view class="posterList" v-for="(item,index) in swiperList" :key="index">
					<view class="posterImg">
						<image :src="item.cover"></image>
					</view>
					<view class="posterDes">{{item.name}}</view>
					<!-- <view class="xingxing">
						<image src="../../static/icos/star-yellow.png"></image>
						<image src="../../static/icos/star-yellow.png"></image>
						<image src="../../static/icos/star-yellow.png"></image>
						<image src="../../static/icos/star-yellow.png"></image>
						<image src="../../static/icos/star-gray.png" ></image>
						<view class="fenshu">9.1</view>
					</view> -->
					<Start :innerScore='item.score' showNum ='1'></Start>
				</view>
			</scroll-view>
			<view class="hot">
				<view class="icon">
					<image src="../../static/icos/guess-u-like.png" mode=""></image>
				</view>
				<view class="text">热门视频</view>
			</view>
			<view class="vido">
				<video 
				v-for="trailer in hotVido"
				:src="trailer.trailer"
				:poster="trailer.cover"
				class="video"></video>
			</view>
		</view>
		
		<!-- 超英预告结束 -->
		<!-- 猜你喜欢开始 -->
		<view class="hot">
			<view class="icon">
				<image src="../../static/icos/guess-u-like.png" mode=""></image>
			</view>
			<view class="text">猜你喜欢</view>
		</view>
	
			<view class="likeMovie">
				<image src="../../static/carousel/batmanvssuperman.png" mode=""></image>
				<view class="movie-Info">
					<view class="movieTitle">蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠</view>
					<Start :innerScore='8' showNum ='0'></Start>
					<view class="movieInfo">
						2018年上映的电影
					</view>
					<view class="movieInfo">
						主演小米	
					</view>
				</view>
				<view class="dainzan" @click="clickAdd">
					<image src="../../static/icos/praise.png" mode=""></image>
					<view class="paress">赞一下</view>
					<view :animation="animationData "  class="paressadd">+1</view>
				</view>
				
				
			</view>
	
		
		<!-- 猜你喜欢结束 -->
		
		
		
		
	</view>
</template>

<script>
	import api from '../../common/common.js'
	import Start from '../../components/start.vue'
	export default {
		components:{Start},
		data() {
			return {
				carouselList:[],
				swiperList:[],
				hotVido:[],
				animationData:{}
			}
		},
		onUnload() {
			// 页面卸载是清空动画
			this.animationData = {}
		},
		onLoad() {
			// 创建临时动画
			this.animation=uni.createAnimation({
				
			})
			
			
			var that =this;
			const Api =api.api
			const QQ = api.qq
			// 请求轮播图
			uni.request({
			    url:Api+'/index/carousel/list?qq='+QQ, //仅为示例，并非真实接口地址。
				method:"POST",
			    success: (res) => {
					if(res.data.status ==200){
						var carouselList =res.data.data
						 that.carouselList =carouselList
					
					}
			    }
			});
			// 请求超英列表
			uni.request({
			    url:Api+'/index/movie/hot?type=superhero&qq='+QQ, //仅为示例，并非真实接口地址。
				method:"POST",
			    success: (res) => {
					if(res.data.status ==200){
						var swiperList =res.data.data
						 that.swiperList =swiperList
					}
			    }
			});
			// 请求热门视频
			uni.request({
			    url:Api+'/index/movie/hot?type=trailer&qq='+QQ, //仅为示例，并非真实接口地址。
				method:"POST",
			    success: (res) => {
					if(res.data.status ==200){
						var hotVido =res.data.data
						 that.hotVido =hotVido
						
					}
			    }
			});
			
			
		},
		methods: {
			// 实现点赞动画
			clickAdd(){
				this.animation.translateY(-60).opacity(1).step({duration:400})
				this.animationData=this.animation.export()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import url('index.css')
</style>
