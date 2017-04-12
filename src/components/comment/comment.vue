 <template>
 	<div>
	    <h3>上传照片生成二维码</h3>
	    <div>
	    	<el-button @click="upload" class="primary">上传照片</el-button>
	    	<input type="file" >
	    </div>
	    <div class="sourceImg">
	    	<img src="../../img/1491991034.png" alt="二维码">
	    	<img src="../../img/cat.jpg"  alt="猫咪">
	    </div>
	    <h3>生成的二维码</h3>
	    <div class="resultImg" ref="result">
	    	<img src="" alt="结果二维码">
	    </div>
    </div>
  </template>
<script>
	export default {
		data(){
			return {}
		},
		methods:{
			upload(){

			}
		},
		mounted(){
			let imgEl = this.$refs.result.children[0];
			imgEl.src = "../../img/cat.jpg";
		}
	}
</script>

<style lang="scss">
	.sourceImg,.resultImg{
		img{
			width: 100px;
			height: 100px;
		}
	}
</style>