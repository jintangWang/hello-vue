<template>
	<div class="component-my">
		<ul class="my-list">
			<!-- <li class="login" @click="login">登陆</li> -->
			<router-link to="/my/login">登陆</router-link>	
			<li class="register">注册</li>
		</ul>

		<p>测试v-marked指令：</p>
		<div v-marked>
### hello
[百度](www.baidu.com)
``` javascript
	var x=1;
	for(var i=0;i < 5;i++){

	}
	if(x == 1){}
```
		</div>

		<button @click="value=!value" class="btn">测试transition</button>
		<transition name="my">
			<p v-if="value">你好啊</p>
		</transition>
	</div>

</template>

<script>

	export default {
		data(){
			return {
				value: true
			}
		},
		methods:{
			login:() => {
				console.log()
			}
		}
	};
</script>

<style lang="scss">
	@import "../../common/scss/_base.scss";
	
	.component-my{
		width: 100%;
		@include position(absolute,0,null,40px);
		font-size: 16px;
		background: #d9d9d9;
		ul.my-list{
			margin-top: 10px;
			a{
				display: block;
			}
			li,a{
				@include size(100%,50px);
				line-height: 50px;
				text-indent: 20px;
				background: #fff;
			}
			.login{
				margin-top: 20px;
			}
			.register{
				margin-top: 1px;
			}
		}
	}

	.btn{
		background: #5cb85c;
	}

	.my-enter-active,.my-leave-active{
		transition: opacity 2s;
	}
	.my-enter, .my-leave-active {
	  opacity: 0
	}
	
</style>   