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
			<view class="icon">
				<image src="../../static/icos/hot.png" mode=""></image>
			</view>
			<view class="text">超英预告</view>
		</view>
		
		
		<!-- 超英预告结束 -->
	</view>
</template>

<script>
	import api from '../../common/common.js'
	export default {
		data() {
			return {
				carouselList:[]
			}
		},
		onLoad() {
			var that =this;
			const Api =api.api
			const QQ = api.qq
			uni.request({
			    url:Api+'/index/carousel/list?qq='+QQ, //仅为示例，并非真实接口地址。
				method:"POST",
			    success: (res) => {
					if(res.data.status ==200){
						var carouselList =res.data.data
						 // console.log(carouselList);
						 that.carouselList =carouselList
					}
			    }
			});
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	@import url('index.css')
</style>
