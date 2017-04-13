// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import axios from 'axios'
Vue.prototype.$http = axios
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './libs/jquery.min.js'
import Marked from './common/directive/marked.js'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(Marked);

import App from './App'
import article from 'components/article/article'
import comment from 'components/comment/comment'
import my from 'components/my/my'
import login from 'components/my/login/login'



const routes = [
	{path:'/',component: article},
	{path:'/article',component:article},
	{path:'/comment',component:comment},
	{path:'/my',component:my},
	{path:'/my/login',component:login}
];

let router = new VueRouter({
	routes,
	linkActiveClass:'tab-active'
});

// router.push(routes[0]);//默认选中第一条

//聚合网笑话appkey
window.articleKey = '7e69e71b2fe39a230367f65d590ceb6c'; 

 // eslint-disable no-new 
new Vue({
	el: '#app',
	router: router,
	components: {App}
})

