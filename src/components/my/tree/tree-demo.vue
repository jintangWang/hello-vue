<template>
	<div class="tree-demo">
		<s-tree :tree-data = "treeData" @node-click="nodeClick"></s-tree>
	</div>
</template>
<script>
import sTree from "src/common/component/tree";
let treeData =  require("./tree.json");
treeData[0].children[1].buttons[0].click=function(node){
	alert('自定义添加事件');
}

export default {
	data(){
		return {
			treeData: treeData
		}
	},
	components:{
		sTree
	},
	methods:{
		nodeClick(node){
			console.group('节点单击事件');
			console.log(node);
			console.groupEnd();
		}
	}

}
</script>
<style scoped>
	.tree-demo{
		padding-left: 10px;
	}
</style>