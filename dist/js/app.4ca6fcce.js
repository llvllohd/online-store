(function(e){function t(t){for(var a,i,o=t[0],s=t[1],l=t[2],u=0,f=[];u<o.length;u++)i=o[u],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&f.push(r[i][0]),r[i]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);d&&d(t);while(f.length)f.shift()();return c.push.apply(c,l||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],a=!0,i=1;i<n.length;i++){var o=n[i];0!==r[o]&&(a=!1)}a&&(c.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},i={app:0},r={app:0},c=[];function o(e){return s.p+"js/"+({About:"About","Item Details~Menu Items":"Item Details~Menu Items","Item Details":"Item Details","Menu Items":"Menu Items",Login:"Login",Settings:"Settings"}[e]||e)+"."+{About:"de45bd4e","Item Details~Menu Items":"9360ab52","Item Details":"f83b1a35","Menu Items":"778b32d3",Login:"a4d55315",Settings:"69ca35be"}[e]+".js"}function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={"Item Details~Menu Items":1,"Item Details":1,"Menu Items":1};i[e]?t.push(i[e]):0!==i[e]&&n[e]&&t.push(i[e]=new Promise((function(t,n){for(var a="css/"+({About:"About","Item Details~Menu Items":"Item Details~Menu Items","Item Details":"Item Details","Menu Items":"Menu Items",Login:"Login",Settings:"Settings"}[e]||e)+"."+{About:"31d6cfe0","Item Details~Menu Items":"978992ba","Item Details":"dd81658e","Menu Items":"0e8f33d4",Login:"31d6cfe0",Settings:"31d6cfe0"}[e]+".css",r=s.p+a,c=document.getElementsByTagName("link"),o=0;o<c.length;o++){var l=c[o],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===a||u===r))return t()}var f=document.getElementsByTagName("style");for(o=0;o<f.length;o++){l=f[o],u=l.getAttribute("data-href");if(u===a||u===r)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var a=t&&t.target&&t.target.src||r,c=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=a,delete i[e],d.parentNode.removeChild(d),n(c)},d.href=r;var m=document.getElementsByTagName("head")[0];m.appendChild(d)})).then((function(){i[e]=0})));var a=r[e];if(0!==a)if(a)t.push(a[2]);else{var c=new Promise((function(t,n){a=r[e]=[t,n]}));t.push(a[2]=c);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,s.nc&&u.setAttribute("nonce",s.nc),u.src=o(e);var f=new Error;l=function(t){u.onerror=u.onload=null,clearTimeout(d);var n=r[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+a+": "+i+")",f.name="ChunkLoadError",f.type=a,f.request=i,n[1](f)}r[e]=void 0}};var d=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var f=0;f<l.length;f++)t(l[f]);var d=u;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},4528:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("7a23"),i=n("ad3d"),r=n("ecee"),c=n("c074");function o(e,t,n,i,r,c){var o=Object(a["A"])("header-component"),s=Object(a["A"])("router-view");return Object(a["t"])(),Object(a["e"])(a["a"],null,[Object(a["i"])(o),Object(a["i"])(s)],64)}n("b0c0");var s=Object(a["H"])("data-v-7584bc06");Object(a["w"])("data-v-7584bc06");var l={class:"w-full h-16 fixed bg-gray-900 flex flex-row items-center px-3 z-50",id:"header"},u=Object(a["i"])("div",{class:"menu-btn__line bg-white rounded w-8 h-1 flex items-center justify-center duration-500 transition ease-in-out"},null,-1),f=Object(a["g"])('<div class="w-2/5 h-full hidden sm:flex" data-v-7584bc06><div class="flex mx-5" data-v-7584bc06><img class="rounded-full h-14 w-14 mx-auto my-auto" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="" data-v-7584bc06></div><div class="flex mx-5" data-v-7584bc06><h5 class="text-white text-lg font-bold my-auto" data-v-7584bc06>My Project</h5></div></div>',1),d={class:"w-3/5 h-full hidden sm:flex flex-row justify-start items-center space-x-5 md:space-x-10 cursor-pointer"},m={key:0,class:"side-menu sidebar-custom-height bg-gray-900 w-3/6 fixed sm:hidden z-50"},b=Object(a["i"])("div",{class:"h-40 flex flex-col items-center justify-center space-y-2"},[Object(a["i"])("div",{class:"side-menu w-20 h-20"},[Object(a["i"])("img",{class:"rounded-full mx-auto my-auto",src:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",alt:""})]),Object(a["i"])("div",{class:"side-menu title relative flex"},[Object(a["i"])("h5",{class:" text-white text-lg font-bold my-auto"},"My Project")])],-1),p={class:"w-full h-full flex flex-col justify-start items-center pt-11"},h={class:"flex items-center justify-center w-1/4"},g={class:"flex items-center w-2/4"},v={class:"text-lg"};Object(a["u"])();var j=s((function(e,t,n,i,r,c){var o=Object(a["A"])("router-link"),j=Object(a["A"])("fa"),O=Object(a["A"])("fa-layer");return Object(a["t"])(),Object(a["e"])(a["a"],null,[Object(a["i"])("nav",l,[Object(a["i"])("div",{class:["relative w-10 h-10 ring-1 ring-white rounded cursor-pointer flex items-center justify-center sm:hidden transition duration-500 ease-in-out",i.isToggle?"open":""],onClick:t[1]||(t[1]=Object(a["G"])((function(){return i.toggleMenu&&i.toggleMenu.apply(i,arguments)}),["stop"]))},[u],2),f,Object(a["i"])("ul",d,[(Object(a["t"])(!0),Object(a["e"])(a["a"],null,Object(a["z"])(i.navigation,(function(e){return Object(a["t"])(),Object(a["e"])("li",{key:e.name,class:"nav text-white text-lg font-bold relative p-1"},[Object(a["i"])(o,{to:e.path,class:"nav-lg"},{default:s((function(){return[Object(a["h"])(Object(a["C"])(e.name),1)]})),_:2},1032,["to"])])})),128))])]),Object(a["i"])(a["b"],{"enter-active-class":"animate__animated animate__slideInLeft","leave-active-class":"animate__animated animate__slideOutLeft"},{default:s((function(){return[i.isToggle?(Object(a["t"])(),Object(a["e"])("div",m,[b,Object(a["i"])("ul",p,[(Object(a["t"])(!0),Object(a["e"])(a["a"],null,Object(a["z"])(i.navigation,(function(e){return Object(a["t"])(),Object(a["e"])("li",{key:e.name,class:"nav text-white font-bold flex w-full items-center justify-center"},[Object(a["i"])(o,{exact:"",to:e.path,onClick:function(t){return i.gotoLinks(e)},class:"w-full p-2 flex items-center justify-center"},{default:s((function(){return[Object(a["i"])("div",h,[Object(a["i"])("span",null,[Object(a["i"])(O,{class:"text-xl"},{default:s((function(){return[Object(a["i"])(j,{icon:["fa","circle"]}),Object(a["i"])(j,{icon:["fa",e.icon],class:"text-gray-900 text-center",transform:"shrink-5"},null,8,["icon"])]})),_:2},1024)])]),Object(a["i"])("div",g,[Object(a["i"])("span",v,Object(a["C"])(e.name),1)])]})),_:2},1032,["to","onClick"])])})),128))])])):Object(a["f"])("",!0)]})),_:1})],64)})),O=n("6c02"),y=[{name:"Home",icon:"home",path:"/",current:!0},{name:"About",icon:"info",path:"about",current:!1},{name:"Settings",icon:"cog",path:"settings",current:!1},{name:"Login",icon:"sign-in-alt",path:"login",current:!1}],x={name:"Navigation",setup:function(){var e=Object(O["d"])(),t=Object(a["y"])(!1),n=Object(a["y"])(""),i=function(){t.value?t.value=!1:t.value=!0},r=function(e){e.target.parentElement.classList.contains("side-menu")||e.target.classList.contains("side-menu")||(t.value=!1)},c=function(a){t.value=!1,e.push(a.path),n.value=a.name};return Object(a["r"])((function(){document.addEventListener("click",r)})),Object(a["p"])((function(){document.removeEventListener("click",r)})),{isToggle:t,toggleMenu:i,navigation:y,gotoLinks:c,selected_nav_name:n}}};n("74b5");x.render=j,x.__scopeId="data-v-7584bc06";var w=x,I={name:"App",components:{HeaderComponent:w}};I.render=o;var M=I,_=(n("def6"),n("77ed"),n("d3b7"),n("3ca3"),n("ddb0"),n("ac1f"),n("466d"),n("5319"),[{path:"/",name:"Menu Items",component:function(){return Promise.all([n.e("Item Details~Menu Items"),n.e("Menu Items")]).then(n.bind(null,"b741"))}},{path:"/item-details/:id",name:"Item Details",component:function(){return Promise.all([n.e("Item Details~Menu Items"),n.e("Item Details")]).then(n.bind(null,"b4cc"))}},{path:"/about",name:"About",component:function(){return n.e("About").then(n.bind(null,"2089"))}},{path:"/settings",name:"Settings",component:function(){return n.e("Settings").then(n.bind(null,"3073"))}},{path:"/login",name:"Login",component:function(){return n.e("Login").then(n.bind(null,"418c"))}}]),L=Object(O["a"])({history:Object(O["b"])(),routes:_,scrollBehavior:function(){return{top:0}}});L.onError((function(e){var t=/Loading chunk (\d)+ failed/g,n=e.message.match(t),a=L.history.pending.fullPath;n&&L.replace(a)}));var D=L;r["c"].add(c["c"],c["d"],c["e"],c["b"],c["a"]);var k=Object(a["d"])(M);k.component("fa",i["a"]),k.component("fa-layer",i["b"]),k.use(D),k.mount("#app")},"74b5":function(e,t,n){"use strict";n("4528")},def6:function(e,t,n){}});
//# sourceMappingURL=app.4ca6fcce.js.map