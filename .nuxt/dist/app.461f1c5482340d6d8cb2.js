webpackJsonp([3],{"/sOn":function(t,e,n){"use strict";var r=n("/5sW"),o=n("HBB+"),a=n("ct3O"),i=n("YLfZ");e.a={name:"nuxt",props:["nuxtChildKey"],beforeCreate:function(){r.default.util.defineReactive(this,"nuxt",this.$root.$options._nuxt)},computed:{routerViewKey:function(){return void 0!==this.nuxtChildKey||this.$route.matched.length>1?this.nuxtChildKey||Object(i.b)(this.$route.matched[0].path)(this.$route.params):this.$route.fullPath.split("#")[0]}},components:{NuxtChild:o.a,NuxtError:a.a}}},"0F0d":function(t,e,n){"use strict";e.a={name:"no-ssr",props:["placeholder"],data:function(){return{canRender:!1}},mounted:function(){this.canRender=!0},render:function(t){return this.canRender?this.$slots.default[0]:t("div",{class:{"no-ssr-placeholder":!0}},this.placeholder)}}},"3hZA":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.nuxt.err?n("nuxt-error",{attrs:{error:t.nuxt.err}}):n("nuxt-child",{key:t.routerViewKey})},o=[],a={render:r,staticRenderFns:o};e.a=a},"3uRN":function(t,e,n){"use strict";var r=n("lbHh"),o=n.n(r);e.a={getItem:function(t){return o.a.get(t)},removeItem:function(t){return o.a.remove(t)},setItem:function(t,e){return o.a.set(t,e)}}},"3zNt":function(t,e,n){"use strict";var r=n("jjx8"),o=n.n(r),a=n("t8Qu"),i=n.n(a),s=n("ciwQ"),u=n.n(s),c=n("3uRN"),f=n("o1gF"),l=n.n(f),d=n("mtWM"),p=n.n(d),h=o()().configure(l()("http://localhost:3030").axios(p.a)).configure(u()()).configure(i()({storage:c.a}));e.a=h},"56Se":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"__nuxt-error-page"},[n("div",{staticClass:"error"},[n("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"90",height:"90",fill:"#DBE1EC",viewBox:"0 0 48 48"}},[n("path",{attrs:{d:"M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"}})]),n("div",{staticClass:"title"},[t._v(t._s(t.message))]),404===t.statusCode?n("p",{staticClass:"description"},[n("nuxt-link",{staticClass:"error-link",attrs:{to:"/"}},[t._v("Back to the home page")])],1):t._e(),t._m(0)])])},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"logo"},[n("a",{attrs:{href:"https://nuxtjs.org",target:"_blank",rel:"noopener"}},[t._v("Nuxt.js")])])}],a={render:r,staticRenderFns:o};e.a=a},D5hi:function(t,e){},DAwM:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"nuxt-progress",style:{width:t.percent+"%",height:t.height,"background-color":t.canSuccess?t.color:t.failedColor,opacity:t.show?1:0}})},o=[],a={render:r,staticRenderFns:o};e.a=a},F88d:function(t,e,n){"use strict";function r(t){n("D5hi")}var o=n("hdAb"),a=n("DAwM"),i=n("VU/8"),s=r,u=i(o.a,a.a,s,null,null);e.a=u.exports},"HBB+":function(t,e,n){"use strict";var r=(n("/5sW"),["name","mode","appear","css","type","duration","enterClass","leaveClass","appearClass","enterActiveClass","enterActiveClass","leaveActiveClass","appearActiveClass","enterToClass","leaveToClass","appearToClass"]),o=["beforeEnter","enter","afterEnter","enterCancelled","beforeLeave","leave","afterLeave","leaveCancelled","beforeAppear","appear","afterAppear","appearCancelled"];e.a={name:"nuxt-child",functional:!0,render:function(t,e){var n=e.parent,a=e.data;a.nuxtChild=!0;for(var i=n,s=n.$nuxt.nuxt.transitions,u=n.$nuxt.nuxt.defaultTransition,c=0;n;)n.$vnode&&n.$vnode.data.nuxtChild&&c++,n=n.$parent;a.nuxtChildDepth=c;var f=s[c]||u,l={};r.forEach(function(t){void 0!==f[t]&&(l[t]=f[t])});var d={};return o.forEach(function(t){"function"==typeof f[t]&&(d[t]=f[t].bind(i))}),t("transition",{props:l,on:d},[t("router-view",a)])}}},HClo:function(t,e,n){"use strict";var r=n("//Fk"),o=n.n(r),a=n("/5sW"),i=n("F88d"),s=n("uMhA"),u=(n.n(s),n("Q2+L")),c=(n.n(u),{_default:function(){return n.e(0).then(n.bind(null,"pfKW")).then(function(t){return t.default||t})}}),f={};e.a={head:{titleTemplate:"Linda",meta:[{charset:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1"},{hid:"description",name:"description",content:"A Feathers + Nuxt demo/boilerplate"}],link:[{rel:"icon",type:"image/x-icon",href:"/client/static/v.png"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"}],style:[],script:[]},data:function(){return{layout:null,layoutName:""}},beforeCreate:function(){a.default.util.defineReactive(this,"nuxt",this.$options._nuxt)},created:function(){a.default.prototype.$nuxt=this,"undefined"!=typeof window&&(window.$nuxt=this),this.error=this.nuxt.error},mounted:function(){this.$loading=this.$refs.loading},watch:{"nuxt.err":"errorChanged"},methods:{errorChanged:function(){this.nuxt.err&&this.$loading&&(this.$loading.fail&&this.$loading.fail(),this.$loading.finish&&this.$loading.finish())},setLayout:function(t){t&&f["_"+t]||(t="default"),this.layoutName=t;var e="_"+t;return this.layout=f[e],this.layout},loadLayout:function(t){var e=this;t&&(c["_"+t]||f["_"+t])||(t="default");var n="_"+t;return f[n]?o.a.resolve(f[n]):c[n]().then(function(t){return f[n]=t,delete c[n],f[n]}).catch(function(t){if(e.$nuxt)return e.$nuxt.error({statusCode:500,message:t.message})})}},components:{NuxtLoading:i.a}}},J2Ti:function(t,e,n){"use strict";function r(t){var e=l(t),n=e.default||e;if(n.commit)throw new Error("[nuxt] store/"+t.replace("./","")+" should export a method which returns a Vuex instance.");if(n.state&&"function"!=typeof n.state)throw new Error("[nuxt] state should be a function in store/"+t.replace("./",""));return n}function o(t,e){if(1===e.length)return t.modules;var n=e.shift();return t.modules[n]=t.modules[n]||{},t.modules[n].namespaced=!0,t.modules[n].modules=t.modules[n].modules||{},o(t.modules[n],e)}n.d(e,"a",function(){return C});var a=n("woOf"),i=n.n(a),s=n("BO1k"),u=n.n(s),c=n("/5sW"),f=n("NYxO");c.default.use(f.default);var l=n("Z0Vh"),d=l.keys(),p={},h=void 0;if(d.forEach(function(t){-1!==t.indexOf("./index.")&&(h=t)}),h&&(p=r(h)),"function"!=typeof p){p.modules||(p.modules={});var v=!0,m=!1,x=void 0;try{for(var _,y=u()(d);!(v=(_=y.next()).done);v=!0){var w=_.value,g=w.replace(/^\.\//,"").replace(/\.(js|ts)$/,"");if("index"!==g){var b=g.split(/\//),t=o(p,b);g=b.pop(),t[g]=r(w),t[g].namespaced=!0}}}catch(t){m=!0,x=t}finally{try{!v&&y.return&&y.return()}finally{if(m)throw x}}}var C=p instanceof Function?p:function(){return new f.default.Store(i()({strict:!1},p,{state:p.state instanceof Function?p.state():{}}))}},PBYG:function(t,e,n){"use strict";e.a=function(t){var e=t.headers.cookie,n={};return e&&e.split(";").forEach(function(t){var e=t.split("=");n[e.shift().trim()]=decodeURI(e.join("="))}),n}},"Q2+L":function(t,e){},T23V:function(t,e,n){"use strict";function r(t,e){if(!t||!t.options||!t.options[e])return{};var n=t.options[e];if("function"==typeof n){for(var r=arguments.length,o=Array(r>2?r-2:0),a=2;a<r;a++)o[a-2]=arguments[a];return n.apply(void 0,o)}return n}function o(t,e,n){var o=function(t){var o=r(t,"transition",e,n)||{};return"string"==typeof o?{name:o}:o};return t.map(function(t){var e=g()({},o(t));if(n&&n.matched.length&&n.matched[0].components.default){var r=o(n.matched[0].components.default);y()(r).filter(function(t){return r[t]&&-1!==t.toLowerCase().indexOf("leave")}).forEach(function(t){e[t]=r[t]})}return e})}function a(t){var e=Object(j.e)(t.options.base,t.options.mode);return Object(j.c)(t.match(e),function(t,e,n,r,o){if("function"!=typeof t||t.options){var a=Object(j.j)(t);return n.components[r]=a,a}return t().then(function(t){var e=Object(j.j)(t);return L.serverRendered&&(Object(j.a)(e,L.data[o]),L.components&&(t.options.components=g()(e.options.components,L.components[o])),e._Ctor=e),n.components[r]=e,e})})}function i(t,e,n){var r=this,o=[],a=!1;if(void 0!==n&&(o=[],n.middleware&&(o=o.concat(n.middleware)),t.forEach(function(t){t.options.middleware&&(o=o.concat(t.options.middleware))})),o=o.map(function(t){return"function"!=typeof C.a[t]&&(a=!0,r.error({statusCode:500,message:"Unknown middleware "+t})),C.a[t]}),!a)return Object(j.h)(o,e)}function s(t,e){Object(j.c)(t,function(t,e,n,r){return"object"!==(void 0===t?"undefined":l()(t))||t.options||(t=b.default.extend(t),t._Ctor=t,n.components[r]=t),t})}function u(t,e){var n=this;this._hashChanged||b.default.nextTick(function(){var e=Object(j.g)(t);T=e.map(function(t,e){if(!t)return"";if(R[e]===t.constructor._path&&"function"==typeof t.constructor.options.data){var n=t.constructor.options.data.call(t);for(var r in n)b.default.set(t.$data,r,n[r])}return t.constructor.options.__file}),n._hadError&&n._dateLastError===n.$options._nuxt.dateErr&&n.error();var r=n.$options._nuxt.err?$.a.layout:t.matched[0].components.default.options.layout;"function"==typeof r&&(r=r(n._context)),n.setLayout(r)})}function c(t){window._nuxtReadyCbs.forEach(function(e){"function"==typeof e&&e(t)}),"function"==typeof window._onNuxtLoaded&&window._onNuxtLoaded(t),N.afterEach(function(e,n){t.$nuxt.$emit("routeChanged",e,n)})}Object.defineProperty(e,"__esModule",{value:!0});var f=n("pFYg"),l=n.n(f),d=n("Xxa5"),p=n.n(d),h=n("//Fk"),v=n.n(h),m=n("exGp"),x=n.n(m),_=n("fZjL"),y=n.n(_),w=n("woOf"),g=n.n(w),b=n("/5sW"),C=n("unZF"),$=n("qcny"),j=n("YLfZ"),k=function(){var t=x()(p.a.mark(function t(e,n,r){var o,a,i;return p.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return o=n.fullPath.split("#")[0],a=e.fullPath.split("#")[0],this._hashChanged=o===a,!this._hashChanged&&this.$loading.start&&this.$loading.start(),t.prev=4,t.next=7,v.a.all(Object(j.c)(e,function(t,e,n,r){if("function"!=typeof t||t.options){var o=Object(j.j)(t);return n.components[r]=o,o}return t().then(function(t){var e=Object(j.j)(t);return n.components[r]=e,e})}));case 7:r(),t.next=16;break;case 10:t.prev=10,t.t0=t.catch(4),t.t0||(t.t0={}),i=t.t0.statusCode||t.t0.status||t.t0.response&&t.t0.response.status||500,this.error({statusCode:i,message:t.t0.message}),r(!1);case 16:case"end":return t.stop()}},t,this,[[4,10]])}));return function(e,n,r){return t.apply(this,arguments)}}(),E=function(){var t=x()(p.a.mark(function t(e,n,r){var a,s,u,c,f,l,d,h,m=this;return p.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!this._hashChanged){t.next=2;break}return t.abrupt("return",r());case 2:if(a=!1,s=function(t){m.$loading.finish&&m.$loading.finish(),a||(a=!0,r(t))},u=Object(j.d)({to:e,from:n,store:F,isClient:!0,next:s.bind(this),error:this.error.bind(this)},A),this._context=u,this._dateLastError=this.$options._nuxt.dateErr,this._hadError=!!this.$options._nuxt.err,c=Object(j.f)(e),c.length){t.next=23;break}return t.next=12,i.call(this,c,u);case 12:if(!u._redirected){t.next=14;break}return t.abrupt("return");case 14:return t.next=16,this.loadLayout("function"==typeof $.a.layout?$.a.layout(u):$.a.layout);case 16:return f=t.sent,t.next=19,i.call(this,c,u,f);case 19:if(!u._redirected){t.next=21;break}return t.abrupt("return");case 21:return this.error({statusCode:404,message:"This page could not be found"}),t.abrupt("return",r());case 23:return c.forEach(function(t){t._Ctor&&t._Ctor.options&&(t.options.asyncData=t._Ctor.options.asyncData,t.options.fetch=t._Ctor.options.fetch)}),this.setTransitions(o(c,e,n)),t.prev=25,t.next=28,i.call(this,c,u);case 28:if(!u._redirected){t.next=30;break}return t.abrupt("return");case 30:return l=c[0].options.layout,"function"==typeof l&&(l=l(u)),t.next=34,this.loadLayout(l);case 34:return l=t.sent,t.next=37,i.call(this,c,u,l);case 37:if(!u._redirected){t.next=39;break}return t.abrupt("return");case 39:if(d=!0,c.forEach(function(t){d&&"function"==typeof t.options.validate&&(d=t.options.validate({params:e.params||{},query:e.query||{},store:u.store}))}),d){t.next=44;break}return this.error({statusCode:404,message:"This page could not be found"}),t.abrupt("return",r());case 44:return t.next=46,v.a.all(c.map(function(t,n){if(t._path=Object(j.b)(e.matched[n].path)(e.params),!m._hadError&&m._isMounted&&t._path===R[n]&&n+1!==c.length)return v.a.resolve();var r=[],o=t.options.asyncData&&"function"==typeof t.options.asyncData,a=!!t.options.fetch,i=o&&a?30:45;if(o){var s=Object(j.i)(t.options.asyncData,u).then(function(e){Object(j.a)(t,e),m.$loading.increase&&m.$loading.increase(i)});r.push(s)}if(a){var f=t.options.fetch(u);f&&(f instanceof v.a||"function"==typeof f.then)||(f=v.a.resolve(f)),f.then(function(t){m.$loading.increase&&m.$loading.increase(i)}),r.push(f)}return v.a.all(r)}));case 46:R=c.map(function(t,n){return Object(j.b)(e.matched[n].path)(e.params)}),this.$loading.finish&&this.$loading.finish(),a||r(),t.next=62;break;case 51:return t.prev=51,t.t0=t.catch(25),t.t0||(t.t0={}),R=[],t.t0.statusCode=t.t0.statusCode||t.t0.status||t.t0.response&&t.t0.response.status||500,h=$.a.layout,"function"==typeof h&&(h=h(u)),t.next=60,this.loadLayout(h);case 60:this.error(t.t0),r(!1);case 62:case"end":return t.stop()}},t,this,[[25,51]])}));return function(e,n,r){return t.apply(this,arguments)}}(),O=function(){var t=x()(p.a.mark(function t(e){var n,r,i,f;return p.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return A=e.app,N=e.router,F=e.store,t.next=5,v.a.all(a(N));case 5:return n=t.sent,r=new b.default(A),i=L.layout||"default",t.next=10,r.loadLayout(i);case 10:if(r.setLayout(i),f=function(){r.$mount("#__nuxt"),b.default.nextTick(function(){c(r)})},r.setTransitions=r.$options._nuxt.setTransitions.bind(r),n.length&&(r.setTransitions(o(n,N.currentRoute)),R=N.currentRoute.matched.map(function(t){return Object(j.b)(t.path)(N.currentRoute.params)}),T=n.map(function(t){return t.options.__file})),r.error=r.$options._nuxt.error.bind(r),r.$loading={},L.error&&r.error(L.error),N.beforeEach(k.bind(r)),N.beforeEach(E.bind(r)),N.afterEach(s),N.afterEach(u.bind(r)),!L.serverRendered){t.next=24;break}return f(),t.abrupt("return");case 24:E.call(r,N.currentRoute,N.currentRoute,function(t){if(!t)return s(N.currentRoute,N.currentRoute),u.call(r,N.currentRoute,N.currentRoute),void f();var e=!1;N.afterEach(function(){e||(e=!0,f())}),N.push(t)});case 25:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),R=[],T=[],A=void 0,N=void 0,F=void 0,L=window.__NUXT__||{};L.components=window.__COMPONENTS__||null,Object($.b)().then(O).catch(function(t){console.error("[nuxt] Error while initializing app",t)})},WRRc:function(t,e,n){"use strict";n("/5sW");e.a={name:"nuxt-link",functional:!0,render:function(t,e){return t("router-link",e.data,e.children)}}},YLfZ:function(t,e,n){"use strict";function r(t,e){var n=t.options.data||T;!e&&t.options.hasAsyncData||(t.options.hasAsyncData=!0,t.options.data=function(){var r=n.call(this);return this.$ssrContext&&(e=this.$ssrContext.asyncData[t.cid]),O()({},r,e)},t._Ctor&&t._Ctor.options&&(t._Ctor.options.data=t.options.data))}function o(t){return t.options?(t._Ctor=t,t.extendOptions=t.options):(t=R.default.extend(t),t._Ctor=t),!t.options.name&&t.options.__file&&(t.options.name=t.options.__file),t}function a(t){return[].concat.apply([],t.matched.map(function(t){return k()(t.components).map(function(e){return t.components[e]})}))}function i(t){return[].concat.apply([],t.matched.map(function(t){return k()(t.instances).map(function(e){return t.instances[e]})}))}function s(t,e){return Array.prototype.concat.apply([],t.matched.map(function(t,n){return k()(t.components).map(function(r){return e(t.components[r],t.instances[r],t,r,n)})}))}function u(t,e){var n={isServer:!!t.isServer,isClient:!!t.isClient,isStatic:!1,isDev:!1,isHMR:t.isHMR||!1,app:e,store:t.store,route:t.to?t.to:t.route,payload:t.payload,error:t.error,base:"/",env:{}},r=t.next;return n.params=n.route.params||{},n.query=n.route.query||{},n.redirect=function(t,e,o){t&&(n._redirected=!0,"string"!=typeof t||void 0!==e&&"object"!==(void 0===e?"undefined":$()(e))||(o=e||{},e=t,t=302),r({path:e,query:o,status:t}))},t.req&&(n.req=t.req),t.res&&(n.res=t.res),t.from&&(n.from=t.from),n.isServer&&t.beforeRenderFns&&(n.beforeNuxtRender=function(e){return t.beforeRenderFns.push(e)}),n.isClient&&window.__NUXT__&&(n.serverState=window.__NUXT__),n}function c(t,e){return!t.length||e._redirected?b.a.resolve():f(t[0],e).then(function(){return c(t.slice(1),e)})}function f(t,e){var n=void 0;return n=2===t.length?new b.a(function(n){t(e,function(t,r){t&&e.error(t),r=r||{},n(r)})}):t(e),n&&(n instanceof b.a||"function"==typeof n.then)||(n=b.a.resolve(n)),n}function l(t,e){var n=window.location.pathname;return"hash"===e?window.location.hash.replace(/^#\//,""):(t&&0===n.indexOf(t)&&(n=n.slice(t.length)),(n||"/")+window.location.search+window.location.hash)}function d(t,e){return m(p(t,e))}function p(t,e){for(var n,r=[],o=0,a=0,i="",s=e&&e.delimiter||"/";null!=(n=A.exec(t));){var u=n[0],c=n[1],f=n.index;if(i+=t.slice(a,f),a=f+u.length,c)i+=c[1];else{var l=t[a],d=n[2],p=n[3],h=n[4],v=n[5],m=n[6],y=n[7];i&&(r.push(i),i="");var w=null!=d&&null!=l&&l!==d,g="+"===m||"*"===m,b="?"===m||"*"===m,C=n[2]||s,$=h||v;r.push({name:p||o++,prefix:d||"",delimiter:C,optional:b,repeat:g,partial:w,asterisk:!!y,pattern:$?_($):y?".*":"[^"+x(C)+"]+?"})}}return a<t.length&&(i+=t.substr(a)),i&&r.push(i),r}function h(t){return encodeURI(t).replace(/[\/?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function v(t){return encodeURI(t).replace(/[?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function m(t){for(var e=new Array(t.length),n=0;n<t.length;n++)"object"===$()(t[n])&&(e[n]=new RegExp("^(?:"+t[n].pattern+")$"));return function(n,r){for(var o="",a=n||{},i=r||{},s=i.pretty?h:encodeURIComponent,u=0;u<t.length;u++){var c=t[u];if("string"!=typeof c){var f,l=a[c.name];if(null==l){if(c.optional){c.partial&&(o+=c.prefix);continue}throw new TypeError('Expected "'+c.name+'" to be defined')}if(Array.isArray(l)){if(!c.repeat)throw new TypeError('Expected "'+c.name+'" to not repeat, but received `'+w()(l)+"`");if(0===l.length){if(c.optional)continue;throw new TypeError('Expected "'+c.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(f=s(l[d]),!e[u].test(f))throw new TypeError('Expected all "'+c.name+'" to match "'+c.pattern+'", but received `'+w()(f)+"`");o+=(0===d?c.prefix:c.delimiter)+f}}else{if(f=c.asterisk?v(l):s(l),!e[u].test(f))throw new TypeError('Expected "'+c.name+'" to match "'+c.pattern+'", but received "'+f+'"');o+=c.prefix+f}}else o+=c}return o}}function x(t){return t.replace(/([.+*?=^!:()[\]|\/\\])/g,"\\$1")}function _(t){return t.replace(/([=!:$\/()])/g,"\\$1")}e.a=r,e.j=o,e.f=a,e.g=i,e.c=s,e.d=u,e.h=c,e.i=f,e.e=l,e.b=d;var y=n("mvHQ"),w=n.n(y),g=n("//Fk"),b=n.n(g),C=n("pFYg"),$=n.n(C),j=n("fZjL"),k=n.n(j),E=n("Dd8w"),O=n.n(E),R=n("/5sW"),T=function(){return{}};window._nuxtReadyCbs=[],window.onNuxtReady=function(t){window._nuxtReadyCbs.push(t)};var A=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},Z0Vh:function(t,e,n){function r(t){return n(o(t))}function o(t){var e=a[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}var a={"./index.js":"cslI"};r.keys=function(){return Object.keys(a)},r.resolve=o,t.exports=r,r.id="Z0Vh"},cs8z:function(t,e,n){"use strict";var r=n("/sOn"),o=n("3hZA"),a=n("VU/8"),i=a(r.a,o.a,null,null,null);e.a=i.exports},cslI:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("/5sW"),o=n("NYxO"),a=n("ddF3"),i=n.n(a),s=n("3zNt"),u=n("PBYG");r.default.use(o.default);var c=new o.default.Store({state:{},actions:{nuxtServerInit:function(t,e){var n=t.dispatch,r=e.req,o=Object(u.a)(r)["feathers-jwt"];if(o)return n("auth/authenticate",{strategy:"jwt",accessToken:o})}}});s.a.configure(i()(c,{idField:"_id",auth:{userService:"/users"}})),e.default=function(){return c}},ct3O:function(t,e,n){"use strict";function r(t){n("mvrq")}var o=n("v0V/"),a=n("56Se"),i=n("VU/8"),s=r,u=i(o.a,a.a,s,null,null);e.a=u.exports},"gXG+":function(t,e,n){"use strict";var r=n("HClo"),o=n("oGj2"),a=n("VU/8"),i=a(r.a,o.a,null,null,null);e.a=i.exports},hdAb:function(t,e,n){"use strict";var r=n("/5sW");e.a={name:"nuxt-loading",data:function(){return{percent:0,show:!1,canSuccess:!0,duration:5e3,height:"2px",color:"#64dd17",failedColor:"red"}},methods:{start:function(){var t=this;return this.show=!0,this.canSuccess=!0,this._timer&&(clearInterval(this._timer),this.percent=0),this._cut=1e4/Math.floor(this.duration),this._timer=setInterval(function(){t.increase(t._cut*Math.random()),t.percent>95&&t.finish()},100),this},set:function(t){return this.show=!0,this.canSuccess=!0,this.percent=Math.floor(t),this},get:function(){return Math.floor(this.percent)},increase:function(t){return this.percent=this.percent+Math.floor(t),this},decrease:function(t){return this.percent=this.percent-Math.floor(t),this},finish:function(){return this.percent=100,this.hide(),this},pause:function(){return clearInterval(this._timer),this},hide:function(){var t=this;return clearInterval(this._timer),this._timer=null,setTimeout(function(){t.show=!1,r.default.nextTick(function(){setTimeout(function(){t.percent=0},200)})},500),this},fail:function(){return this.canSuccess=!1,this}}}},jgCI:function(t,e,n){function r(t){return n(o(t))}function o(t){var e=a[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}var a={"./check-auth.js":"rk7C"};r.keys=function(){return Object.keys(a)},r.resolve=o,t.exports=r,r.id="jgCI"},mtxM:function(t,e,n){"use strict";function r(){return new a.default({mode:"history",base:"/",linkActiveClass:"nuxt-link-active",linkExactActiveClass:"nuxt-link-exact-active",scrollBehavior:s,routes:[{path:"/",component:i,name:"index"}],fallback:!1})}e.a=r;var o=n("/5sW"),a=n("/ocq");o.default.use(a.default);var i=function(){return n.e(1).then(n.bind(null,"P7bJ")).then(function(t){return t.default||t})},s=function(t,e,n){if(n)return n;var r={};return t.matched.length<2?r={x:0,y:0}:t.matched.some(function(t){return t.components.default.options.scrollToTop})&&(r={x:0,y:0}),t.hash&&(r={selector:t.hash}),r}},mvrq:function(t,e){},"o1/s":function(t,e,n){"use strict";var r=n("/5sW"),o=n("3EgV"),a=n.n(o);r.default.use(a.a)},oGj2:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"__nuxt"}},[n("nuxt-loading",{ref:"loading"}),t.layout?n(t.nuxt.err?"nuxt":t.layout,{tag:"component"}):t._e()],1)},o=[],a={render:r,staticRenderFns:o};e.a=a},qcny:function(t,e,n){"use strict";n.d(e,"b",function(){return R});var r=n("Xxa5"),o=n.n(r),a=n("//Fk"),i=(n.n(a),n("C4MV")),s=n.n(i),u=n("woOf"),c=n.n(u),f=n("Dd8w"),l=n.n(f),d=n("exGp"),p=n.n(d),h=n("5o+h"),v=(n.n(h),n("/5sW")),m=n("p3jY"),x=n.n(m),_=n("mtxM"),y=n("0F0d"),w=n("HBB+"),g=n("WRRc"),b=n("ct3O"),C=n("cs8z"),$=n("gXG+"),j=n("YLfZ"),k=n("J2Ti"),E=n("o1/s"),O=n("3zNt");n.d(e,"a",function(){return b.a});var R=function(){var t=p()(o.a.mark(function t(e){var n,r,a,i,u,f,d,p;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(n=Object(_.a)(),r=Object(k.a)(),a=l()({router:n,store:r,_nuxt:{defaultTransition:T,transitions:[T],setTransitions:function(t){return Array.isArray(t)||(t=[t]),t=t.map(function(t){return t=t?"string"==typeof t?c()({},T,{name:t}):c()({},T,t):T}),this.$options._nuxt.transitions=t,t},err:null,dateErr:null,error:function(t){"string"==typeof(t=t||null)&&(t={statusCode:500,message:t});var e=this._nuxt||this.$options._nuxt;return e.dateErr=Date.now(),e.err=t,t}}},$.a),r.app=a,i=e?e.next:function(t){return a.router.push(t)},u=void 0,e?u=n.resolve(e.url).route:(f=Object(j.e)(n.options.base),u=n.resolve(f).route),d=Object(j.d)({isServer:!!e,isClient:!e,route:u,next:i,error:a._nuxt.error.bind(a),store:r,req:e?e.req:void 0,res:e?e.res:void 0,beforeRenderFns:e?e.beforeRenderFns:void 0},a),p=function(t,e){if(!t)throw new Error("inject(key, value) has no key provided");if(!e)throw new Error("inject(key, value) has no value provided");t="$"+t,a[t]=e,v.default.use(function(){var e="__nuxt_"+t+"_installed__";v.default[e]||(v.default[e]=!0,v.default.prototype.hasOwnProperty(t)||s()(v.default.prototype,t,{get:function(){return this.$root.$options[t]}}))}),r[t]=a[t]},window.__NUXT__&&window.__NUXT__.state&&r.replaceState(window.__NUXT__.state),"function"!=typeof E.default){t.next=13;break}return t.next=13,Object(E.default)(d,p);case 13:if("function"!=typeof O.a){t.next=16;break}return t.next=16,Object(O.a)(d,p);case 16:t.next=19;break;case 19:return t.abrupt("return",{app:a,router:n,store:r});case 20:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}();v.default.component(y.a.name,y.a),v.default.component(w.a.name,w.a),v.default.component(g.a.name,g.a),v.default.component(C.a.name,C.a),v.default.use(x.a,{keyName:"head",attribute:"data-n-head",ssrAttribute:"data-n-head-ssr",tagIDKeyName:"hid"});var T={name:"page",mode:"out-in",appear:!1,appearClass:"appear",appearActiveClass:"appear-active",appearToClass:"appear-to"}},rk7C:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){var e=t.store,n=t.redirect;e.state.auth.user||n("/sign-in")}},uMhA:function(t,e){},unZF:function(t,e,n){"use strict";var r=n("BO1k"),o=n.n(r),a=n("jgCI"),i=a.keys(),s={},u=!0,c=!1,f=void 0;try{for(var l,d=o()(i);!(u=(l=d.next()).done);u=!0){var p=l.value;s[p.replace(/^\.\//,"").replace(/\.(js|ts)$/,"")]=function(t){var e=a(t);return e.default?e.default:e}(p)}}catch(t){c=!0,f=t}finally{try{!u&&d.return&&d.return()}finally{if(c)throw f}}e.a=s},"v0V/":function(t,e,n){"use strict";e.a={name:"nuxt-error",props:["error"],head:function(){return{title:this.message,meta:[{name:"viewport",content:"width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"}]}},computed:{statusCode:function(){return this.error&&this.error.statusCode||500},message:function(){return this.error.message||"Error"}}}}},["T23V"]);
//# sourceMappingURL=app.461f1c5482340d6d8cb2.js.map