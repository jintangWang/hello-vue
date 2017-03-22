<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tabs">
      <div class="tab-item">
        <router-link to="/article">文章</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/comment">其他</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/my">我的</router-link>
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
    },
    components:{
      'v-header':header
    }
  }
</script>

<style lang="scss">
  @import "./common/scss/_base.scss";

  html{
    font-family: $font-family;
    font-size: $font-size;
  }
  .tabs{
    display: flex;
    width: 100%;
    height: 39px;
    position: fixed;
    bottom: 0;
    line-height: 39px;
    background: #e8e8e8;
    border-top: 1px solid #ccc;
    .tab-item{
      flex: 1;
      text-align: center;
    }
    a{
      display: block;
    }
  }
  .tab-active{
    color: #006edb;
  }
</style>
