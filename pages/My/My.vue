<template>
	<view class="content">
		<!--我的 信息模块-->
		<view class="my-info" @click="toLoginPage">
			<view class="head-image"
				:style="{backgroundImage:`url(${userInfo.uid?'../../static/image/labixiaoxin-.png':'../../static/image/morentouxiang.png'})`}">
			</view>
			<view class="info">
				<!--用户name-->
				<view class="username" style="font-weight: 600;">{{userInfo.uid?userInfo.username:'未登录'}}</view>
				<view class="pnoenumber" style="font-size: 28rpx;">
					{{userInfo.uid?userInfo.phone:'点击登陆账号'}}
				</view>
			</view>
		</view>
		<!--账户模块
		
		-->
		<view class="table-bar">
			<TableItem v-for="(item,index) in accountData" :key="index">
				<view class="table-item-number" v-if="item.icon !=='wallet'">

					{{!userInfo.uid?"---":index==0?userInfo.balance.toFixed(2):index==1?userInfo.preferential:index===2?userInfo.integral:"---"}}
				</view>
				<view v-else>
					<uni-icons type="wallet" size="26"></uni-icons>
				</view>
				<view class="table-item-text">{{item.text}}</view>
			</TableItem>
		</view>
	</view>
	<!--订单与服务模块-->
	<view class="order-service-content">
		<view class="order-content">
			<TableItem v-for="(item,index) in orderData" :key="index">
				<view class="iconfont" :class="[item.icon]"></view>
				<view class="table-item-text">{{item.name}}</view>
			</TableItem>
		</view>
		<view class="service-content">
			<view class="title">我的服务</view>
			<view class="service-coentent-box">
				<TableItem v-for="(item,index) in serviceData" :key="index">
					<view class="iconfont" :class="[item.icon]"></view>
					<view class="table-item-text">{{item.name}}</view>
				</TableItem>
			</view>
		</view>
	</view>
	<block v-if="userInfo.uid">
		<view class="exit-button" @click="exitLogin">退出登录</view>
	</block>
</template>

<script setup>
	import TableItem from "../../components/TableItem/TableItem.vue";
	import {
		reactive,
		ref
	} from "vue";
	import {
		accountDataUtils,
		orderDataUtils,
		serviceDataUtils
	} from "../../uitls/myData.js";
	import {
		useUserInfo
	} from "../../store/index.js";
	import {
		useShopCar
	} from "../../store/shopCar.js";
	import {
		storeToRefs
	} from "pinia";
	//控制退出登录模态框的ref
	const show = ref(false);
	/*购物车store*/
	const carStore = useShopCar();
	/*userInfostore*/
	const userInfoStore = useUserInfo();
	const {
		userInfo
	} = storeToRefs(userInfoStore);
	/*nav静态数据*/
	const accountData = reactive(accountDataUtils)
	const orderData = reactive(orderDataUtils)
	const serviceData = reactive(serviceDataUtils);
	/*登陆处理函数*/
	function toLoginPage() {
		if (userInfo.value.uid) return;
		uni.navigateTo({
			url: "/subPages/Login/Login"
		})
	}

	function exitLogin() {
		uni.showModal({
			title: "提示",
			cancelText: "取消",
			confirmText: "确定",
			content: "你确定要退出登录吗？",
			success(value) {
				if (value.confirm) {
					userInfoStore.deleteUserInfo();
					carStore.clearCar();
				}
			}

		})
	}
</script>

<style scoped lang="scss">
	@mixin TableBox($height) {
		display: flex;
		padding: 30rpx 0;
		width: 100%;
		height: $height;
		justify-content: space-around;
		background-color: white;
	}

	page {
		background-color: #f3f3f3;
	}

	.table-item-text {
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.6);
	}

	.my-info {
		display: flex;
		width: 100%;
		height: 240rpx;
		background-image: url(../../static/image/bg/user-header2.png);
		background-size: 100%;
		align-items: center;
		padding: 0 40rpx;

		.head-image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100%;
			background-size: 100%;
			box-shadow: 0 0 5rpx 0 #e6c619, 0 0 6rpx 0 rgba(0, 0, 0, 0.7);
		}

		.info {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 100rpx;
			margin-left: 20rpx;
			color: #e6c619;
		}
	}

	/*账户模块*/
	.table-bar {
		@include TableBox(105rpx);

		.table-item-number {
			color: orangered;
			font-size: 34rpx;
		}

		.table-item-text {
			font-size: 28rpx;
			color: rgba(0, 0, 0, 0.6);
		}

		&>view:last-child {
			border-left: 1px solid rgba(0, 0, 0, 0.1);
		}
	}

	/*订单模块*/
	.order-service-content {
		padding: 25rpx 25rpx;

		.order-content {
			@include TableBox(80rpx);
			box-shadow: 0 0 5rpx 0 rgba(0, 0, 0, 0.1);
			border-radius: 5rpx;

			.iconfont {
				font-size: 45rpx;
				margin-bottom: 10rpx;
			}
		}

		.service-content {
			padding: 20rpx 25rpx;
			margin-top: 20rpx;
			background-color: white;
			border-radius: 5rpx;
			box-shadow: 0 0 5rpx 0 rgba(0, 0, 0, 0.1);
			overflow: hidden;

			.title {
				font-size: 32rpx;
				color: rgba(0, 0, 0, 0.7);
			}

			.service-coentent-box {
				&>view {
					float: left;
					margin: 20rpx 0;

					.iconfont {
						color: orangered;
						font-size: 48rpx;
						margin-bottom: 20rpx;
					}

				}
			}
		}
	}

	.exit-button {
		position: absolute;
		left: 50%;
		margin-top: 50rpx;
		transform: translateX(-50%);
		padding: 10rpx 0;
		text-align: center;
		width: 500rpx;
		border: 1px solid rgba(0, 0, 0, 0.1);
		color: white;
		font-size: 20rpx;
		border-radius: 50px;
		background-image: linear-gradient(45deg,#FF626E,#ffbe7f);
		box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, 0.1), 0 0 20rpx 0 #FF626E, 0 0 25rpx 0 #ffbe7f;
	}
</style>
