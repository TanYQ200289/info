<template>
	<view>
		<SearchMiddl :mark="'goodsList'"></SearchMiddl>
		<view class="goods-navBar">
			<view class="goods-navBar-item" v-for="(item,index) in goodsNavbarList"
				:class="[clickIndex === index ? 'active-color':'']" :key="index" @click="changIndex(index)">
				{{item}}
				<view v-if="item === '价格'">
					<uni-icons type="top" size="10" :class="[priceFlag&&clickIndex===index?'active-color':'']">
					</uni-icons>
					<uni-icons type="bottom" size="10" :class="[!priceFlag &&clickIndex===index?'active-color':'']">
					</uni-icons>
				</view>
			</view>
		</view>
		<block v-if="goodsList.length !==0 ">
			<view class="goods-list-content">
				<GoodsCard v-for="item in goodsList" :key="item.goodscode" :goodObj="item"></GoodsCard>
			</view>
		</block>
		<block v-else>
			<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png">
			</u-empty>
		</block>
	</view>
</template>

<script setup>
	import SearchMiddl from "../../components/SearchMiddle/SearchMiddle.vue";
	import GoodsCard from "../../components/GoodsCard/GoodsCard.vue";
	import {
		ref,
		reactive
	} from "vue";
	import {
		onLoad
	} from "@dcloudio/uni-app";
	const goodsList = ref({})
	//保存该产品类型的key
	const keys = ref("")
	onLoad(({
		key
	}) => {
		searchRequst(key, "1", "1");
		keys.value = key;
	})

	async function searchRequst(value, sortType, sortPrice) {
		const data = await uni.Http(`/goods/SearchGoods/${value}/${sortType}/${sortPrice}"`,"get");
		goodsList.value = data.data;
	}
	const goodsNavbarList = reactive(["综合", "销量", "价格"]);
	const clickIndex = ref(0);
	const priceFlag = ref(false);

	function changIndex(index) {
		if (index === 2) {
			priceFlag.value = !priceFlag.value;
			if(priceFlag.value ){
				goodsList.value = goodsList.value.sort(function(a,b){return b.price- a.price})
			}
			else {
				goodsList.value = goodsList.value.sort(function(a,b){return a.price- b.price})
			}
		}else {
			searchRequst(keys.value, "1", "1");
		}
		clickIndex.value = index;
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #f3f3f3;
	}

	/*激活的字体颜色*/
	.active-color {
		color: #d2b82e !important;
	}

	/*商品导航*/
	.goods-navBar {
		display: flex;
		text-align: center;
		background-color: white;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);

		&>&-item:last-child {
			display: flex;

			&>view {
				margin-left: 8rpx;
				margin-top: -8rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}

		&-item {
			padding: 20rpx;
			width: 100%;
			font-size: 28rpx;
		}
	}

	/*商品展示*/
	.goods-list-content {
		display: flex;
		flex-wrap: wrap;
	}
</style>
