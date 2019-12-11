<template>
	<view class="page">
		<view class="input">
			<input type="text" value="" placeholder="星海" />
			<image src="../../static/icos/search.png" class="search"></image>
		</view>
		<view class="contactList">
			<view class="cc">
				c
			</view>
			<view class="contactPerson">
				<view class="contactPersonList">
					<image src="../../static/icos/108x108.png" class="companyImg"></image>
					<view class="contactInfo">
						<text class="contactPersonName">蔡经理</text>
						<text class="contactPersonCompany">郑州星海科技有限公司</text>
					</view>
				</view>
			</view>
			<view class="contactPerson">
				<view class="contactPersonList">
					<image src="../../static/icos/108x108.png" class="companyImg"></image>
					<view class="contactInfo">
						<text class="contactPersonName">蔡经理</text>
						<text class="contactPersonCompany">郑州星海科技有限公司</text>
					</view>
				</view>
			</view>
		</view>
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
	@import url('contact.css')
</style>
