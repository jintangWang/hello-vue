 <template>
 	<div>
	    <el-table
	      :data="tableData"
	      border
	      style="width: 100%" 
	      highlight-current-row
	      @current-change="selectCur" 
	      :default-sort="{prop:'date',order:'descending'}"
	    >
		    <el-table-column 
				type="selection"
		    >
		    </el-table-column>
		      <el-table-column
		      prop="date"
		      label="日期"
		      sortable 
		      show-overflow-tooltip
		    >
		      <template scope="scope">
		        <el-icon name="time"></el-icon>
		        <span style="margin-left: 10px">{{ scope.row.date }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="姓名"
		      sortable
		      :formatter="formatter"
		      show-overflow-tooltip
		    >
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="地址"
		      show-overflow-tooltip
		    >
		    </el-table-column>
		    <el-table-column
		      prop="zip"
		      label="邮编"
		    >
		    </el-table-column>
		    <el-table-column
		      label="操作"
		    >
		      <template scope="scope">
		        <el-button type="text" size="small">编辑</el-button>
		      </template>
		    </el-table-column>
	    </el-table>
	    <el-pagination
          layout="sizes,prev,pager,next"
          :total="data.length" 
          :page-size="pageSize" 
          :page-sizes="pageSizes" 
          :current-page="curPage" 
          @size-change="sizeChange" 
          @current-change="currentChange"
          >
        </el-pagination>
    </div>
  </template>
<script>
	let data = [
					{
						date: '2016-05-03',
						name: '王小虎',
						province: '上海',
						city: '普陀区',
						address: '上海市普陀区金沙江路 1518 弄',
						zip: 200333
					}, {
						date: '2016-05-02',
						name: '王大虎',
						province: '上海',
						city: '普陀区',
						address: '上海市普陀区金沙江路 1518 弄',
						zip: 200333
					}, {
						date: '2016-05-04',
						name: '李小虎',
						province: '上海',
						city: '普陀区',
						address: '上海市普陀区金沙江路 1518 弄',
						zip: 200333
					}, {
						date: '2016-05-01',
						name: '李大虎',
						province: '上海',
						city: '普陀区',
						address: '上海市普陀区金沙江路 1518 弄',
						zip: 200333
					}
				];

	export default {
		data() {
			return {
				pageSize:2,
				pageSizes:[2,5,10],
				curPage : 1,
				data: data
			}
		},
		methods: {
			selectCur:function(){
				
			},
			formatter:function(row,col){
				return row.name+'小哥';
			},
			sizeChange:function(size){
				this.pageSize = size;
			},
			currentChange:function(page) {
				this.curPage = page;
			}
		},
		computed:{
			tableData: function(){
				return data.slice((this.curPage-1)*this.pageSize,this.curPage*this.pageSize);
			}
		}
	};
</script>

<style lang="scss">
	.content1{
		width: 30%;
	}
	.content2{
		width: 20%;
	}
	.content3{
		width: 50%;
	}
	.el-table{
		.info-row{
			background: #c9e5f5;
		}
		.positive-row{
			background: #e2f0e4;
		}
	}
</style>