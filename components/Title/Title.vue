<template>
	<view class="title-box">
		- {{title}} -
	</view>
</template>

<script setup>
	import {defineProps} from "vue";
	const props = defineProps({
		title:{
			type:String,
			require:true
		}
	})
</script>

<style lang="scss" scoped>
.title-box {
	padding: 20rpx 0;
	background-color: white;
	color: rgba(0,0,0,0.7);
	text-align: center;
	font-size: 36rpx;
	font-weight: 600;
}
</style>