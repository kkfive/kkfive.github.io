const CACHE_NAME="XiaoKangHelperCache";let cachelist=["/sw.js","/404.html","/500.html"],cdn={gh:{jsdelivr:{url:"https://cdn.jsdelivr.net/gh"},tianli:{url:"https://cdn1.tianli0.top/gh"},hin_cool:{url:"https://jsd.hin.cool/gh"}},combine:{jsdelivr:{url:"https://cdn.jsdelivr.net/combine"},tianli:{url:"https://cdn1.tianli0.top/combine"},hin_cool:{url:"https://jsd.hin.cool/combine"}},npm:{eleme:{url:"https://npm.elemecdn.com"},jsdelivr:{url:"https://cdn.jsdelivr.net/npm"},zhimg:{url:"https://unpkg.zhimg.com"},unpkg:{url:"https://unpkg.com"},tianli:{url:"https://cdn1.tianli0.top/npm"},hin_cool:{url:"https://jsd.hin.cool/npm"}}};const cache_url_list=[/(https?:\/\/)rmt\.ladydaily\.com/g,/(https?:\/\/)rmt\.dogedoge\.com/g,/(https?:\/\/)file\.acs\.pw/g,/(https?:\/\/)bu\.dusays\.com/g,/(https?:\/\/)lf6-cdn-tos\.bytecdntp\.com/g,/(https?:\/\/)static\.jsd\.antmoe\.com/g],blog={local:0,origin:["www.antmoe.com","127.0.0.1:3000"],plus:["www.antmoe.com","butterfly.pages.dev"]},db={read:(t,e={type:"text"})=>new Promise((async(e,n)=>{try{const n=await caches.match(new Request(`https://LOCALCACHE/${encodeURIComponent(t)}`));n||e(null),n.text().then((t=>e(t)))}catch(t){e(null)}})),write:(t,e)=>new Promise((async(n,a)=>{try{(await caches.open(CACHE_NAME)).put(new Request(`https://LOCALCACHE/${encodeURIComponent(t)}`),new Response(e)),n(!0)}catch(t){a()}}))},generate_uuid=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)}));self.addEventListener("install",(async function(t){self.skipWaiting(),t.waitUntil(caches.open(CACHE_NAME).then((async function(t){return await db.read("uuid")||await db.write("uuid","xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)}))),t.addAll(cachelist)})))})),self.addEventListener("fetch",(async t=>{try{t.respondWith(handle(t.request))}catch(e){t.respondWith(handleerr(t.request,e))}}));const handleerr=async(t,e)=>new Response(`<h1>XiaoKangHelper Error</h1>\n    <b>${e}</b>`,{headers:{"content-type":"text/html; charset=utf-8"}}),deleteCache=async t=>{const e=await caches.open(CACHE_NAME);await e.delete(t)},addCache=async(t,e)=>{const n=await caches.open(CACHE_NAME);try{await n.put(t,e.clone())}catch(t){console.log("请求添加到缓存失败")}return e},getCache=async t=>{const e=await caches.open(CACHE_NAME);return await e.match(t)},lfetch=async t=>{await db.read("uuid");Promise.any||(Promise.any=function(t){return new Promise(((e,n)=>{let a=(t=Array.isArray(t)?t:[]).length,s=[];if(0===a)return n(new AggregateError("All promises were rejected"));t.forEach((t=>{t.then((t=>{e(t)}),(t=>{a--,s.push(t),0===a&&n(new AggregateError(s))}))}))}))});let e=new AbortController;const n=async t=>new Response(await t.arrayBuffer(),{status:t.status,headers:t.headers});return Array.isArray(t)||(t=[t]),Promise.any(t?.map((async t=>new Promise((async(a,s)=>{fetch(t,{signal:e.signal}).then(n).then((async n=>{const c=n.clone();200==c.status?(setTimeout((async()=>{db.write("HIT_HOT",await(async()=>{const e=await(async()=>{try{return JSON.parse(await db.read("HIT_HOT"))||{site:{},static:{}}}catch(t){return{site:{},static:{}}}})(),n=t.split("/")[2];return blog.plus.indexOf(n)>-1?e.site[n]=e.site[n]?e.site[n]+1:1:e.static[n]=e.static[n]?e.static[n]+1:1,JSON.stringify(e)})()),db.write("HIT_HOT_SIZE",await(async()=>{const e=await(async()=>{try{return JSON.parse(await db.read("HIT_HOT_SIZE"))||{site:{},static:{}}}catch(t){return{site:{},static:{}}}})(),a=t.split("/")[2];return blog.plus.indexOf(a)>-1?e.site[a]=e.site[a]?e.site[a]+Number(n.headers.get("Content-Length")):Number(n.headers.get("Content-Length")):e.static[a]=e.static[a]?e.static[a]+Number(n.headers.get("Content-Length")):Number(n.headers.get("Content-Length")),JSON.stringify(e)})())}),0),e.abort(),a(c)):s(null)})).catch((async()=>{const e=await getCache(t);a(e||caches.match(new Request("/500.html")))}))}))))).then((t=>t)).catch((()=>null))},handle=async function(t){const e=t.url;let n=new URL(e);await db.read("uuid");const a=n.href.substring(n.origin.length),s=n.port,c=e.split("/")[2],r=(a.split("?")[0],t=>n.searchParams.get(t));let i=[],o=JSON.parse(await db.read("msg"))||await(async()=>(await db.write("msg","[]"),"[]"))();const l=e.split("?")[0],h=new Request(l);if("true"===r("nosw"))return fetch(t);if("true"===r("delete"))return deleteCache(h),o.push({name:"文件已删除",time:new Date,info:`已删除${l}`}),await db.write("msg",JSON.stringify(o)),new Response(JSON.stringify({ok:1}));if("true"===r("forceupdate")){o.push({name:"文件已强制更新",time:new Date,info:`已更新${l}`}),await db.write("msg",JSON.stringify(o));const e=await fetch(t);return await addCache(t,e),new Response(JSON.stringify({ok:1}))}for(let n in cdn)for(let a in cdn[n])if(c===cdn[n][a].url.split("https://")[1].split("/")[0]&&e.match(cdn[n][a].url)){i=[];for(let t in cdn[n])i.push(e.replace(cdn[n][a].url,cdn[n][t].url));const s=await caches.match(t),c=await(s||lfetch(i));return await addCache(t,c)}for(let n in blog.origin)if(c.split(":")[0]===blog.origin[n].split(":")[0]){if(blog.local)return fetch(t);i=[];for(let t in blog.plus)i.push(e.replace(c,blog.plus[t]).replace(c+":"+s,blog.plus[t]).replace("http://","https://"));return new Promise(((n,a)=>{setTimeout((()=>{caches.match(t).then((function(a){a?(console.log("Had Cache:"+e),setTimeout((async()=>{n(a);try{const e=await lfetch(t.url);await addCache(t,e)}catch(t){n(a)}}),0)):lfetch(i).then((async function(e){const a=await addCache(t,e.clone());n(a)})).catch((function(t){n(caches.match(new Request("/404.html")))}))}))}),0)}))}for(let n in cache_url_list)if(e.match(cache_url_list[n])){const e=await caches.match(t);if(e)return e;{const e=await fetch(t);return await addCache(t,e.clone())}}try{return await fetch(t)}catch(t){return caches.match(new Request("/500.html"))}};