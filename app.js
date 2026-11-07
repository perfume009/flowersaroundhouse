// =====================================================================
//  Логика сайта (общая для всех страниц). Содержание лежит в data.js.
// =====================================================================
var $=function(i){return document.getElementById(i)};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function rng(s){var h=0;for(var i=0;i<s.length;i++)h=Math.imul(31,h)+s.charCodeAt(i)|0;return function(){h|=0;h=h+0x6D2B79F5|0;var t=Math.imul(h^h>>>15,1|h);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function hueOf(n){return Math.floor(rng(n)()*360)}
function sprite(c,name){var r=rng(name),x=c.getContext("2d"),hue=Math.floor(r()*360);c.width=c.height=10;
 for(var y=0;y<10;y++)for(var i=0;i<5;i++)if(r()>.45){x.fillStyle="hsl("+(195+(hue+y*6)%40)+",30%,"+(46+r()*12)+"%)";x.fillRect(i,y,1,1);x.fillRect(9-i,y,1,1)}}

// ----- тексты интерфейса (RU / EN) -----
var T={ru:{n_games:"Игры",n_about:"Обо мне",n_contact:"Контакты",cta1:"Смотреть игры",cta2:"Связаться",bio:"Делаю игры сам: от идеи и геймплея до релиза.",foot:"Сделано с кофе",ph:"Поиск по названию",none:"Ничего не найдено. Попробуй другой запрос.",play:"Itch.io",close:"Закрыть",home:"В начало",stack:"Стек",det:"Подробности игры",dev_h:"Новости разработки",tg_btn:"Читать в Telegram",prev:"Назад",next:"Вперёд",trailer:"Смотреть трейлер",zoom:"Увеличить",back:"Все игры",about:"О игре",feat:"Особенности",shots:"Скриншоты",trailer_h:"Трейлер",d_status:"Статус",d_year:"Год",d_tags:"Теги",copy:"Скопировать ссылку",copied:"Ссылка скопирована",soon_shot:"Скриншот скоро",heroes:"Три героя",st:{"релиз":"релиз","jam":"jam","в разработке":"в разработке","планируется":"планируется"}},
 en:{n_games:"Games",n_about:"About",n_contact:"Contact",cta1:"View games",cta2:"Get in touch",bio:"I make games solo, from the first idea and gameplay to release.",foot:"Made with coffee",ph:"Search by title",none:"Nothing found. Try another search.",play:"Itch.io",close:"Close",home:"Back to top",stack:"Stack",det:"Game details",dev_h:"Dev news",tg_btn:"Follow on Telegram",prev:"Previous",next:"Next",trailer:"Watch trailer",zoom:"Enlarge",back:"All games",about:"About the game",feat:"Features",shots:"Screenshots",trailer_h:"Trailer",d_status:"Status",d_year:"Year",d_tags:"Tags",copy:"Copy link",copied:"Link copied",soon_shot:"Screenshot coming soon",heroes:"Three heroes",st:{"релиз":"released","jam":"jam","в разработке":"in development","планируется":"planned"}}};
var L="ru";try{L=localStorage.getItem("lang")}catch(e){}
if(L!=="ru"&&L!=="en")L=((navigator.language||"").slice(0,2)==="ru")?"ru":"en";
function tr(k){return T[L][k]}
var SC={"релиз":"#a9cbdd","jam":"#7f93b3","в разработке":"#8fb8d4","планируется":"#5f7488"};
function tagTxt(t){return typeof t==="string"?t:t[L]}
function hueG(g){return g.hue!=null?g.hue:hueOf(g.n)}
function tagsH(g){return g.tags.map(function(t){return '<span>'+esc(tagTxt(t))+'</span>'}).join("")}

function gid(g){return g.id}
function pageOf(g){return g.page||gid(g)+".html"}
var HOME=document.body.dataset.page==="home",G=null;

// ----- шапка-меню и низ страницы (общие для всех страниц) -----
function layout(){
 var b=HOME?"":"index.html";
 $("nav").innerHTML='<a class="logo" href="'+b+'#top" data-ia="home" aria-label="В начало">flowersaroundhouse</a><a href="'+b+'#games" data-i="n_games">Игры</a><a href="'+b+'#about" data-i="n_about">Обо мне</a><a href="'+b+'#contact" data-i="n_contact">Контакты</a><div class="lg" role="group" aria-label="Language"><button data-l="ru">RU</button><button data-l="en">EN</button></div>';
 $("end").innerHTML='<div class="bg" aria-hidden="true"></div>\n<section id="contact"><h2 class="rv" data-i="n_contact">Контакты</h2><div class="links rv" id="links"></div></section>\n<footer><span>© <span id="y"></span> flowersaroundhouse</span><span data-i="foot">Сделано с кофе</span></footer>';
 $("links").innerHTML=LINKS.map(function(l){return '<a href="'+esc(l[1])+'" target="_blank" rel="noopener"><span>'+esc(l[0])+'</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg></a>'}).join("");
 $("y").textContent=new Date().getFullYear();
 addEventListener("scroll",function(){$("nav").classList.toggle("s",scrollY>40)},{passive:true});
}

// reveal + counters
function count(b){var t=b.dataset.n==="GAMES"?GAMES.length:b.dataset.n==="TECH"?STACK.length:+b.dataset.n,s=performance.now();
 (function f(n){var p=Math.min(1,(n-s)/1600);b.textContent=Math.round(t*(1-Math.pow(1-p,4)));if(p<1)requestAnimationFrame(f)})(s)}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");if(e.target.dataset.n)count(e.target);io.unobserve(e.target)}})},{threshold:.12});

// ----- главная: игры, история, новости -----
function draw(){var q=$("q").value.toLowerCase();
 var list=GAMES.filter(function(g){return g.n.toLowerCase().indexOf(q.trim())>-1});
 $("grid").innerHTML=list.length?list.map(function(g,k){return '<a class="card'+(g.plain?' plain':'')+'" href="'+esc(pageOf(g))+'" data-i="'+GAMES.indexOf(g)+'" style="--h:'+hueG(g)+';--c:'+(SC[g.st]||"#7f8790")+';--dl:'+k*90+'ms"><div class="cover">'+(g.img?'<img src="'+esc(g.img)+'" alt="'+esc(g.n)+'" loading="lazy">':'<canvas data-n="'+esc(g.n)+'"></canvas>')+'</div><div class="bd"><h3>'+esc(g.n)+'</h3><div class="meta"><i class="dot"></i><span>'+esc(T[L].st[g.st]||g.st)+'</span>'+(g.y?'<span>'+g.y+'</span>':'')+'</div><p>'+esc(g.d[L])+'</p><div class="tags">'+tagsH(g)+'</div></div></a>'}).join(""):'<p class="empty">'+tr("none")+'</p>';
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
 ro=$("role");ro.textContent=ROLES[L][0];
 setInterval(function(){ro.classList.add("out");setTimeout(function(){ri=(ri+1)%ROLES[L].length;ro.textContent=ROLES[L][ri];ro.classList.remove("out")},450)},3400);
 sceneInit();
}


// ----- главная сцена: одинокая фигура на снежной равнине (пиксельная, как «пережатое» фото) -----
function sceneInit(){
 var cv=$("scene"),cx=cv.getContext("2d"),PX=5,W=0,H=0,HZ=0,bg=document.createElement("canvas"),bx=bg.getContext("2d"),blocks=[],vis=true,t0=performance.now(),hin=document.querySelector(".hin"),
  rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
 var SKY=[[0,[7,28,46]],[.55,[22,80,118]],[1,[98,160,192]]],GND=[[0,[170,206,224]],[.38,[108,158,186]],[1,[34,76,106]]];
 function col(st,t){for(var i=1;i<st.length;i++)if(t<=st[i][0]){var a=st[i-1],b=st[i],u=(t-a[0])/(b[0]-a[0]);return[a[1][0]+(b[1][0]-a[1][0])*u,a[1][1]+(b[1][1]-a[1][1])*u,a[1][2]+(b[1][2]-a[1][2])*u]}return st[st.length-1][1]}
 function rnd(n){var s=n;return function(){s=(s*16807)%2147483647;return(s-1)/2147483646}}
 function build(){var w=cv.clientWidth,h=cv.clientHeight;if(!w||!h)return;
  W=Math.ceil(w/PX);H=Math.ceil(h/PX);cv.width=bg.width=W;cv.height=bg.height=H;HZ=Math.round(H*.6);
  var img=bx.createImageData(W,H),d=img.data,r=rnd(11),i=0,x,y,c,n;
  for(y=0;y<H;y++)for(x=0;x<W;x++){c=y<HZ?col(SKY,y/HZ):col(GND,(y-HZ)/(H-HZ));n=(r()-.5)*7;d[i]=c[0]+n;d[i+1]=c[1]+n;d[i+2]=c[2]+n;d[i+3]=255;i+=4}
  bx.putImageData(img,0,0);blocks=[];
  for(var k=0;k<95;k++){var bw=3+Math.floor(r()*12),bh=2+Math.floor(r()*5),px=Math.floor(r()*W),py=Math.floor(r()*H),a=.03+r()*.07,q=r();
   bx.fillStyle=q<.2?"rgba(150,125,175,"+a+")":q<.6?"rgba(255,255,255,"+a+")":"rgba(0,20,40,"+a+")";bx.fillRect(px,py,bw,bh);if(r()<.12)blocks.push([px,py,bw,bh,r()*6])}
 }
 function frame(now){requestAnimationFrame(frame);if(!vis||!W)return;var t=(now-t0)/1000;
  cx.drawImage(bg,0,0);
  for(var i=0;i<blocks.length;i++){var b=blocks[i],al=.04+.05*Math.sin(t*.6+b[4]);cx.fillStyle="rgba(255,255,255,"+Math.max(0,al)+")";cx.fillRect(b[0],b[1],b[2],b[3])}
  var p=rm?0:Math.min(1,scrollY/(innerHeight*.85));
  if(hin)hin.style.opacity=Math.max(0,1-p*1.5).toFixed(2);
 }
 build();var rt;addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(build,120)});
 new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(cv);
 requestAnimationFrame(frame);
}

// ----- мелкий снег по всему сайту -----
function snowInit(){
 if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;
 var hero=document.querySelector(".hero"),layers=[],S=3;
 function mk(parent,id,cls,n){var c=document.createElement("canvas");if(id)c.id=id;if(cls)c.className=cls;c.setAttribute("aria-hidden","true");parent.appendChild(c);
  var L={c:c,x:c.getContext("2d"),F:[]};for(var i=0;i<n;i++)L.F.push({x:Math.random(),y:Math.random(),v:.15+Math.random()*.35,d:Math.random()*6,a:.25+Math.random()*.5});layers.push(L)}
 mk(document.body,"snow","",110);if(hero)mk(hero,"","hsnow",90);
 function rs(){layers.forEach(function(L){L.W=L.c.width=Math.ceil((L.c.clientWidth||innerWidth)/S);L.H=L.c.height=Math.ceil((L.c.clientHeight||innerHeight)/S)})}
 rs();addEventListener("resize",rs);
 var last=performance.now();
 (function f(now){requestAnimationFrame(f);if(document.hidden)return;var dt=Math.min(.05,(now-last)/1000);last=now;
  layers.forEach(function(L){L.x.clearRect(0,0,L.W,L.H);for(var i=0;i<L.F.length;i++){var p=L.F[i];p.y+=p.v*dt*.5;if(p.y>1.02){p.y=-.02;p.x=Math.random()}
   L.x.fillStyle="rgba(215,232,244,"+p.a+")";L.x.fillRect(Math.round((p.x+Math.sin(now/2300+p.d)*.012)*L.W),Math.round(p.y*L.H),1,1)}})})(last);
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
function gph(g,hue){var s="";for(var i=0;i<(g.soon||0);i++)s+='<div class="gph" style="--h:'+hue+'"><span></span><em>'+esc(tr("soon_shot"))+'</em></div>';return s}
function heroesH(g,hue){return '<div class="hh rv"><h2>'+esc(tr("heroes"))+'</h2></div>'+g.heroes.map(function(h,i){var nm=h.name[L];
 return '<div class="fp hp'+(i%2?' r':'')+'" style="--h:'+((hue+i*38)%360)+'"><div class="fbg"'+(h.img?' data-px="0.12"><img src="'+esc(h.img)+'" alt="'+esc(nm)+'" style="object-position:'+esc(h.pos||"50% 50%")+'" loading="lazy">':'>')+'</div><div class="fc rv"><p class="hr">'+esc(h.role[L])+'</p><h3>'+esc(nm)+'</h3><p>'+esc(h.d[L])+'</p></div></div>'}).join("")}
function renderGame(g,quiet){
 var imgs=slides(g).filter(function(x){return x.t==="i"}).map(function(x){return x.src}),n=imgs.length,gimgs=g.shots||[],
  feats=(g.feat&&g.feat[L])||[],st=T[L].st[g.st]||g.st,link=g.url&&g.url!=="#",hue=hueG(g),
  words=g.n.split(" "),longest=Math.max.apply(null,words.map(function(w){return w.length})),fs=Math.min(17,150/longest),hero=g.img||imgs[0];
 var art=g.artTitle&&hero,h='<div class="gh'+(art?' art':'')+'" style="--h:'+hue+';--c:'+(SC[g.st]||"#7f8790")+'">'+(hero?(art?'<img class="gh-bg" src="'+esc(hero)+'" alt="">':'')+'<img class="gh-img'+(art?' fit':'')+'" src="'+esc(hero)+'" alt="'+esc(g.n)+'">':'<div class="gh-fall"></div>')
  +'<div class="gh-in"><a class="gback" href="index.html#games">← '+esc(tr("back"))+'</a>'
  +'<div class="gpills"><span class="gpill"><i></i>'+esc(st)+'</span>'+(g.y?'<span class="gpill">'+g.y+'</span>':'')+''+g.tags.map(function(t){return '<span class="gpill">'+esc(tagTxt(t))+'</span>'}).join("")+'</div>'
  +(g.artTitle?'<h1 class="sr">'+esc(g.n)+'</h1>':'<h1 style="--fs:'+fs+'vw;--fh:'+(50/words.length).toFixed(1)+'vh" aria-label="'+esc(g.n)+'">'+words.map(function(w,i){return '<span class="w" style="--i:'+i+'"><i>'+esc(w)+'</i></span>'}).join("")+'</h1>')
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
snowInit();
document.querySelectorAll(".lg button").forEach(function(b){b.onclick=function(){setLang(b.dataset.l)}});
if(HOME)homeInit();
setLang(L,true);
if(!HOME)gameInit();
document.querySelectorAll(".rv,[data-n]").forEach(function(e){io.observe(e)});
if(location.hash.length>1){var ht=document.getElementById(location.hash.slice(1));if(ht)setTimeout(function(){ht.scrollIntoView({behavior:"instant"})},80)}