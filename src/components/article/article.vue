<template>
	<ul class="article-list">
		<li v-for="item in list" class="article-item">
			<div class="title">
				<span class="flag"><p v-if="item.top">置顶</p></span>
				<span class="content">{{item.title}}</span>
			</div>
			<div class="description">
				<img :src="item.author.avatar_url" :alt="item.author.loginname" class="avatar">
				<div class="info">
					<p>
						<span class="name">{{item.author.loginname}}</span>
						<span class="count">
							<span class="reply">{{item.reply_count}}</span>
							/{{item.visit_count}}
						</span>
					</p>
					<p>
						<span class="start">
							{{item.create_at | getDiffTime}}
						</span>
						<span class="end">
							{{item.last_reply_at | getDiffTime}}
						</span>
					</p>
				</div>
			</div>
		</li>
	</ul>
</template>

<script>
	import utils from '../../libs/utils.js';
	export default {
		data:function(){
			return {
				list:[]
			}
		},
		mounted:function(){
			let param = $.param({tab: 'all'});
			this.$http.get('https://cnodejs.org/api/v1/topics?' + param).then((response) => {
                if (response.status && response.ok) {
                    this.list = response.data.data;
                }
            });
		},
		filters: {
			getDiffTime:function(time){
                return utils.getLastTimeStr(time, true);
			}
		}
	};
</script>

<style lang="scss">
	@import "../../common/scss/_base.scss";
	
	.article-list{
		position: absolute;
	    top: 36px;
	    bottom: 40px;
	    overflow: scroll;
	    width: 100%;
		.article-item{
			@include size(null,100px);
			border-bottom: 1px solid #ccc;
			padding-left:15px;
			.title{
				margin-top: 5px;
				height:30px;
				line-height:30px;
				font-size: 0;
				span{
					display: inline-block;
				}
				.flag{
					width: 40px;
					line-height:20px;
					text-align: center;
					background: rgb(236,71,60);
					color: #fff;
					font-size: 12px;
					@include margin(5px,20px);
					vertical-align: top;
					border-radius: 3px;
				}
				.content{
					width: calc(100% - 65px);
					font-size: 18px;
					font-weight: bold;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					word-spacing: -4px;
				}
			}
			.description{
				height:60px;
				margin-top:5px;
				font-size: 0;
				img{
					width:40px;
					margin-right:20px;
					border-radius: 25px;
					vertical-align: top;
				}
				.info{
					display: inline-block;
					width: calc(100% - 65px);
					font-size: 12px;
					p{	
						vertical-align: top;
						height: 25px;
						line-height: 25px;
						.name,.start{
							float: left;
						}
						.count,.end{
							float: right;
							margin-right: 5px;
							.reply{
								font-weight: bold;
								color: rgb(136,187,131);
							}
						}
					}
				}
			}
		}
	}
	
</style>