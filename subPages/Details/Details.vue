<template>
	<view>
		<swiper class="swiper" circular indicator-dots=autoplay autoplay :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in goodDetails.images" :key="item.iid" @click="preImageHanlder(index)">
				<view class="swiper-item uni-bg-red">
					<image class="swiper-image" :src="item.serverName+item.displayimg" mode="widthFix"></image>
				</view>
			</swiper-item>
		</swiper>
		<!--商品标题-->
		<view class="goods-detail-content">
			<view class="goods-price-box">
				<view class="price">
					￥{{goodDetails.price}}
				</view>
				<view class="sell">
					已售{{goodDetails.salesvolume}}件
				</view>
			</view>
			<view class="goods-title-box">
				<view class="description">
					{{goodDetails.message}}
				</view>
				<view class="goods-share">
					<uni-icons type="paperplane" size="30"></uni-icons>
					<text>分享</text>
				</view>
			</view>
		</view>
		<!--选择商品类型模块-->
		<view class="select-content">
			<view class="select-left">
				<view>选择：</view>
				<view>颜色</view>
			</view>
			<view class="select-right">
				<uni-icons type="forward" size="15"></uni-icons>
			</view>
		</view>
		<!--商家服务信息模块-->
		<view class="shop-service">
			<view class="select-left">
				<view>
					<text class="iconfont icon-quangou"></text>七天无理由退货
				</view>
				<view>
					<text class="iconfont icon-quangou"></text>20小时发货
				</view>
			</view>
			<view class="select-right">
				<uni-icons type="forward" size="15"></uni-icons>
			</view>
		</view>
		<!--商品详情信息-->
		<view class="goods-description-box">
			<view class="good-title-detail">商品详情</view>
				
			<view v-if="goodDetails.describeimgs && goodDetails.describeimgs.length">
				<rich-text
				 class="image-details-node" v-for="(item,index) in goodDetails.describeimgs" :key="index"
				 :nodes="`<img  src='${item.serverName+item.address}' style='width:100%;'/>`"></rich-text>
			</view>
		<view v-else>
			
			<u-empty
			        mode="car"
			        icon="http://cdn.uviewui.com/uview/empty/d.png"
			>
			</u-empty>
		</view>
		</view>
		<view class="goods-carts">
			<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
				@buttonClick="buttonClick(goodDetails,$event)" />
		</view>
		<u-modal :show="show" title="警告" content='该网站为演示项目无法下单' @confirm="show = !show"></u-modal>
	</view>


</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		ref,
		reactive
	} from "vue";

	import {
		buttonGroupUtils
	} from "../../uitls/details.js";
	import {
		useShopCar
	} from "../../store/shopCar.js";
	import {
		useUserInfo
	} from "../../store/index.js";
	const show = ref(false)
	//使用徽标hook
	//userStore
	const useInfoStore = useUserInfo();
	//购物车pinia
	const carStore = useShopCar();
	const goodDetails = ref({});
	const gid = ref("");
	const preImageUrls = ref();
	onLoad(({
		id
	}) => {

		gid.value = id;
		getGoodDetailsRequst((id));
		//初始化details购物车info
		options[1].info = carStore.countCarNumber;

	})

	async function getGoodDetailsRequst(id) {
		const {
			data
		} = await uni.Http(`/goods/goodsMessage/${id}`, "get");
		goodDetails.value = data;
		preImageUrls.value = goodDetails.value.images.map(item => item.serverName + item.displayimg);
	}
	const options = reactive([{
		icon: 'home',
		text: '首页'
	}, {
		icon: 'cart',
		text: '购物车',
		info: ""
	}]);

	const buttonGroup = reactive(buttonGroupUtils)


	function onClick({
		index
	}) {
		if (index === 0) {
			uni.switchTab({
				url: "/pages/index/index"
			})
		} else {
			uni.switchTab({
				url: "/pages/shoppingCart/shoppingCart"
			})
		}
	}
	async function addGoodRequest() {
		if (!useInfoStore.userInfo.uid) {
			uni.showToast({
				title: '请登录后，再购买！',
				icon: "error",
				complete() {
					uni.navigateTo({
						url: "/subPages/Login/Login"
					})
				}
			});
			return;
		}
		uni.Http(`/card/addCard/${useInfoStore.userInfo.uid}/${gid.value}`, "get").then(() => {
			carStore.car.forEach((item) => {
				if (item.gid === Number(gid.value)) {
					item.goodscount++;
					options[1].info = carStore.countCarNumber
				}
			})
		})
	}

	function buttonClick(item, {
		index
	}) {
		if (index === 0) {
			addGoodRequest();
		} else {
			show.value = !show.value
		}
	}

	//轮播图预览图片
	function preImageHanlder(index) {
		uni.previewImage({
			current: index,
			urls: preImageUrls.value
		})
	}
</script>

<style lang="scss" scoped>
	.good-title-detail {
		margin-bottom: 20rpx;
		padding-bottom: 10rpx;
		border-bottom: 1px solid rgb(0, 0, 0, 0.1);
	}

	.example-body {
		padding: 0;
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}

	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}

	@mixin Detail-content {
		display: flex;
		margin: 15rpx;
		justify-content: space-between;
	}

	@mixin pointCss($bg) {
		margin-top: 20rpx;
		display: flex;
		padding: 20rpx 15rpx;
		justify-content: space-between;
		background-color: unquote($bg);
		font-size: 28rpx;

		&>.select-left {
			display: flex;

			&>view {
				margin-right: 15rpx;
			}
		}
	}

	.swiper {
		height: 550rpx;
		background-color: white;
	}

	.swiper-item {
		display: block;
		height: 100%;
		line-height: 300rpx;
		text-align: center;

		.swiper-image {
			width: 100%;
			height: 100%;
		}
	}

	page {
		background-color: #f3f3f3;
	}

	.goods-detail-content {
		width: 100%;
		padding: 5rpx 0;
		margin-top: 20rpx;
		background-color: white;

		.goods-price-box {
			@include Detail-content;

			&>view:first-child {
				font-size: 38rpx;
				color: red;
			}

			&>view:last-child {
				font-size: 20rpx;
				color: rgb(0, 0, 0, 0.5);
			}
		}

		.goods-title-box {
			@include Detail-content;

			.goods-share {
				display: flex;
				padding-left: 20rpx;
				flex-direction: column;
				font-size: 24rpx;
				justify-content: center;
				align-items: center;
				border-left: 1px solid rgb(0, 0, 0, 0.1);
			}

			.description {
				width: 83%;
				height: 80rpx;
				word-break: break-all;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				color: rgb(0, 0, 0, 0.6);
			}
		}
	}

	.select-content {
		@include pointCss("white");

		&>view:first-child view:first-child {
			color: rgb(0, 0, 0, 0.5);
		}

	}

	.shop-service {
		@include pointCss("#f3f3f3");
	}

	.goods-description-box {
		padding: 20rpx 15rpx;
		background-color: white;
		color: rgb(0, 0, 0, 0.8);
	}
</style>
