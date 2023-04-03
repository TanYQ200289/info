<template>
	<view class="goods-box-item" @click="toDetailsPage(goodObj.gid)">
		<view class="goods-image">
			<image  class="image" :src="goodObj.image.serverName+goodObj.image.displayimg" ></image>
		</view>
		<view class="goods-content">
			<view class="goods-content-titlt">{{goodObj.message}}</view>
			<view class="goods-content-price">
				<text class="price-money">￥{{goodObj.price}}</text>&nbsp;
			</view>
		</view>
	</view>
</template>

<script setup>
import {defineProps} from "vue";
const props = defineProps({
	goodObj:Object
})
function toDetailsPage(id){
	uni.navigateTo({
		url: `/subPages/Details/Details?id=${id}`
	});
}
</script>

<style lang="scss" scoped>
.goods-box-item{
	margin: 10rpx;
	width: 355rpx;
	height: 600rpx;
	background-color: white;
	.goods-image{
		width: 100%;
		height: 450rpx;
		.image {
			width: 100%;
			height: 100%;
		}

	}
	.goods-content{
		display: flex;
		padding: 0 10rpx;
		flex-direction: column;
		height: 150rpx;
		justify-content: space-around;
		&-titlt{
			width: 100%;
		    word-break: break-all;
		    text-overflow: ellipsis;
		    display: -webkit-box;
		    -webkit-box-orient: vertical;
		    -webkit-line-clamp: 2; /* 这里是超出几行省略 */
		    overflow: hidden;
			color: rgb(0,0,0,0.6);
			font-size: 30rpx;
		}
		.price-money{
			color: crimson;
		}
		.discount-money{
			font-size: 24rpx;
			color: silver;
			text-decoration: line-through;
		}
	}
}
</style>