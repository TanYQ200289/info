<template>
	<view>
		<u-search placeholder="日照香炉生紫烟" v-model="keyword" @custom="searchHanlder" bgColor="white"></u-search>
		<view class="takes-notes-content">
			<view class="notes">
				<view>最近搜索</view>
				<uni-icons type="trash-filled" size="20" @tap="deleteNotesHanlder"></uni-icons>
			</view>
			<!--搜索记录
			
			-->
			<view class="notice-box">
				<text class="notice-box-item" v-for="(item,key) in keywordList.data" :key="item + key"
				@click="notiesHanlder(item)"
				>{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import {reactive, ref,onBeforeMount} from "vue";

const keyword = ref("");
const keywordList =reactive({data:[]});
onBeforeMount(()=>{
	try {
		const value = uni.getStorageSync('keyword_list');
		if (value) {
			keywordList.data.push(...JSON.parse(value));
		}
	} catch (e) {
		// error
		console.log(e)
	}
})
function deleteNotesHanlder(){
	keywordList.data = [];
	try {
		uni.removeStorageSync('keyword_list');
	} catch (e) {
		// error
		console.log("删除失败")
	}
}
function searchHanlder(value){
	if(value.trim().length === 0) return;
	keywordList.data.push(value);
	keyword.value = "";
	try {
		uni.setStorageSync('keyword_list', JSON.stringify(keywordList.data));
	} catch (e) {
		console.log("搜索记录存储失败");
	}
	uni.navigateTo({
		url:`/subPages/GoodsList/GoodsList?key=${value}`
	})
}
function notiesHanlder(key){
	uni.navigateTo({
		url:`/subPages/GoodsList/GoodsList?key=${key}`
	})
}
</script>

<style lang="scss" scoped>
page{
	padding: 30rpx;
	background-color:  #f3f3f3;
}
.notes{
	margin:  30rpx 0;
	display: flex;
	justify-content: space-between;
	&> view:first-child{
		color: rgba(0,0,0,0.6);
	}
}
.notice-box{
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	&-item {
		margin: 10rpx;
		padding: 5rpx 20rpx;
		background-color: white;
		font-size: 20rpx;
		border-radius: 20rpx;
	}
}
</style>
