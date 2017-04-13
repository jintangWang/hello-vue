 <template>
 	<div>
	    <h3>上传照片生成二维码</h3>
	    <div>
	    	<el-button class="primary">上传照片
				<input type="file" @change="fileChange">
	    	</el-button>
	    </div>
	    <div class="sourceImg">
	    	<img src="../../img/1491991034.png" alt="二维码">
	    	<img src="../../img/cat.jpg"  alt="猫咪" ref='origin' v-if="!this.originImg">
	    	<img :src="originImg" alt="origin" v-else>
	    </div>
	    <h3>生成的二维码:</h3>
	    <div class="resultImg" ref="result">
	    	<!-- <img :src="resultQR" alt="结果二维码" ref="result"> -->
	    </div>
	    <div>
	    	<el-button type="primary" @click="download">下载二维码</el-button>
	    </div>
    </div>
  </template>
<script>
	import QArt from 'qartjs';

	export default {
		data(){
			return {
				originImg: '',
				resultQR: ''
			}
		},
		methods:{
			fileChange(event){
				let files = event.target.files;
				let file = files[0];
				if(!file.type.match('image.*')){
					alert('请选择照片');
					return;
				}
				let reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => {
					this.generateQRcode(reader.result);
				}
			},
			generateQRcode(base64Img){
				this.originImg = base64Img;
				new QArt({
				  value: 'www.baidu.com',
				  imagePath: base64Img,
				  filter: 'color',
				  size: 195
				}).make(this.$refs.result);
			},
			download(){
				let resultCanvas = this.$refs.result.children[0];
				let type = "image/png";
				let image = resultCanvas.toDataURL(type).replace(type, "image/octet-stream");
				window.location.href = image;
			}
		},
		mounted(){
			let img = this.$refs.origin;
			this.generateQRcode(img.src);
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
	.primary {
		position: relative;
		input{
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			opacity: 0;
			width: 100%;
		}
	}
</style>