<template>
	<view class="scroll-view-container">
	<SearchMiddle :mark="'class'"></SearchMiddle>
		<view class="scroll-view-box">
			<scroll-view scroll-y="true" class="scroll-Y scroll-left" :style="{height:scrollHeight+'px'}">
				<view v-for="(item,index) in navSideList.data" :key="item" @tap="navClickHandler(index,item.cid)"
					class="scroll-view-item uni-bg-red" :class="[navIndexClass===index?'active':'']">{{item.messgae}}</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="scroll-Y" :style="{height:scrollHeight+'px'}">
				<view class="scroll-view-item uni-bg-red show-goods-container">
					<block v-if="goodClassData.data.length !== 0">
						<view class="show-goods-item" v-for="item in goodClassData.data" :key="item.bid" @click="toGoodsListPage(item.bid)">
							<view class="show-goods-item-image">
								<image class="image" :src="item.serverName+item.logo" mode="aspectFill"></image>
							</view>
							<text>{{item.name}}</text>
						</view>
					</block>
				    <block v-else>
						<u-empty
						        mode="data"
						        icon="http://cdn.uviewui.com/uview/empty/data.png"
						>
						</u-empty>
					</block>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import Search from "../../components/Search/Search.vue";
	import {
		ref,
		reactive
	} from "vue";
	import SearchMiddle from "../../components/SearchMiddle/SearchMiddle.vue";
	const navSideList = reactive({data:[]})
	const scrollHeight = ref(0);
	const navIndexClass = ref(0);
	const goodClassData = reactive({data:[]})
	onLoad(() => {
		const system = uni.getSystemInfoSync();
		scrollHeight.value = system.windowHeight-155;
		getFirstCalssNavListRequest();
		
	})
	//获取navlist的数据
	async function getFirstCalssNavListRequest(){
		const {data} = await uni.Http("/goods/queryAllClass","get");
		navSideList.data = data;
	}	
	 function navClickHandler(index,cid) {
		navIndexClass.value = index;
		getClassData(cid);
	}
	//获取分类
	async function getClassData(index){
		const {data} = await uni.Http(`/goods/byBrand/${index}`,"get");
		goodClassData.data = data;
		
	}
	function toGoodsListPage(id){
		uni.navigateTo({
			url:"/subPages/GoodsList/GoodsList?key="+id
		})
	}
</script>

<style scoped lang="scss">
	page {

		background-color: white;
	}

	.active {
		background-color: white;
		color: #e6c619;
	}

	//右侧scroll样式
	.show-goods-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;

		.show-goods-item {
			width: 170rpx;
			height: 170rpx;
			margin: 10rpx;

			text-align: center;

			.show-goods-item-image {
				width: 100%;
				height: 120rpx;
				.image {
					width: 100%;
					height: 100%;
				}
			}

			text {
				line-height: 50rpx;
				font-size: 28rpx;
				color: silver;
			}
		}
	}

	.scroll-view-box {
		display: flex;

		.scroll-left {
			width: 200rpx;
			background-color: rgba(238, 238, 238, 0.3);
			height: 30rpx;
			.scroll-view-item {
				width: 100%;
				text-align: center;
				height: 75rpx;
				line-height: 75rpx;
				font-size: 28rpx;
				padding: 10rpx 0;
				color: rgbg(0, 0, 0, 0.4);
			}
		}
	}

	.scroll-view-container {
		position: relative;
		width: 100%;
	}
</style>
