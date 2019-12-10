<template>
	<view class="page">
		<view class="video">
			<video
			 id="myTrailer"
			:src="info.trailer"
			:poster="info.poster"
			></video>
		</view>
		<view class="movieInfo">
			<!-- 把信息传递到下个页面 -->
			<navigator :url="'../cover/cover?cover='+info.cover">
				<image :src="info.cover" class="poster"></image>
			</navigator>
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
		onReady() {
			this.videoContext =uni.createVideoContext('myTrailer')
		},
		onHide() {
			// 离开页面暂停视频
			this.videoContext.pause();
		},
		onShow() {
			// 进入页面播放视频
			if(this.videoContext){
				this.videoContext.play();
			}
			
		},
		onShareAppMessage(res){
			var that = this;
			return{
				title:that.info.name,
				path:'./pages/movie/movie?trailerId='+that.info.id
			}
		},
		// 监听导航栏的按钮事件
		onNavigationBarButtonTap(e) {
			var index =e.index
			var that = this;
			var trailerInfo =that.info;
			var trailerId = trailerInfo.id;
			var trailerName = trailerInfo.name;
			var cover = trailerInfo.cover;
			var poster = trailerInfo.poster;
			//http://www.imovetrailer.com/#/pages/movie/movie/?trailerId="+trailerId
			if(index ==0){
				uni.share({
				    provider: "weixin",
				    scene: "WXSenceTimeline",
				    type: 0,
				    href: "http://www.imovetrailer.com/#/pages/movie/movie/?trailerId="+trailerId,
				    title: "超英预告",
				    summary: trailerName,
				    imageUrl: cover,
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    }
				});
			}
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
