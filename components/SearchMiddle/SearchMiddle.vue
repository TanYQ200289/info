<template>
	<view class="search-content">
		<view class="search-box" @click="toSearch">
			<text class="iconfont icon-search"></text>&nbsp;
			<text>搜索商品</text>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps
	} from "vue";
	const props = defineProps({
		mark: String
	})
	function toSearch() {
		if (props.mark === "class") {
			uni.navigateTo({
				url: "/subPages/Search/Search"
			})
		} else {
			uni.navigateBack({
				delta: 1
			});
		}
	}
</script>

<style lang="scss" scoped>
	.search-content {
		padding: 30rpx 20rpx;
		background-color: white;
	}

	.search-box {
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.8);
		width: 100%;
		height: 60rpx;
		text-align: center;
		color: v;
		line-height: 30px;
		border-radius: 30rpx;
		background-color: #eeee;

	}
</style>
