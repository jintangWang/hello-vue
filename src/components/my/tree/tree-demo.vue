<template>
	<div class="tree-demo">
		<s-tree :tree-data = "treeData"></s-tree>
	</div>
</template>
<script>
import sTree from "src/common/component/tree";
let treeData =  require("./tree.json");

export default {
	data(){
		return {
			treeData: treeData
		}
	},
	components:{
		sTree
	}

}
</script>
<style scoped>
	.tree-demo{
		padding-left: 10px;
	}
</style>