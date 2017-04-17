<template>
	<ul class="s-tree" :class="{'noBorder':isNoBorder}">
		<s-tree-item v-for="node in innerTreeData" :key="node.name" 
			:node="node"
			:class="{'noBorder':isNoBorder}" 
			@expand="expand"
			@add-node="addNode"
			@del-node="delNode"
			@edit-node="editNode"
			>
			<s-tree v-if="node.isOpen && node.children" :tree-data="node.children"></s-tree>
		</s-tree-item>
	</ul>
</template>
<script>
	import sTreeItem from './tree-item.vue';
	export default {
		name: 'sTree',
		data(){
			return {
				innerTreeData:{}
			}
		},
		props: {
			treeData: {
				type: Array,
				require: true
			} 
		},
		components:{
			sTreeItem
		},
		computed:{
			isNoBorder(){
				if(this.innerTreeData.length<=1 && this.innerTreeData[0] && this.innerTreeData[0].hasParent) {
					return true;
				}
				return false;
			}
		},
		watch:{
			treeData:{
				immediate: true,
				deep: true,
				handler(obj){
					this.innerTreeData = obj;
				}
			}
		},
		methods:{
			expand(node){
				if(!node.hasOwnProperty('isOpen')){
					this.$set(node,'isOpen',false);
				}
				node.isOpen = !node.isOpen;
			},
			addNode(node){
				// let _this = this;
				// while(isNotTree(_this.$parent)){
				// 	_this = _this.$parent;
				// }
				// _this.$emit('add-node',() => {
					if(!node.hasOwnProperty('isParent')) this.$set(node,'isParent',true);
					if(!node.hasOwnProperty('isOpen')) this.$set(node,'isOpen',true);
					if(!node.hasOwnProperty('children')) this.$set(node,'children',[]);
					node.isParent = true;
					node.isOpen = true;
					node.children.push({
						"name": "child node", 
						"isParent": false, 
						"buttons": [
							{
							    "title": "Add", 
							    "icon": "fa fa-plus",
							    "click": "addNode"
							},
							{
							    "title": "Edit", 
							    "icon": "fa fa-edit",
							    "click": "editNode"
							},
						    {
						        "title": "Del", 
						        "icon": "fa fa-trash",
						        "click": "delNode"
						    }
						]
					});
				// });
			},
			delNode(node){
				let index = this.innerTreeData.indexOf(node);
				this.innerTreeData.splice(index,1);
				if(this.innerTreeData.length<1){
					this.$parent.node.isOpen = false;
				}
			},
			editNode(node){
				this.$prompt('请输入名称', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          inputErrorMessage: '节点名称不能为空',
		          inputValue: node.name
		        }).then(({ value }) => {
		          node.name = value;
		          this.$message({
		            type: 'success',
		            message: '修改成功'
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '修改失败'
		          });       
		        });
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
	.s-tree{
		cursor: pointer;
		margin-left: 20px;
		position: relative;
		&:before{
			content:'';
			// height: 100%;
			position: absolute;
			left: -15px;
			top: -7px;
			bottom: 16px;
			border-left: 1px solid #999;
		}
		.s-tree-item{
			line-height: 30px;
			position: relative;
			&:before{
				content: '';
				width: 10px;
				position: absolute;
				left: -15px;
				top: 15px;
				border-top: 1px solid #999;
			}
			
		}
	}
	.noBorder:before{
		border:none !important;
	}
</style>