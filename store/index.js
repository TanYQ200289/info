// stores/counter.js
import {
	defineStore
} from 'pinia'
const user = uni.getStorageSync('user');
//用户信息store
export const useUserInfo = defineStore('userInfo', {
	state: () => {
		return {
			userInfo: user ? JSON.parse(user) : {}
		}
	},
	// 也可以定义为
	// state: () => ({ count: 0 })
	actions: {
		deleteUserInfo() {
			this.userInfo = {};
			uni.removeStorageSync("user");
		},
	},
})
