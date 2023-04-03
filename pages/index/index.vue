<template>
	<view class="content">
		<Search></Search>
		<!--轮播图区域-->
		<swiper class="swiper" circular indicator-dots :indicator-dots="indicatorDots" autoplay :interval="5000"
			:duration="500">
			<swiper-item>
				<view class="swiper-item">
					<image class="swiper-image" src="../../static/index/swiper1.png"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image class="swiper-image" src="../../static/index/swiper2.png"></image>
				</view>
			</swiper-item>
		</swiper>
		<!--notice-->
		<view class="notice">
			<view class="laba">
				<uni-icons type="sound-filled" size="24" color="orange"></uni-icons>
			</view>
			<view class="notice-text-box">
				<view class="text">牛马科技 这只是一个演示项目（请勿下单）</view>
			</view>
		</view>
		<!---icon导航栏-->
		<view class="nav-icon">
			<view class="nav-icon-item">
				<view class="nav-icon-item-image">
					<image src="../../static/index/4.png" mode="aspectFit"></image>
				</view>
				<view>居家生活</view>
			</view>
			<view class="nav-icon-item">
				<view class="nav-icon-item-image">
					<image src="../../static/index/1.png" mode="aspectFit"></image>
				</view>
				<view>手机数码</view>
			</view>
			<view class="nav-icon-item">
				<view class="nav-icon-item-image">
					<image src="../../static/index/3.png"></image>
				</view>
				<view>领卷中心</view>
			</view>
			<view class="nav-icon-item">
				<view class="nav-icon-item-image">
					<image src="../../static/index/2.png"></image>
				</view>
				<view>户外运动</view>
			</view>
		</view>
		<!--店长推荐-->
		<Recommted title="店长推荐"></Recommted>
		<!--大图-->
		<view class="image-big-box">
			<image class="image-big-box-img" src="../../static/index/big.png"></image>
		</view>
		<!--热门推荐
		<Recommted title="热门推荐"></Recommted>
		-->

		<!--商品list-->
		<Title title="居家首选"></Title>
		<view class="goods-list">
			<GoodsCard v-for="item in goodList" :key="item.goodscode" :goodObj="item"></GoodsCard>
		</view>
	</view>
</template>

<script setup>
	import Search from "../../components/Search/Search.vue";
	import Recommted from "../../components/recommted/recommted.vue";
	import Title from "../../components/Title/Title.vue";
	import GoodsCard from "../../components/GoodsCard/GoodsCard.vue";
	import {
		reactive,toRefs
	} from "vue";
	import {onLoad,onReachBottom} from "@dcloudio/uni-app";
	onLoad(()=>{
		//请求首页数据
		getIndexGoodsRequst()
	
	})
	
	//商品数据
	const {goodList} = toRefs(reactive({goodList:[]}));
	//首页数据接口
	async function getIndexGoodsRequst(){
		const {data} = await uni.Http("/goods/allGoods","get");
		goodList.value.push(...data);
	}
</script>

<style scoped lang="scss">
	page {

		overflow: hidden;
		overflow-x: hidden;
		background-color: rgba(238, 238, 238, 0.3);
	}

	@keyframes textAnimation {
		0% {
			left: 100%;
		}

		100% {
			left: -100%;
		}
	}

	.content {
		width: 100%;

		/*轮播图样式*/
		.swiper {
			height: 300rpx;

			.swiper-item {
				background-color: white;
				display: block;
				height: 300rpx;
				line-height: 300rpx;
				text-align: center;

				.swiper-image {
					width: 100%;
					height: 100%;
				}
			}
		}

		/*广告样式*/
		.notice {
			display: flex;
			align-items: center;
			width: 100%;
			height: 30px;
			background-color: rgba(255, 255, 0, 0.3);
			padding: 0 15rpx;

			&>.notice-text-box {
				position: relative;
				flex: 1;
				color: orange;
				overflow: hidden;

				.text {
					position: relative;
					left: 0;
					animation: textAnimation 10s linear 0s infinite;
				}
			}
		}

		//icon导航栏
		.nav-icon {
			display: flex;
			justify-content: space-around;
			background-color: white;
			padding: 20rpx 0;
			font-size: 30rpx;
			font-weight: 500;
			color: rgba(0, 0, 0, 0.6);

			&-item {
				display: flex;
				width: 150rpx;
				height: 150rpx;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				&-image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 30rpx;
					margin-bottom: 5rpx;
				}

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		//大图片盒子
		.image-big-box {
			width: 100%;
			height: 200rpx;

			.image-big-box-img {
				width: 100%;
				height: 100%;
			}
		}

		//商品列表
		.goods-list {
			display: flex;
			flex-wrap: wrap;
		}
	}
</style>
