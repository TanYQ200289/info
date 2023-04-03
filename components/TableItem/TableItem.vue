<template>

		<view class="table-item">
			<slot></slot>
		</view>

</template>

<script setup>
</script>

<style lang="scss" scoped>
	.table-item {
		display: flex;
		width: 25%;
		flex-direction: column;
		justify-content: space-between;
		text-align: center;
	}
</style>
