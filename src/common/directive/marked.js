import marked from 'marked';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});


let install = function(Vue){
	/* istanbul ignore if */
	if (install.installed) return;
	Vue.directive('marked',function(el,binding,vnode){
		el.innerHTML = marked(el.innerHTML);
	})
}

export default install;