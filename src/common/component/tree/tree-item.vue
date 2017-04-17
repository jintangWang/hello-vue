<template>
	<li class="s-tree-item">
		<i :class="[statusIconClass]" @click.stop='expand'></i>
		<span>
			<i  :class="[node.icon,nodeIconClass]"></i>
			{{node.name}}
			<i v-if="node.buttons" v-for="button in node.buttons" class="iButton" 
				:class="[button.icon]" 
				:title="button.title" 
				@click.stop="nodeClick(button.click,node)"></i>
		</span>
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
			expand(){
				this.$emit('expand',this.node);
			},
			nodeClick(fun,node){
				this[fun](node);
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
</script>
<style scoped lang="scss">
	.iButton{
		color: #1D8CE0;
		padding-right: 5px;
		&:hover:before{
			color: #58B7FF;
		}
	}
</style>