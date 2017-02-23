<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tabs">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/comment">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/business">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import header from 'components/header/header.vue';

const ERR_OK = 0;

export default {
  data:function(){
    return {
      seller:{}
    }
  },
  created:function(){
    this.$http.get('/api/seller').then(function(response){
      if (response.body.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, response.body.data);
        }
    });
  },
  components:{
    'v-header':header
  }
}
</script>

<style>
  .tabs{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  .tab-item{
    flex: 1;
    text-align: center;
  }
  a{
    display: block;
  }
  .tab-active{
    background: #f00;
  }
</style>
