<template>
	<div class="header">头部</div>
</template>

<script>
	export default {
		props:{
			seller:{
				type:Object
			}
		}
	};
</script>

<style lang="scss">
	.header{
		height:36px;
		line-height:36px;
		text-align: center;
		background: #444;
		color: #fff;
	}
</style>
