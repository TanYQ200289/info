import {
		useShopCar
	} from  "../store/shopCar.js";
	
export default function(){
	const carStore = useShopCar();
	function setTabBarBadge() {
		setTimeout(()=>{
			const number = carStore.countCarNumber;
			if(number) {
				uni.setTabBarBadge({
					index:2,
					text:number + ""
				})
			}else {
				uni.setTabBarBadge({
					index:2,
					text:"0"
				})
				uni.removeTabBarBadge({
					index:2
				})
			}
		},200)
	}
	return {
		setTabBarBadge
	}
}