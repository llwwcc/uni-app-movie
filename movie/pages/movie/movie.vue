<template>
	<view class="page">
		<view class="video">
			<video 
			:src="info.trailer"
			:poster="info.poster"
			></video>
		</view>
		<view class="movieInfo">
			<image :src="info.cover" class="poster"></image>
			<view class="infon">
				<view class="title">{{info.name}}</view>
				<view class="des">{{info.basicInfo}}</view>
				<view class="time">{{info.releaseDate}}</view>
			</view>
		</view>
		<view class="content">
			{{info.plotDesc}}
		</view>
		<view class="Poster">
			<view class="actor">剧照</view>
			<scroll-view scroll-x="true" class="scroll" >
				<image
				v-for="(aitem,aIndex) in posterList"
				:key="aIndex"
				:src="aitem"
				 @click="lookMe"
				 :data-imgIndex="aIndex"
				  mode="aspectFill"></image>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import api from '../../common/common.js'
	export default {
		data() {
			return {
				info:'',
				posterList:[]
				
			};
		},
		onLoad(params) {
			uni.setNavigationBarColor({
				frontColor:"#ffffff",
				backgroundColor:"#000000"
			})
			// 获取上一个页面的id
			var that =this;
			var trailerId =params.trailerId
			const Api =api.api
			const QQ = api.qq
			uni.showLoading({
				title:"正在拼命加载",
				mask:true
			})
			uni.request({
			    url:Api+ '/search/trailer/'+trailerId+'?qq='+ QQ, //仅为示例，并非真实接口地址。
				method:"POST",
			    success: (res) => {
					// console.log(res.data.data)
					if(res.data.status ==200){
						console.log(res)
						var info =res.data.data
						console.log(info)
						that.info= info
						var posterList =JSON.parse(info.plotPics)
						that.posterList =posterList
						
						
					}
			    },
				complete:()=>{
					uni.stopPullDownRefresh();
					uni.hideLoading()
				}
			});
		},
		methods:{
			lookMe(e){
				var that = this;
				var imgIndex = e.currentTarget.dataset.imgindex
				uni.previewImage({
					current:that.posterList[imgIndex],
					urls:that.posterList
				})
			}
		}
	}
</script>

<style lang="scss">
	@import url('movie.css')
</style>
