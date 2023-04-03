<template>
	<view class="search-box"  @click="toSearch">
		<view class="iconfont icon-search"></view>
		<view>请搜索相关的关键字</view>
	</view>
</template>

<script setup>
import {defineProps} from "vue";
const props = defineProps({
	classBg:String,
	title:String
})
function toSearch(){
		uni.navigateTo({
			url:"/subPages/Search/Search"
		})
}
</script>

<style lang="scss" scoped>

	.search-box {
		margin:10rpx 30rpx;
		padding: 20rpx 10rpx;
		display: flex;
		background-color: white;
		border-radius: 30upx;
		line-height: 20rpx;
		&>view{
			font-size: 20rpx;
			margin-left: 5rpx;
			transform: scale(0.9);
		}
	}
</style>
