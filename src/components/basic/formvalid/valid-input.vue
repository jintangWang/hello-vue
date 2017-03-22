<template>
	<div class="valid-box">
		<input :type="type" :placeholder="placeholder" checktype="isNull" id="loginText">
	</div>
</template>

<script>
	export default {
		data: () => {
			return {
				showTip: false
			}
		},
		props:{
			placeholder:String,
			type:String
		}
	};
</script>

<style lang="scss">
	@import "./formValid_orange.scss";

	.valid-box{

	}
	
</style>   