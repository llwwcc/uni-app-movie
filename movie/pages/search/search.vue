<template>
	<view class="page">
		<view class="search">
			<image src="../../static/icos/search.png"></image>
			<input type="text" 
			  placeholder="搜索预告" 
			  maxlength="10"
			  confirm-type="search"
			  @confirm="search"
			  />
		</view>
		<view class="movieList">
			<view class="movieListImg"  
			v-for="(mItem,mIndex) in movieList" 
			:key="mIndex"
			
			>
				<image :src="mItem.cover"
					:data-trailerId='mItem.id'
					@click="showTrailer "
				></image>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	import api from '../../common/common.js'
	export default {
		data() {
			return {
				movieList:[],
				keywords:'',        //搜索关键字
				page:1,				//默当前第几页
				totalPage:1			//总共页数
			};
		},
		onLoad() {
			uni.showLoading({
				title:"正在拼命加载中...",
				mask:true
			})
			var that =this;
			const Api =api.api
			const QQ = api.qq
			uni.request({
			    url:Api+ '/search/list?keywords=&page=&pageSize=&qq='+ QQ, //仅为示例，并非真实接口地址。
				method:"POST",
			    success: (res) => {
					if(res.data.status ==200){
						var movieList =res.data.data.rows
						 that.movieList =movieList
					}
			    },
				complete:()=>{
					uni.stopPullDownRefresh();
					uni.hideLoading()
				}
			});
		},
		onReachBottom() {
			var that = this;
			var page = that.page+1;
			var keywords =that.keywords;
			var totalPage = that.totalPage;
			if(page > totalPage){
				return
			}
			that.pageMovieList(keywords,page,15)
		},
		
		methods:{
			showTrailer(e){
				var trailerId = e.currentTarget.dataset.trailerid;
				uni.navigateTo({
					// 页面跳转api
					url:'../movie/movie?trailerId='+trailerId
				})
					
			},
			pageMovieList(keywords,page,pageSize){
				uni.showLoading({
					title:"正在拼命加载中...",
					mask:true
				})
				var that =this;
				const Api =api.api
				const QQ = api.qq
				uni.request({
				    url:Api+ '/search/list?keywords='+keywords+'&page='+page+'&pageSize='+pageSize+'&qq='+ QQ, //仅为示例，并非真实接口地址。
					method:"POST",
				    success: (res) => {
						if(res.data.status ==200){
							var tempList =res.data.data.rows
							 that.movieList =that.movieList.concat(tempList);
							 var totalPage = res.data.data.total; // 获取总共页数
							 that.page=page    //覆盖当前页面的page
							 that.totalPage =totalPage;
						}
				    },
					complete:()=>{
						uni.stopPullDownRefresh();
						uni.hideLoading()
					}
				});
			},
			search(e){
				var that =this
				// 获取搜所框的内容
				var value = e.detail.value;
				console.log(value)
				that.keywords =value;
				// 做分页 清空原有的数据
				that.movieList=[];
				that.pageMovieList(value,1,15)
				
			}
		}
	}
</script>

<style lang="scss">
	@import url("search.css")
</style>
