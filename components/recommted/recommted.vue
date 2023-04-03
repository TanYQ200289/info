<template>
	<view class="recommted">
		<view class="recommted-header">
			<h4>{{title}}</h4>
			<view class="more">
				<text>更多
				</text>
				<uni-icons
				 class="more-icons" type="arrow-right" size="16" color="silver"></uni-icons>
			</view>
		</view>
		<view class="show-images">
			<view class="show-images-big">
				<image class="big-image" src="../../static/index/big1.png" ></image>
			</view>
			<view class="show-images-small">
				<view class="show-images-small-item">
					<image class="small-image" src="../../static/index/small1.jpg"></image>
				</view>
				<view class="show-images-small-item">
					<image class="small-image" src="../../static/index/small2.jpg"></image>
				</view>
				<view class="show-images-small-item">
					<image  class="small-image" src="../../static/index/small3.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import {defineProps} from "vue";
const props = defineProps({
	title:{
		type:String,
		require:true
	}
})

</script>

<style lang="scss" scoped>
.recommted{
	padding: 20rpx 20rpx;
	background-color: white;
	&-header{
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
		.more {
			display: flex;
			font-size: 24rpx;
			color: silver;
		}
	}
	.show-images{
		width: 100%;
		height: 300rpx;
		overflow: hidden;
		&-big {
			width: 100%;
			height: 150rpx;
			margin-bottom: 10rpx;
			.big-image {
				width: 100%;
				height: 100%;
			}
		}
		&-small{
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 150rpx;
			&>view:nth-child(2) {
				margin: 0 10rpx;
			}
			&-item{
				flex: 1;
				height: 100%;
				.small-image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
}
</style>