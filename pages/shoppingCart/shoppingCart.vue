<template>
	<view class="content">
		<view class="count-edit">
			<text>共<text style="color: red;">{{carStore.countCarNumber?carStore.countCarNumber:0}}</text>件商品</text>

		</view>

		<!--购物车卡牌-->

		<block v-if="carStore.countCarNumber">
			<uni-swipe-action>
				<block v-for="item in carStore.car" :key="item.gid">
					<uni-swipe-action-item :right-options="options" @click="actionItemHanlder(item,$event)">
						<view class="select-goods-card">
							<view class="select-goods-card-left">
								<radio :checked="item.done" color="orange" @tap="changeRadioHandler(item,$event)" />
								<view class="select-goods-card-left-image" @tap="toDetails(item.gid)">
									<image class="images" :src="item.image.serverName+item.image.displayimg"></image>
								</view>
							</view>
							<view class="select-goods-card-right">
								<view class="select-goods-card-right-title">{{item.message}}
								</view>
								<view class="select-goods-card-right-mark">
									<text v-for="item in 2">深空灰色</text>
								</view>
								<div class="select-goods-card-right-bottom">
									<view style="color: red;">￥{{item.price}}</view>
									<uni-number-box class="number-box" :min="1" :max="99" :value="item.goodscount"
										@change="changingNumberBox(item.gid,$event)"></uni-number-box>
								</div>
							</view>
						</view>
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
		</block>
		<block v-else-if="!userInfoStore.userInfo.uid">
			<view class="shopping-Car-empty-container">
				<uni-icons type="cart" size="100" color="silver"></uni-icons>
				<view style="color: silver;margin: 20rpx;">你的购物车是空的，快去逛逛吧</view>
				<view class="shopping-car-button" @click="toselectGoods">
					去逛逛
				</view>
			</view>
		</block>
		<block v-else>
			<view>
					<u-loading-icon></u-loading-icon>
			</view>
		</block>
		<!--底部结算-->
		<view v-if="userInfoStore.userInfo.uid">
			<view class="shopping-footer">
				<view class="shopping-footer-all">
					<radio value="r2" @tap="isAllgoodsHandler" :checked="carStore.isAllcheckedGoods" color="orange" />
					全选
				</view>
				<view class="shopping-footer-counter">{{carStore.countPrice?"合计:":""}}<text style="color: red;">{{carStore.countPrice?`￥${carStore.countPrice}`:''}} </text>
				</view>
				<view class="shopping-footer-pay-button" @tap="show = !show" >去结算</view>
			</view>
		</view>
		<u-modal :show="show" title="警告"  content='该网站为演示项目无法下单' @confirm="show = !show"></u-modal>
	</view>
</template>

<script setup>
	import {
		useShopCar
	} from "../../store/shopCar.js";
	import {
		useUserInfo
	} from "../../store/index.js";
	import {
		onShow
	} from "@dcloudio/uni-app";
	import useSetTabBarBadgeHook from "../../hook/setTabBarBadgeHook.js";
	import {ref} from "vue";
	const show = ref(false)
	const setTabBarBadgeHook = useSetTabBarBadgeHook();
	/*actions 模块滑动配置*/
	const options = [{
		text: '取消',
		style: {
			backgroundColor: 'orange'
		}
	}, {
		text: '删除',
		style: {
			backgroundColor: '#dd524d'
		}
	}]
	//用户信息store 
	const userInfoStore = useUserInfo();

	//购物车store
	const carStore = useShopCar();
	onShow(() => {
		//setTabBarBadge();
		if (userInfoStore.userInfo.uid) {
			carStore.car = [];
			getAllgoodsRequest();
			setTabBarBadgeHook.setTabBarBadge();
		}
	})


	function test(){
		console.log("click")
	}
	function changingNumberBox(gid, value) {
		const index = carStore.car.findIndex((item) => item.gid === gid);
		carStore.car[index].goodscount = value;
		//setTabBarBadge()
		setTabBarBadgeHook.setTabBarBadge();
	}
	//去选择商品
	function toselectGoods() {
		if (userInfoStore.userInfo.uid) {
			uni.switchTab({
				url: "/pages/classify/classify"
			})
		} else {
			uni.navigateTo({
				url: "/subPages/Login/Login"
			})
		}
	}
	//获取用户购物车
	async function getAllgoodsRequest() {
		const {
			data
		} = await uni.Http(`/card/queryUserCard/${userInfoStore.userInfo.uid}`, "get");
		const result = data.map(item => {
			const obj = {
				done: false,
				...item
			}
			return obj;
		})
		carStore.car.push(...result);
	
	}
	//单选框是否选中处理函数
	function changeRadioHandler(good) {
		good.done = !good.done;
	}
	//所有商品是否选中
	function isAllgoodsHandler() {
		//shop store里面是否全选计算属性当前的值;
		const currentIsAllVal = !carStore.isAllcheckedGoods;
		carStore.car.forEach(item => {
			item.done = currentIsAllVal;
		})
	}
	//删除商品请求
	async function deleteGoodsRequest(gid) {
		await uni.Http(`/card/deleteCard/${gid}/${userInfoStore.userInfo.uid}`, "get");

	}
	//商品滑块删除处理函数 
	function actionItemHanlder(goods, {
		index
	}) {
		if (index) {
			const goodsIdx = carStore.car.findIndex(item => item === goods);
			if (goodsIdx !== -1) {
				carStore.car.splice(goodsIdx, 1);
				deleteGoodsRequest(goods.gid)
				//setTabBarBadge();
				setTabBarBadgeHook.setTabBarBadge();
			}
		}
	}
	//点击图片去往商品详情页面 
	function toDetails(id){
		uni.navigateTo({
			url: `/subPages/Details/Details?id=${id}`
		});
	}
</script>

<style scoped lang="scss">
	.content {
		padding-bottom: 50px;

	}

	/* #ifdef  H5 */
	.shopping-footer {
		position: fixed;
		display: flex;
		justify-content: space-around;
		align-items: center;
		bottom: 50px;
		width: 100%;
		height: 100rpx;
		background-color: white;

		.shopping-footer-pay-button {
			width: 200rpx;
			height: 60rpx;
			background: linear-gradient(45deg, red, pink);
			border-radius: 30rpx;
			text-align: center;
			line-height: 60rpx;
			font-size: 24rpx;
			color: white;
		}
	}

	/* #endif*/
	/* #ifdef  MP-WEIXIN */
	.shopping-footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		background-color: white;
	}

	/* #endif*/
	page {
		background-color: rgba(238, 238, 238, 0.3);
	}

	//头部样式
	.count-edit {
		display: flex;
		padding: 15rpx 10rpx;
		justify-content: space-between;
		font-size: 32rpx;
		color: rgb(0, 0, 0, 0.7);
	}

	//footer
	//已选择商品信息样式
	.select-goods-card {
		display: flex;
		margin: 20rpx;
		height: 240rpx;
		background-color: white;
		border-radius: 20rpx;
		overflow: hidden;

		&-left {
			display: flex;
			width: 240rpx;
			align-items: center;
			padding-left: 10rpx;
			height: 100%;

			&-image {
				flex: 1;
				height: 100%;

				.images {
					width: 100%;
					height: 100%;
				}
			}
		}

		&-right {
			margin-left: 10rpx;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			&-title {
				width: 100%;
				word-break: break-all;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				color: rgba(0, 0, 0, 0.6);
				font-size: 28rpx;
			}

			.select-goods-card-right-mark {
				display: flex;
				margin: 10rpx 0;

				&>text {
					font-size: 16rpx;
					color: rgba(0, 0, 0, 0.4);
					padding: 6rpx 10rpx;
					border-radius: 10rpx;
					margin-right: 10rpx;
					background-color: rgba(238, 238, 238, 0.6);
				}
			}

			.select-goods-card-right-bottom {
				display: flex;
				margin-top: 15rpx;
				justify-content: space-between;

				.number-box {
					margin-right: 18rpx;
				}
			}
		}
	}

	.shopping-Car-empty-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		box-shadow: 0 0 100px 0 rgb(0, 0, 0, 0.2);
		padding: 50rpx 0;
		height: 70vh;
		background-color: rgba(238, 238, 238, 0.3);
	}

	.shopping-car-button {
		width: 200rpx;
		padding: 15rpx;
		border-radius: 40rpx;
		color: white;
		text-align: center;
		background-color: red;
		background: linear-gradient(45deg, #e66465, pink);
	}
</style>
