<template>
	<li class="s-tree-item" @click.stop="nodeClick">
		<i :class="[statusIconClass]" @click.stop='expand'></i>
		<a>
			<i  :class="[node.icon,nodeIconClass]"></i>
			{{node.name}}
			<i v-if="node.buttons" v-for="button in node.buttons" class="iButton" 
				:class="[button.icon]" 
				:title="button.title" 
				@click.stop="nodeIconClick(button.click,node)"></i>
		</a>
		<slot></slot>
	</li>
</template>
<script>
	export default {
		name: 'sTreeItem',
		props: {
			node: Object
		},
		computed:{
			statusIconClass(){
				return !this.node.isParent ? '' :
					this.node.isOpen ? 'fa icon-open-state fa-minus-square-o' : 'fa icon-open-state fa-plus-square-o';
			},
			nodeIconClass(){
				return this.node.isOpen ? this.node.openedIcon : this.node.closedIcon;
			}
		},
		methods:{
			nodeClick(){
				let _this = this;
				while(isNotTree(_this.$parent)){
					_this = _this.$parent;
				}
				_this.$emit('node-click',this.node);
			},
			expand(){
				this.$emit('expand',this.node);
			},
			nodeIconClick(fun,node){
				if(typeof fun === 'function'){
					fun(node);
				}else if(typeof fun === 'string'){
					this[fun](node);
				}
			},
			addNode(node){
				this.$emit('add-node',node);
			},
			delNode(node){
				this.$emit('del-node',node);
			},
			editNode(node){
				this.$emit('edit-node',node);
			}
		}
	}

	function isNotTree(vm){
		let classStr = vm.$el.className;
		if(classStr.indexOf('s-tree')!==-1){
			return true;
		}
		return false;
	}
</script>
<style scoped lang="scss">
	.s-tree-item{
		.iButton{
			color: #1D8CE0;
			padding-right: 5px;
			&:hover:before{
				color: #58B7FF;
			}
		}
		a{
			color: #333;
			height: 30px;
			line-height: 30px;
			padding: 2px;
			display: inline-block;
			box-sizing: border-box;
		}
		
	}
</style>