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
				class="video"
				:id="trailer.id"
				:data-playIndex='trailer.id'
				@play="mePlaying"
				></video>
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
	
			<view class="likeMovie"  v-for="(guessLike,gIndex) in guessULike" :key="gIndex">
				<image :src="guessLike.cover" ></image>
				<view class="movie-Info">
					<view class="movieTitle">{{guessLike.name}}</view>
					<Start :innerScore='guessLike.score' showNum ='0'></Start>
					<view class="movieInfo">
						{{guessLike.basicInfo}}
					</view>
					<view class="movieInfo">
						{{guessLike.releaseDate}}
					</view>
				</view>
				<view class="dainzan" :data-gIndex='gIndex' @click="press">
					<image src="../../static/icos/praise.png" mode=""></image>
					<view class="paress">赞一下</view>
					<view :animation="animationDataArray[gIndex] "  class="paressadd">+1</view>
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
				animationData:{},
				animationDataArray:[
					{},{},{},{}
				],
				guessULike:[],
				
			}
		},
		onUnload() {
			// 页面卸载是清空动画
			this.animationData = {},
			this.animationDataArray=[
				{},{},{},{}
			]
		},
		onPullDownRefresh() {
			this.refresh()
		},
		onHide() {
			if(this.videoContext){
				this.videoContext.pause()
			}
		},
		onLoad() {
			// 创建临时动画
			
			//  #ifdef APP-PLUS || MP-WEIXIN
			this.animation=uni.createAnimation({
				
			})
			// #endif
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
			// 查询猜你喜欢
			that.refresh()
			
		},
		methods: {
			// 播放一个视频时,暂停另一个视频
			mePlaying(e){
				var that = this;
				var trailerId=""
				// console.log(e)
				if(e){
					trailerId =e.currentTarget.dataset.playindex;
					that.videoContext = uni.createVideoContext(trailerId)
				}
				var hotVido =that.hotVido;
				for(var i =0;i<hotVido.length;i++){
					var tempId =hotVido[i].id;
					if(tempId !=trailerId){
						uni.createVideoContext(tempId).pause()
					}
				}
			},
			// 实现点赞动画
			refresh(){
				uni.showLoading({
					title:"正在拼命加载中...",
					mask:true
				})
				var that =this;
				const Api =api.api
				const QQ = api.qq
				uni.request({
				    url:Api+ '/index/guessULike?qq='+ QQ, //仅为示例，并非真实接口地址。
					method:"POST",
				    success: (res) => {
						if(res.data.status ==200){
							var guessULike =res.data.data
							 that.guessULike =guessULike
						}
				    },
					complete:()=>{
						uni.stopPullDownRefresh();
						uni.hideLoading()
					}
				});
			},
			
			press(e){
				var gIndex = e.currentTarget.dataset.gindex;
				// #ifdef APP-PLUS || MP-WEIXIN
				this.animation.translateY(-60).opacity(1).step({duration:400})
				
				// this.animationData=this.animation.export()
				 this.animationData=this.animation
				 this.animationDataArray[gIndex]=this.animationData.export()
				 console.log(gIndex)
				setTimeout(function(){
					this.animation.translateY(0).opacity(0).step({duration:0})
					// this.animationData=this.animation.export()
					this.animationData=this.animation
					this.animationDataArray[gIndex]=this.animationData.export()
				}.bind(this), 500);
				//#endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import url('index.css')
</style>
