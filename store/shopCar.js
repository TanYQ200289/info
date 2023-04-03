// stores/counter.js
import {
	defineStore
} from 'pinia'

//用户信息store
export const useShopCar = defineStore('shopCar', {
	state: () => {
		return {
			car: []
		}
	},
	actions:{
		clearCar(){
			this.car = [];
		}
	},
	getters: {
		countCarNumber(state) {
			const count = state.car.reduce((preVal, current) => {
				preVal += current.goodscount;
				return preVal
			}, 0)

			return count;
		},
		countPrice(state) {
			
			const count = state.car.reduce((preVal, current) => {
				if (current.done) {
					preVal += current.price * current.goodscount;
				}
				return preVal;
			}, 0)

			return count;
		},
		isAllcheckedGoods(State){
			const result = State.car.reduce((preVal, current) => {
				if (current.done) {
					preVal++;
				}
				return preVal;
			}, 0);
			return State.car.length !== 0 && result === State.car.length ;
		}
	}
})
