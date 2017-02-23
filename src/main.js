// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'

import goods from 'components/goods/goods'
import comment from 'components/comment/comment'
import business from 'components/business/business'

Vue.use(VueRouter);
Vue.use(VueResource);

// let Goods = Vue.extend(goods);


const Bar = { template: '<div>bar</div>' }

const routes = [
	{path:'/goods',component:goods},//component:可以是goods，也可以是Goods
	{path:'/comment',component:comment},
	{path:'/business',component:business}
];

let router = new VueRouter({
	routes,
	linkActiveClass:'tab-active'
});

router.push(routes[0]);//默认选中第一条

 // eslint-disable no-new 
new Vue({
	el: '#app',
	router: router,
	components: {App}
})

