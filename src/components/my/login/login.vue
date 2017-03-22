<template>
	<form id="form-login">
		<div class="login-component">
			<ul>
				<li>
					<span>用户名：</span>
					<valid-input placeholder="请输入用户名" type="text"></valid-input>
				</li>
				<li>
					<span>密码：</span>
					<valid-input placeholder="请输入密码" type="password"></valid-input>
				</li>
			</ul>
			<button type="button" class="loginBtn">登陆</button>
		</div>
	</form>
</template>

<script>
	import validInput from "../../basic/formvalid/valid-input.vue";
	import Valid from "../../basic/formvalid/formValid.interface.js";

	export default {
		mounted:function(){
			Valid.formValid('#form-login');
		},
		components: {
			validInput
		}
	};
</script>

<style lang="scss">
	@import "../../../common/scss/_base.scss";

	.login-component{
		font-size: 16px;
		ul{
			li{
				display: flex;
				width: 90%;
				@include margin(20px,auto,null,auto);
				line-height: 40px;
				span{
					flex: 0 1 70px;
					display: block;
					height: 40px;
					padding: 3px 5px;
					text-align: center;
					font-weight: bold;
				}
				div{
					flex: 1 1 60%;
					display: flex;
					input{
						flex: 1;
						height: 30px;
						margin-top: 5px;
						border-radius: 4px;
					}
				}
				
			}
		}
		.loginBtn{
			@include size(90%,40px);
			@include margin(20px,auto,null,auto);
			display: block;
			line-height: 40px;
			background: #20A0FF;
			color: white;
			font-size: 18px;
			font-weight: bold;
			letter-spacing: 5px;
			border-radius: 4px;
			&:hover{
				background: #4db3ff;
			}
		}
	}


</style>   