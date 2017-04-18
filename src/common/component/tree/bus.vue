<template>
	
</template>
<script>
	import Vue from 'vue';
	export default new Vue({
		name: 'bus',
		data(){
			return {
				activeValue: ''
			}
		},
		created(){
			this.$on('active',this.active);
		},
		methods:{
			active(value){
				this.activeValue = value;
			}
		}
	});
</script>