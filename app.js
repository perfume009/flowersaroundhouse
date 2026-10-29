// =====================================================================
//  Логика сайта (общая для всех страниц). Содержание лежит в data.js.
// =====================================================================
var $=function(i){return document.getElementById(i)};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function rng(s){var h=0;for(var i=0;i<s.length;i++)h=Math.imul(31,h)+s.charCodeAt(i)|0;return function(){h|=0;h=h+0x6D2B79F5|0;var t=Math.imul(h^h>>>15,1|h);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function hueOf(n){return Math.floor(rng(n)()*360)}
function sprite(c,name){var r=rng(name),x=c.getContext("2d"),hue=Math.floor(r()*360);c.width=c.height=10;
 for(var y=0;y<10;y++)for(var i=0;i<5;i++)if(r()>.45){x.fillStyle="hsl("+(hue+y*6)+",75%,"+(58+r()*14)+"%)";x.fillRect(i,y,1,1);x.fillRect(9-i,y,1,1)}}

// ----- тексты интерфейса (RU / EN) -----
var T={ru:{n_games:"Игры",n_about:"Обо мне",n_contact:"Контакты",cta1:"Смотреть игры",cta2:"Связаться",bio:"Делаю игры сам: от идеи и геймплея до релиза.",foot:"Сделано с ✿ и кофе",ph:"Поиск по названию",none:"Ничего не найдено. Попробуй другой запрос.",play:"Itch.io",close:"Закрыть",home:"В начало",stack:"Стек",det:"Подробности игры",dev_h:"Новости разработки",tg_btn:"Читать в Telegram",prev:"Назад",next:"Вперёд",trailer:"Смотреть трейлер",zoom:"Увеличить",back:"Все игры",about:"О игре",feat:"Особенности",shots:"Скриншоты",trailer_h:"Трейлер",d_status:"Статус",d_year:"Год",d_tags:"Теги",copy:"Скопировать ссылку",copied:"Ссылка скопирована",soon_shot:"Скриншот скоро",heroes:"Три героя",st:{"релиз":"релиз","jam":"jam","в разработке":"в разработке","планируется":"планируется"}},
 en:{n_games:"Games",n_about:"About",n_contact:"Contact",cta1:"View games",cta2:"Get in touch",bio:"I make games solo, from the first idea and gameplay to release.",foot:"Made with ✿ and coffee",ph:"Search by title",none:"Nothing found. Try another search.",play:"Itch.io",close:"Close",home:"Back to top",stack:"Stack",det:"Game details",dev_h:"Dev news",tg_btn:"Follow on Telegram",prev:"Previous",next:"Next",trailer:"Watch trailer",zoom:"Enlarge",back:"All games",about:"About the game",feat:"Features",shots:"Screenshots",trailer_h:"Trailer",d_status:"Status",d_year:"Year",d_tags:"Tags",copy:"Copy link",copied:"Link copied",soon_shot:"Screenshot coming soon",heroes:"Three heroes",st:{"релиз":"released","jam":"jam","в разработке":"in development","планируется":"planned"}}};
var L="ru";try{L=localStorage.getItem("lang")}catch(e){}
if(L!=="ru"&&L!=="en")L=((navigator.language||"").slice(0,2)==="ru")?"ru":"en";
function tr(k){return T[L][k]}
var SC={"релиз":"#ffd96a","jam":"#8b6cff","в разработке":"#ff6fae","планируется":"#9d93b8"};
function tagTxt(t){return typeof t==="string"?t:t[L]}
function hueG(g){return g.hue!=null?g.hue:hueOf(g.n)}
function tagsH(g){return g.tags.map(function(t){return '<span>'+esc(tagTxt(t))+'</span>'}).join("")}

function gid(g){return g.id}
function pageOf(g){return g.page||gid(g)+".html"}
var HOME=document.body.dataset.page==="home",G=null;

// ----- шапка-меню и низ страницы (общие для всех страниц) -----
function layout(){
 var b=HOME?"":"index.html";
 $("nav").innerHTML='<a class="logo" href="'+b+'#top" data-ia="home" aria-label="В начало">✿</a><a href="'+b+'#games" data-i="n_games">Игры</a><a href="'+b+'#about" data-i="n_about">Обо мне</a><a href="'+b+'#contact" data-i="n_contact">Контакты</a><div class="lg" role="group" aria-label="Language"><button data-l="ru">RU</button><button data-l="en">EN</button></div>';
 $("end").innerHTML='<div class="bg" aria-hidden="true"><i class="a1"></i><i class="a2"></i></div>\n<section id="contact"><h2 class="rv" data-i="n_contact">Контакты</h2><div class="links rv" id="links"></div></section>\n<footer><span>© <span id="y"></span> flowersaroundhouse</span><span data-i="foot">Сделано с ✿ и кофе</span></footer>';
 $("links").innerHTML=LINKS.map(function(l){return '<a href="'+esc(l[1])+'" target="_blank" rel="noopener"><span>'+esc(l[0])+'</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg></a>'}).join("");
 $("y").textContent=new Date().getFullYear();
}

// reveal + counters
function count(b){var t=b.dataset.n==="GAMES"?GAMES.length:b.dataset.n==="TECH"?STACK.length:+b.dataset.n,s=performance.now();
 (function f(n){var p=Math.min(1,(n-s)/1600);b.textContent=Math.round(t*(1-Math.pow(1-p,4)));if(p<1)requestAnimationFrame(f)})(s)}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");if(e.target.dataset.n)count(e.target);io.unobserve(e.target)}})},{threshold:.12});

// ----- главная: игры, история, новости -----
function draw(){var q=$("q").value.toLowerCase();
 var list=GAMES.filter(function(g){return g.n.toLowerCase().indexOf(q.trim())>-1});
 $("grid").innerHTML=list.length?list.map(function(g,k){return '<a class="card'+(g.plain?' plain':'')+'" href="'+esc(pageOf(g))+'" data-i="'+GAMES.indexOf(g)+'" style="--h:'+hueG(g)+';--c:'+(SC[g.st]||"#9d93b8")+';--dl:'+k*90+'ms"><div class="cover">'+(g.img?'<img src="'+esc(g.img)+'" alt="'+esc(g.n)+'" loading="lazy">':'<canvas data-n="'+esc(g.n)+'"></canvas>')+'</div><div class="bd"><h3>'+esc(g.n)+'</h3><div class="meta"><i class="dot"></i><span>'+esc(T[L].st[g.st]||g.st)+'</span>'+(g.y?'<span>'+g.y+'</span>':'')+'</div><p>'+esc(g.d[L])+'</p><div class="tags">'+tagsH(g)+'</div></div></a>'}).join(""):'<p class="empty">'+tr("none")+'</p>';
 document.querySelectorAll("canvas[data-n]").forEach(function(c){sprite(c,c.dataset.n)});
 document.querySelectorAll(".card").forEach(function(c){io.observe(c);
  c.onpointermove=function(e){if(e.pointerType!=="mouse")return;var b=c.getBoundingClientRect(),px=(e.clientX-b.left)/b.width,py=(e.clientY-b.top)/b.height;
   c.style.setProperty("--ry",(px-.5)*8+"deg");c.style.setProperty("--rx",-(py-.5)*8+"deg");c.style.setProperty("--mx",px*b.width+"px");c.style.setProperty("--my",py*b.height+"px")};
  c.onpointerleave=function(){c.style.setProperty("--rx","0deg");c.style.setProperty("--ry","0deg")}})}

function renderLog(){$("log").innerHTML=LOG.map(function(l){return '<div class="row"><b>'+esc(l[0])+'</b><p>'+esc(l[L==="en"?2:1])+'</p></div>'}).join("")}
function renderDev(){$("dlog").innerHTML=DEVLOG.map(function(d){return '<div class="row"><b>'+esc(d.d)+'</b><p>'+esc(d[L])+'</p></div>'}).join("")}
var ri=0,ro=null;
function homeInit(){
 $("q").oninput=draw;
 var st=STACK.map(function(s){return '<span>'+esc(s)+'</span>'}).join("");$("stack").innerHTML=st+st;
 var tgl=LINKS.filter(function(l){return l[0]==="telegram"})[0];if(tgl)$("tgbtn").href=tgl[1];
 var gt=Array(3).join("flowersaroundhouse ✿ ");
 document.querySelectorAll(".hero .ghost").forEach(function(g){for(var i=0;i<4;i++){var p=document.createElement("p");p.className="gr"+(i%2?" rev":"");p.innerHTML="<span>"+gt+"</span><span>"+gt+"</span>";g.appendChild(p)}});
 ro=$("role");ro.textContent=ROLES[L][0];
 setInterval(function(){ro.classList.add("out");setTimeout(function(){ri=(ri+1)%ROLES[L].length;ro.textContent=ROLES[L][ri];ro.classList.remove("out")},450)},3400);
 // hero: pixel flower that grows on load, sways and leans toward the cursor
 (function(){var c=$("bloom"),x=c.getContext("2d"),W=26,H=36,cx=13,cy=11,cell=8,t0=performance.now(),tx=0,mx=0,vis=true,px=[],r=rng("flower"),
  rm=matchMedia("(prefers-reduced-motion:reduce)").matches,
  C={a:"#ffb3d6",b:"#ff6fae",c:"#c93d82",v1:"#a58cff",v2:"#6a4bd8",v3:"#4a32a3",g:"#ffd96a",o:"#ff9a3c",l1:"#7df0b0",l2:"#2fb57a",l3:"#1d7f58",s:"#2a2140"};
  function put(X,Y,col,d){if(X>=0&&X<W&&Y>=0&&Y<H)px[Y*W+X]={x:X,y:Y,c:col,d:d}}
  function hd(X,Y){return Math.hypot(X+.5-cx,Y+.5-cy)}
  function petals(n,off,dist,rad,col){for(var k=0;k<n;k++){var a=off+k*Math.PI*2/n,pcx=cx+Math.cos(a)*dist,pcy=cy+Math.sin(a)*dist;
   for(var Y=0;Y<H;Y++)for(var X=0;X<W;X++){var dx=X+.5-pcx,dy=Y+.5-pcy;
    if(dx*dx+dy*dy<=rad*rad){var l=(-dx-dy)/rad;put(X,Y,l>.35?col[0]:l<-.45?col[2]:col[1],1.7+hd(X,Y)*.09)}}}}
  function leaf(lx,ly,rx,ry,ang){for(var Y=0;Y<H;Y++)for(var X=0;X<W;X++){var dx=X+.5-lx,dy=Y+.5-ly,u=dx*Math.cos(ang)+dy*Math.sin(ang),v=-dx*Math.sin(ang)+dy*Math.cos(ang);
   if(u*u/(rx*rx)+v*v/(ry*ry)<=1)put(X,Y,v<-.4?C.l1:v>.5?C.l3:C.l2,(33-Y)/14*1.5+.1)}}
  for(var Y=19;Y<=33;Y++){var dl=(33-Y)/14*1.5;put(12,Y,C.l2,dl);put(13,Y,C.l1,dl)}
  leaf(8.7,27.2,4.4,1.8,.46);leaf(17.3,24.2,4.4,1.8,-.46);
  petals(8,Math.PI/8,5.2,3.2,[C.v1,C.v2,C.v3]);
  petals(8,0,5.4,3.3,[C.a,C.b,C.c]);
  for(var Y=0;Y<H;Y++)for(var X=0;X<W;X++){var d=hd(X,Y);if(d<=3.4)put(X,Y,d>2.5||(d<2.5&&r()>.72)?C.o:C.g,1.7+d*.09)}
  for(var X=0;X<W;X++){var e=Math.abs(X-13)*.03;put(X,33,X%3?C.l3:C.l2,e);put(X,34,C.s,e);put(X,35,C.s,e);if(r()>.6)put(X,32,C.l3,e)}
  var fp=[];for(var i=0;i<7;i++)fp.push({bx:cx+(r()-.5)*12,y:4+r()*26,s:1.2+r()*1.2,p:r()*6,k:i%2?C.a:C.b});
  function rz(){var dpr=Math.min(devicePixelRatio||1,2);cell=Math.max(1,Math.floor(c.clientWidth*dpr/W));c.width=W*cell;c.height=H*cell}
  rz();addEventListener("resize",rz);
  addEventListener("pointermove",function(e){tx=e.clientX/innerWidth-.5});
  new IntersectionObserver(function(e){vis=e[0].isIntersecting;if(vis)rz()}).observe(c);
  var last=performance.now();
  function f(now){requestAnimationFrame(f);if(!vis)return;
   var t=(now-t0)/1000,dt=Math.min(.05,(now-last)/1000);last=now;mx+=(tx-mx)*.05;
   x.clearRect(0,0,c.width,c.height);
   var sw=rm?0:Math.sin(t*1.1)*1.2+mx*3;
   for(var i=0;i<px.length;i++){var q=px[i];if(!q)continue;
    var g=rm?1:Math.min(1,(t-.3-q.d)*7);if(g<=0)continue;
    var h=Math.max(0,(33-q.y)/31),off=Math.round(sw*h*h*1.1),s=cell*g,o=(cell-s)/2;
    x.fillStyle=q.c;x.fillRect((q.x+off)*cell+o,q.y*cell+o,s,s)}
   if(!rm&&t>3.6)fp.forEach(function(p){p.y+=p.s*dt;if(p.y>32){p.y=3+Math.random()*6;p.bx=cx+(Math.random()-.5)*12}
    var X=Math.round(p.bx+Math.sin(t*1.3+p.p)*2.5);x.fillStyle=p.k;x.fillRect(X*cell,Math.round(p.y)*cell,cell,cell)})}
  requestAnimationFrame(f)})();
}

// ----- страница игры -----
function slides(g){var a=(g.shots&&g.shots.length?g.shots:(g.img?[g.img]:[])).map(function(x){return{t:"i",src:x}});if(g.video)a.push({t:"v",id:g.video});return a}
var lbI=0,lbA=[],lbZ=false,lbR=null,lbT=0;
function lbShow(i,dir){var im=$("lbi");im.getAnimations().forEach(function(a){a.cancel()});lbI=(i+lbA.length)%lbA.length;im.classList.remove("z");lbZ=false;im.style.transformOrigin="50% 50%";
 var m=lbA.length>1;$("lbc").textContent=m?(lbI+1)+" / "+lbA.length:"";$("lbp").hidden=!m;$("lbn").hidden=!m;
 if(!dir||!$("lb").classList.contains("on")||matchMedia("(prefers-reduced-motion:reduce)").matches){im.src=lbA[lbI];return}
 var tok=++lbT,out=im.animate([{opacity:1,translate:"0 0"},{opacity:0,translate:(-70*dir)+"px 0"}],{duration:180,easing:"ease-in",fill:"forwards"});
 setTimeout(function(){var pre=new Image();pre.onload=pre.onerror=function(){if(tok!==lbT)return;out.cancel();im.src=lbA[lbI];
  im.animate([{opacity:0,translate:(70*dir)+"px 0"},{opacity:1,translate:"0 0"}],{duration:340,easing:"cubic-bezier(.2,.8,.2,1)",fill:"both"})};pre.src=lbA[lbI]},190)}
function lbOpen(a,i){lbA=a;lbShow(i);$("lb").classList.add("on");$("lbx").focus()}
function lbClose(){$("lb").classList.remove("on");$("lbi").classList.remove("z");lbZ=false}
function lbOrig(e){var x=Math.max(0,Math.min(100,(e.clientX-lbR.left)/lbR.width*100)),y=Math.max(0,Math.min(100,(e.clientY-lbR.top)/lbR.height*100));$("lbi").style.transformOrigin=x+"% "+y+"%"}

function lbInit(){
 document.body.insertAdjacentHTML("beforeend",'<div id="lb" role="dialog" aria-modal="true"><button id="lbx" data-ia="close" aria-label="Закрыть">✕</button><button class="gn pv" id="lbp" data-ia="prev" aria-label="Назад">‹</button><button class="gn nx" id="lbn" data-ia="next" aria-label="Вперёд">›</button><img id="lbi" alt=""><div id="lbc"></div></div>');
$("lbi").onclick=function(e){if(lbZ){this.classList.remove("z");lbZ=false;return}lbR=this.getBoundingClientRect();lbOrig(e);this.classList.add("z");lbZ=true};
$("lbi").onpointermove=function(e){if(lbZ)lbOrig(e)};
$("lbx").onclick=lbClose;
$("lbp").onclick=function(e){e.stopPropagation();lbShow(lbI-1,-1)};
$("lbn").onclick=function(e){e.stopPropagation();lbShow(lbI+1,1)};
$("lb").onclick=function(e){if(e.target===this)lbClose()};
var lx=null;$("lb").addEventListener("touchstart",function(e){lx=lbZ?null:e.touches[0].clientX},{passive:true});
$("lb").addEventListener("touchend",function(e){if(lx===null||lbA.length<2)return;var d=e.changedTouches[0].clientX-lx;if(Math.abs(d)>50)lbShow(lbI+(d<0?1:-1),d<0?1:-1);lx=null});
addEventListener("keydown",function(e){if($("lb").classList.contains("on")){if(e.key==="Escape")lbClose();if(e.key==="ArrowLeft")lbShow(lbI-1,-1);if(e.key==="ArrowRight")lbShow(lbI+1,1)}});
}
function rvw(t){return t.split(" ").map(function(w){return '<span class="sw">'+esc(w)+'</span>'}).join(" ")}
function gph(g,hue){var s="";for(var i=0;i<(g.soon||0);i++)s+='<div class="gph" style="--h:'+hue+'"><span>✿</span><em>'+esc(tr("soon_shot"))+'</em></div>';return s}
function heroesH(g,hue){return '<div class="hh rv"><h2>'+esc(tr("heroes"))+'</h2></div>'+g.heroes.map(function(h,i){var nm=h.name[L];
 return '<div class="fp hp'+(i%2?' r':'')+'" style="--h:'+((hue+i*38)%360)+'"><div class="fbg"'+(h.img?' data-px="0.12"><img src="'+esc(h.img)+'" alt="'+esc(nm)+'" style="object-position:'+esc(h.pos||"50% 50%")+'" loading="lazy">':'>')+'</div><div class="fc rv"><p class="hr">'+esc(h.role[L])+'</p><h3>'+esc(nm)+'</h3><p>'+esc(h.d[L])+'</p></div></div>'}).join("")}
function renderGame(g,quiet){
 var imgs=slides(g).filter(function(x){return x.t==="i"}).map(function(x){return x.src}),n=imgs.length,gimgs=g.shots||[],
  feats=(g.feat&&g.feat[L])||[],st=T[L].st[g.st]||g.st,link=g.url&&g.url!=="#",hue=hueG(g),
  words=g.n.split(" "),longest=Math.max.apply(null,words.map(function(w){return w.length})),fs=Math.min(15,95/longest),hero=g.img||imgs[0];
 var art=g.artTitle&&hero,h='<div class="gh'+(art?' art':'')+'" style="--h:'+hue+';--c:'+(SC[g.st]||"#9d93b8")+'">'+(hero?(art?'<img class="gh-bg" src="'+esc(hero)+'" alt="">':'')+'<img class="gh-img'+(art?' fit':'')+'" src="'+esc(hero)+'" alt="'+esc(g.n)+'">':'<div class="gh-fall"></div>')
  +'<div class="gh-in"><a class="gback" href="index.html#games">← '+esc(tr("back"))+'</a>'
  +'<div class="gpills"><span class="gpill"><i></i>'+esc(st)+'</span>'+(g.y?'<span class="gpill">'+g.y+'</span>':'')+''+g.tags.map(function(t){return '<span class="gpill">'+esc(tagTxt(t))+'</span>'}).join("")+'</div>'
  +(g.artTitle?'<h1 class="sr">'+esc(g.n)+'</h1>':'<h1 style="--fs:'+fs+'vw" aria-label="'+esc(g.n)+'">'+words.map(function(w,i){return '<span class="w" style="--i:'+i+'"><i>'+esc(w)+'</i></span>'}).join("")+'</h1>')
  +'<div class="cta">'+(link?'<a class="btn p" href="'+esc(g.url)+'" target="_blank" rel="noopener">'+esc(tr("play"))+'</a>':'')+'<button class="btn" id="cp">'+esc(tr("copy"))+'</button></div></div><span class="gcue" aria-hidden="true"></span></div>'
  +'<div class="story"><h2 class="rv">'+esc(tr("about"))+'</h2><p class="rvw">'+rvw(g.l[L])+'</p></div>'
  +(g.tagline?'<div class="tagl rv"><p>'+esc(g.tagline[L])+'</p></div>':'')
  +(g.heroes?heroesH(g,hue):'')
  +(g.story2?'<div class="story s2"><p class="rvw">'+rvw(g.story2[L])+'</p></div>':'')
  +feats.map(function(f,k){var i=f.indexOf(": "),t=i>0?f.slice(0,i):f,d=i>0?f.slice(i+2):"",im=n>1?imgs[(k+1)%n]:"";
   return '<div class="fp'+(k%2?' r':'')+'" style="--h:'+hue+'"><div class="fbg"'+(im?' data-px="0.12"><img src="'+esc(im)+'" alt="" loading="lazy">':'>')+'</div><div class="fc rv"><h3>'+esc(t)+'</h3>'+(d?'<p>'+esc(d)+'</p>':'')+'</div></div>'}).join("")
  +((gimgs.length>1||g.soon)?'<div class="gsec"><h2><span>'+esc(tr("shots"))+'</span><span class="gbs"><button class="gb" data-d="-1" aria-label="'+esc(tr("prev"))+'">‹</button><button class="gb" data-d="1" aria-label="'+esc(tr("next"))+'">›</button></span></h2><div class="gtrack">'+gimgs.map(function(s,j){return '<button data-j="'+j+'" aria-label="'+esc(g.n)+'"><img src="'+esc(s)+'" alt="" loading="lazy"></button>'}).join("")+gph(g,hue)+'</div></div>':'')
  +(g.video?'<div class="gtr"><h2>'+esc(tr("trailer_h"))+'</h2><div class="vwrap" style="--h:'+hue+'"><button class="vp" data-id="'+esc(g.video)+'"><span>▶</span><em>'+esc(tr("trailer"))+'</em></button></div></div>':'')
  +'<div class="gend rv">'+(link?'<a class="btn p" href="'+esc(g.url)+'" target="_blank" rel="noopener">'+esc(tr("play"))+'</a>':'')+'<a class="btn" href="index.html#games">'+esc(tr("back"))+'</a></div>';
 var p=$("gp");p.classList.toggle("still",!!quiet);p.innerHTML=h;
 p.querySelectorAll(".rv").forEach(function(e){io.observe(e)});
 p.querySelectorAll(".gtrack button").forEach(function(b){b.onclick=function(){lbOpen(gimgs,+b.dataset.j)}});
 p.querySelectorAll(".gb").forEach(function(b){b.onclick=function(){var t=p.querySelector(".gtrack");t.scrollBy({left:+b.dataset.d*t.clientWidth*.8,behavior:"smooth"})}});
 p.querySelectorAll(".vp").forEach(function(b){b.onclick=function(){var f=document.createElement("iframe");f.src="https://www.youtube-nocookie.com/embed/"+encodeURIComponent(b.dataset.id)+"?autoplay=1&rel=0";f.allow="autoplay; encrypted-media; picture-in-picture";f.allowFullscreen=true;f.title="Trailer";b.replaceWith(f)}});
 $("cp").onclick=function(){var b=this;try{navigator.clipboard.writeText(location.href).then(function(){b.textContent=tr("copied")})}catch(e){}};
 gpScroll()}
var gpRaf=0;
function gpScroll(){gpRaf=0;if(!G)return;var vh=innerHeight,y=scrollY,e;
 e=document.querySelector("#gp .gh-img");if(e)e.style.translate="0 "+(Math.min(y,vh)*.3).toFixed(1)+"px";
 e=document.querySelector("#gp .gh-in");if(e){e.style.translate="0 "+(-Math.min(y,vh)*.12).toFixed(1)+"px";e.style.opacity=Math.max(0,1-y/(vh*.75)).toFixed(2)}
 document.querySelectorAll("#gp .fbg[data-px]").forEach(function(b){var r=b.parentNode.getBoundingClientRect();if(r.bottom<-100||r.top>vh+100)return;b.style.translate="0 "+((vh/2-(r.top+r.height/2))*parseFloat(b.dataset.px)).toFixed(1)+"px"});
 document.querySelectorAll("#gp .rvw").forEach(function(sp){var r=sp.getBoundingClientRect(),pr=Math.max(0,Math.min(1,(vh*.9-r.top)/r.height)),ws=sp.children,k=Math.ceil(pr*ws.length);for(var i=0;i<ws.length;i++)ws[i].classList.toggle("on",i<k)})}
addEventListener("scroll",function(){if(G&&!gpRaf)gpRaf=requestAnimationFrame(gpScroll)},{passive:true});
addEventListener("resize",function(){if(G)gpScroll()});

function gameInit(){
 G=GAMES.filter(function(x){return gid(x)===document.body.dataset.game})[0];
 if(!G){location.replace("index.html");return}
 lbInit();renderGame(G);
}

// ----- переключатель языка -----
function setLang(l,init){L=l;try{localStorage.setItem("lang",l)}catch(e){}
 document.documentElement.lang=l;
 document.querySelectorAll("[data-i]").forEach(function(e){e.textContent=tr(e.dataset.i)});
 document.querySelectorAll("[data-ia]").forEach(function(e){e.setAttribute("aria-label",tr(e.dataset.ia))});
 document.querySelectorAll(".lg button").forEach(function(b){b.classList.toggle("on",b.dataset.l===l)});
 if(HOME){
  $("q").placeholder=tr("ph");$("q").setAttribute("aria-label",tr("ph"));
  var n=GAMES.length;$("gl").textContent=l==="en"?(n===1?"game":"games"):(n%10===1&&n%100!==11?"игра":(n%10>1&&n%10<5&&(n%100<12||n%100>14)?"игры":"игр"));
  renderLog();renderDev();draw();ri=0;ro&&(ro.textContent=ROLES[l][0]);
 }else if(G&&!init){renderGame(G,true)}
}

// ----- запуск -----
layout();
document.querySelectorAll(".lg button").forEach(function(b){b.onclick=function(){setLang(b.dataset.l)}});
if(HOME)homeInit();
setLang(L,true);
if(!HOME)gameInit();
document.querySelectorAll(".rv,[data-n]").forEach(function(e){io.observe(e)});
if(location.hash.length>1){var ht=document.getElementById(location.hash.slice(1));if(ht)setTimeout(function(){ht.scrollIntoView({behavior:"instant"})},80)}
