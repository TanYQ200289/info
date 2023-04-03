<template>
	<view class="login-content">
		<view class="login-title-box">
			<view>手机号登录</view>
			<view>未注册的手机号登录后将自动注册</view>
		</view>
		<view class="form-box">
			<form @submit="formSubmit">
				<view class="cellphone">
					<input name="cellphoneNumber" v-model="phoneNumber" placeholder="请输入手机号码" />
				</view>
				<view class="exam">
					<input name="exam" placeholder="请输入验证码" />
					<text @click="getcode">{{codeFlag?"获取验证码":code}}</text>
				</view>
				<button class="button-class" form-type="submit">登录</button>
			</form>
		</view>
	</view>
</template>

<script setup>
	import {
		useUserInfo
	} from "../../store/index.js";
	import {
		ref
	} from "vue";
	//验证码计时
	const timer = ref(null);
	const code = ref(60);
	const codeFlag = ref(true);
	const phoneNumber = ref("");
	//用户信息store
	const store = useUserInfo();

	function formSubmit({
		detail: {
			value
		}
	}) {
		const rex = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
		if (rex.test(value.cellphoneNumber)) {
			loginRequest(value.cellphoneNumber, value.exam)
		} else {
			uni.showToast({
				title: '请输入正确手机号码',
				icon: "error"
			});
		}
	}
	//登录接口
	async function loginRequest(phoneNumber, code) {
		const data = await uni.Http(`/user/login/${phoneNumber}/${code}`,"get");
		if (data.statusCode === 404) {
			uni.showToast({
				title: '登录失败',
				icon: "error",
				duration: 2000
			});
		} else if (data.data === "验证码已失效" || data.data === "验证码错误") {
			uni.showToast({
				title: '验证码错误或者失效',
				icon: "error",
				duration: 2000
			});
			code.value = 60;
			codeFlag.value = true;
		} else {
			store.userInfo = data.data;
			uni.setStorageSync('user', JSON.stringify(store.userInfo));
			uni.switchTab({
				url: "/pages/My/My"
			})
		}
	}

	function getcode() {
		if(phoneNumber.value.trim().length  === 0 ){
			uni.showToast({
				title: '请输入手机号码',
				icon: "error"
			})
			return
		};
		if(timer.value) return;
		codeFlag.value = false;
		getCodeRequest()
		timer.value = setInterval(() => {
			if (code.value === 0) {
				clearInterval(timer.value);
				timer.value = null;
				codeFlag.value = true;
				code.value = 60
				return;
			};
			code.value--;
		}, 1000)

	}
	//获取验证码接口
	async function getCodeRequest() {
		const number = phoneNumber.value;
		const {
			data
		} = await uni.Http(`/user/sendMessage/${number}`,"get");
		if (data !== "验证码发送成功") {
			uni.showToast({
				title: '获取验证码失败',
				icon: "error"
			});
		}
	}
</script>

<style scoped lang="scss">
	.login-content {
		padding: 80rpx 40rpx;

		.login-title-box {
			&>view {
				margin: 30rpx 0;
			}

			&>view:first-child {
				font-size: 50rpx;
			}

			&>view:last-child {
				color: #808080;
				font-size: 28rpx;
			}
		}

		.form-box {
			margin-top: 70rpx;

			.cellphone,
			.exam {
				display: flex;
				justify-content: space-between;
				margin: 20rpx 0;
				padding: 20rpx 0;
				padding-right: 20rpx;
				border-bottom: 1px solid rgba(0, 0, 0, 0.1);
				color: #e6c619;
			}
		}

		.button-class {
			border: none;
			outline: none;
			border-radius: 50rpx;
			color: white;
			font-size: 30rpx;
			background-image: linear-gradient(45deg, #e6c619, yellow, orange, pink);
		}
	}
</style>
