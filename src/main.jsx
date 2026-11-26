import React,{useState,useEffect,useRef} from 'react'
import {createRoot} from 'react-dom/client'
import './style.css'
import {drinks,food} from './menuData.js'
import {ING} from './ingredients.js'
const P={
tree:<><circle cx="12" cy="9" r="6"/><path d="M12 15v6M9 21h6M12 12l-2-2M12 14l2-2"/></>,
game:<><rect x="2.5" y="7" width="19" height="11" rx="5"/><path d="M7 10v5M4.5 12.5h5"/><circle cx="15.5" cy="11.5" r=".8"/><circle cx="18" cy="14" r=".8"/></>,
kids:<><circle cx="12" cy="13" r="7"/><circle cx="6" cy="7" r="2.6"/><circle cx="18" cy="7" r="2.6"/><circle cx="9.5" cy="12" r=".7"/><circle cx="14.5" cy="12" r=".7"/><path d="M10 16c1 1 3 1 4 0"/></>,
family:<><path d="M5 20C5 11 11 5 20 4c0 9-5 15-12 15"/><path d="M5 20c3-5 6-8 10-10"/></>,
vip:<><path d="M3 8l4 4 5-7 5 7 4-4-2 11H5z"/><path d="M6 21h12"/></>,
party:<><ellipse cx="12" cy="9" rx="5.5" ry="6.5"/><path d="M12 15.5l-1.5 2.5h3zM12 18c-2 1.5 2 2.5 0 4"/></>,
camera:<><rect x="3" y="7" width="18" height="12" rx="2.5"/><circle cx="12" cy="13" r="3.6"/><path d="M8.5 7l1.2-2.5h4.6L15.5 7"/></>,
cup:<><path d="M5 9h11v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5z"/><path d="M16 11h2a2 2 0 0 1 0 4h-2M8 3c-1 1 1 2 0 3M12 3c-1 1 1 2 0 3"/></>,
star:<><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8z"/></>,
phone:<><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></>,
wa:<><path d="M4 20l1.3-4.2A8.5 8.5 0 1 1 8.4 19z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z"/></>,
pin:<><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></>,
clock:<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
food:<><path d="M6 3v7a2 2 0 0 0 2 2v9M10 3v7a2 2 0 0 1-2 2M8 3v6"/><path d="M17 3c-2 2-3 5-3 8h3v10"/></>}
const Icon=({n})=><svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{P[n]}</svg>
const areas=[
{i:'tree',t:'صالة الشباب ١',d:'على النيل مباشرة وتحت ظل الأشجار. ركن هادي بعيد عن الزحمة، مثالي لدور دومينو أو مباراة شطرنج رايقة.',tag:'شباب'},
{i:'game',t:'صالة الشباب ٢',d:'صالة مرتفعة ومغلقة بشبابيك تطل على النيل. شاشة لمتابعة الماتشات مع الشلة، وبلايستيشن لمين يحب يلعب.',tag:'شباب'},
{i:'kids',t:'منطقة الأطفال',d:'مساحة مغلقة ومسوّرة بالكامل، وألعابها آمنة تمامًا. طفلك يلعب براحته وأنت مطمئن.',tag:'كيدز'},
{i:'family',t:'منطقة العائلات',d:'بجوار منطقة الأطفال وأمام النيل مباشرة، وسط عشب طبيعي وأشجار وخضرة. تقعدوا مرتاحين وعينكم على الصغار طول الوقت.',tag:'عائلات'},
{i:'vip',t:'VIP مقفولة',d:'هدوء تام وخدمة مميزة. تجربة مختلفة لمن يحب الخصوصية.',tag:'VIP'},
{i:'party',t:'قاعة المناسبات',d:'لأعياد الميلاد والخطوبة والمناسبات الخاصة.',tag:'مناسبات'},
{i:'camera',t:'لوكيشن التصوير',d:'ركن مجهز للجلسات والتصوير.',tag:'تصوير'},
{i:'food',t:'المطعم',d:'وجبات كاملة بجانب المشروبات والحلويات.',tag:'مطعم'}]
const menu={'مشروبات ساخنة':[['قهوة تركي','٤٥'],['كابتشينو','٦٥'],['لاتيه','٧٠']],'مشروبات باردة':[['آيس موكا','٨٥'],['سموذي مانجو','٧٥'],['ليمون نعناع','٥٥']],'أكل':[['برجر الزيتون','١٨٠'],['باستا ألفريدو','١٦٠'],['سلطة سيزر','١٣٠']]}
/* ANIM 1: scroll reveal - adds .in when element enters the screen */
function Reveal({children,delay=0,as:T='div',className=''}){
const r=useRef();const [on,setOn]=useState(false)
useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setOn(true);o.disconnect()}},{threshold:.15});o.observe(r.current);return()=>o.disconnect()},[])
return <T ref={r} className={'rv '+className+(on?' in':'')} style={{transitionDelay:delay+'ms'}}>{children}</T>}
/* ANIM 2: counting numbers */
function Count({to,suffix=''}){const [n,setN]=useState(0);const r=useRef()
useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return;o.disconnect();let t0;const f=t=>{t0??=t;const p=Math.min((t-t0)/1200,1);setN(Math.round(to*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)});o.observe(r.current);return()=>o.disconnect()},[to])
return <b ref={r}>{n}{suffix}</b>}
const Leaf=()=><svg className="leaf" viewBox="0 0 120 160" aria-hidden="true"><path d="M60 158C58 110 62 60 60 6" fill="none" stroke="currentColor" strokeWidth="1.5"/><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M60 120C30 118 14 96 12 76c28 2 46 18 48 44z"/><path d="M60 90C90 88 106 66 108 46c-28 2-46 18-48 44z"/><path d="M60 58C36 56 24 40 22 24c22 2 36 14 38 34z"/></g></svg>
const feats=[['cup','قهوة ومشروبات'],['food','وجبات كاملة'],['tree','قعدات على النيل'],['family','أجواء عائلية']]
const dishes=[['coffee','قهوة مختصة','١٢٠'],['main','أطباق رئيسية','٢٨٠'],['salad','سلطات طازجة','١٦٠'],['dessert','حلويات','١٢٠']]
const B=n=>import.meta.env.BASE_URL+'brand/'+n+'.webp'
const LOGO=import.meta.env.BASE_URL+'brand/logo.jpg'
const I=n=>import.meta.env.BASE_URL+'img/'+n+'.jpg'
const PH=new Map();let _n=0;for(const g of [drinks,food])for(const c of g)for(const it of c[1])PH.set(it,_n++)
const MI=n=>import.meta.env.BASE_URL+'img/m/'+n+'.webp'
const J=({v})=><>{v}<u>ج</u></>
const SW=['الوافل','طباق الحلو','ديزارت']
const drinksOnly=drinks
const foodCats=[...food.map(c=>[c[0],c[1],c[0].startsWith('بيتزا')?'size':'one'])]
const tabs=[['normal','المنيو العادي'],['vip','VIP'],['food','المطعم']]
function MenuSection(){
const [tab,setTab]=useState('normal');const [ci,setCi]=useState(0);const [sel,setSel]=useState(null)
useEffect(()=>{if(!sel)return;const f=e=>e.key==='Escape'&&setSel(null);addEventListener('keydown',f);document.body.style.overflow='hidden';return()=>{removeEventListener('keydown',f);document.body.style.overflow=''}},[sel])
const cats=tab==='food'?foodCats:drinksOnly
const cat=cats[Math.min(ci,cats.length-1)]
const pick=t=>{setTab(t);setCi(0)}
return <section id="menu" className="menus"><span className="eyebrow dk c">المنيو</span><h2 className="c">رحلة طعم</h2>
<div className="seg">{tabs.map(([k,n])=><button key={k} className={k===tab?'on':''} onClick={()=>pick(k)}>{n}</button>)}</div>
<div className="chips">{cats.map((c,i)=><button key={c[0]} className={i===ci?'on':''} onClick={()=>setCi(i)}>{c[0]}</button>)}</div>
<ul className="list" key={tab+ci}>{cat[1].map((it,k)=>{
const kind=tab==='food'?cat[2]:'drink'
const price=kind==='size'||kind==='tier'?[it[1],it[2]]:kind==='one'?[it[1]]:[it[tab==='vip'?2:1]]
const desc=it[3]
const pr=<span className="pr">{kind==='size'||kind==='tier'?<><em>{kind==='size'?'وسط':'عادي'}</em><J v={price[0]}/><em>{kind==='size'?'كبير':'VIP'}</em><J v={price[1]}/></>:<J v={price[0]}/>}</span>
const open=()=>setSel({it,pr,desc})
return <li key={it[0]} role="button" tabIndex={0} onClick={open} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}}} style={{animationDelay:(k*40)+'ms'}}><div className="nm"><b>{it[0]}</b>{desc&&<small>{desc}</small>}<small className="hint">اضغط على الصنف تشوف صورته وتفاصيله</small></div><i/>{pr}</li>})}</ul>
{sel&&<div className="mdl" onClick={()=>setSel(null)}><div className="mcard" role="dialog" aria-label={sel.it[0]} onClick={e=>e.stopPropagation()}><button className="x" aria-label="إغلاق" onClick={()=>setSel(null)}>×</button><img src={MI(PH.get(sel.it))} alt={sel.it[0]} width="560" height="560"/><h3>{sel.it[0]}</h3><p className="ing"><b>المكونات:</b> {sel.desc||ING[PH.get(sel.it)]}</p><div className="mp">{sel.pr}</div></div></div>}
</section>}
const CONTACT=['01023163617','01040428475']
const SOCIAL=[] // add {n:'فيسبوك',u:'https://...'} once the real links are known
const WA=['201226622875','201040428475']
const fmtDay=d=>{const[y,m,x]=d.split('-').map(Number);return new Intl.DateTimeFormat('ar-EG',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(Date.UTC(y,m-1,x)))}
const fmtTime=t=>{const[h,m]=t.split(':').map(Number);return new Intl.DateTimeFormat('ar-EG',{hour:'numeric',minute:'2-digit',hour12:true,timeZone:'UTC'}).format(new Date(Date.UTC(2000,0,1,h,m)))}
function BookForm(){
const [f,setF]=useState({a:areas[0].t,d:'',t:'',n:'',p:''});const [sent,setSent]=useState(false)
const u=k=>e=>setF({...f,[k]:e.target.value})
const msg=sent?`طلب حجز من الموقع:\nالمكان: ${f.a}\nاليوم: ${fmtDay(f.d)}\nالساعة: ${fmtTime(f.t)}\nعدد الأفراد: ${f.n}\nرقم الموبايل: ${f.p}`:''
return <form className="form" onSubmit={e=>{e.preventDefault();if(!f.d||!f.t)return;setSent(true)}}>
<select value={f.a} onChange={u('a')}>{areas.map(a=><option key={a.t}>{a.t}</option>)}</select>
<label>اليوم<input type="date" required value={f.d} onChange={u('d')} onInput={u('d')}/></label><label>الساعة<input type="time" required value={f.t} onChange={u('t')} onInput={u('t')}/></label><input type="number" min="1" required placeholder="عدد الأفراد" value={f.n} onChange={u('n')}/><input type="tel" required placeholder="رقم الموبايل" value={f.p} onChange={u('p')}/>
{!sent?<button className="btn green">احجز الآن ←</button>:<div className="wa"><span>الطلب جاهز. اضغط وابعته على واتساب:</span><pre className="pv">{msg}</pre>{WA.map(n=><a key={n} className="btn green" target="_blank" rel="noopener" href={`https://wa.me/${n}?text=${encodeURIComponent(msg)}`} dir="ltr">واتساب 0{n.slice(2)}</a>)}<button type="button" className="btn ghost" onClick={()=>setSent(false)}>تعديل الطلب</button></div>}
</form>}
function App(){
return <>
<section className="hero" style={{backgroundImage:`url(${I('hero')})`}}><div className="shade"/>
<header className="nav"><b><span className="mk"><img src={B('mark')} alt=""/></span>قرية عروس النيل</b><nav><a href="#story">عن المكان</a><a href="#areas">الأماكن</a><a href="#menu">المنيو</a><a href="#book">الحجز</a></nav><a className="btn sm ghost" href="#book">احجز طاولة</a></header>
<div className="in">
<span className="eyebrow">ملاذ هادي على النيل</span>
<h1>حيث تلتقي الطبيعة <em>بالنيل.</em></h1>
<p className="sub">أكل حلو، إطلالة جميلة، ولحظات متنساش.</p>
<div className="btns"><a className="btn green" href="#menu">استكشف المنيو ←</a><a className="btn ghost" href="#book">احجز طاولة</a></div></div></section>
<div className="brandband"><img src={LOGO} alt="شعار قرية عروس النيل" width="1536" height="1024"/></div>
<section id="areas"><span className="eyebrow dk c">أماكننا</span><h2 className="c">أقسامنا ومكان لكل لمّة</h2><div className="grid">
{areas.map((a,k)=><Reveal as="article" delay={k%2*80} className="card" key={a.t}><div className="ph"><Icon n={a.i}/><small>مكان الصورة</small></div><div className="tx"><span className="tag">{a.tag}</span><h3>{a.t}</h3><p>{a.d}</p></div></Reveal>)}</div></section>
<section className="feats">{feats.map(([n,t])=><Reveal key={t} className="f"><Icon n={n}/><span>{t}</span></Reveal>)}</section>
<section id="story" className="story"><Leaf/><Reveal className="pic"><img src={I('story')} alt="" loading="lazy"/></Reveal>
<Reveal delay={100}><span className="eyebrow dk">قصتنا</span><h2>أكتر من مجرد كافيه</h2>
<p>مكان على النيل وسط الأشجار والخضرة، فيه قعدة للشباب، ومساحة آمنة للأطفال، وركن للعائلات، وVIP مقفولة، وقاعة للمناسبات ولوكيشن للتصوير.</p>
<a className="btn green" href="#areas">اكتشف أماكننا ←</a></Reveal></section>
<MenuSection/>
<section className="atmo"><Leaf/><Reveal><span className="eyebrow">الأجواء</span><h2>مكان للراحة والاستمتاع</h2><p>خضرة وأشجار، إطلالة على النيل، وهدوء يريّح.</p><a className="btn ghost" href="#areas">استكشف الأماكن</a></Reveal>
<div className="trio"><img src={I('a1')} alt="" loading="lazy"/><img src={I('a2')} alt="" loading="lazy"/><img src={I('a3')} alt="" loading="lazy"/></div></section>
<section id="book" className="book" style={{backgroundImage:`url(${I('nile')})`}}><div className="shade"/><div className="in"><span className="eyebrow">الحجز</span><h2>طاولتك مستنياك</h2><p className="sub">احجز دلوقتي واستمتع بوقت لا يتنسي.</p>
<BookForm/></div></section>
<footer className="ft"><div className="fbrand"><img src={LOGO} alt="قرية عروس النيل" width="1536" height="1024" loading="lazy"/></div>
<div className="fmain"><p className="ftag">أكل حلو، لحظات حلوة.</p>
<div className="fcta">{CONTACT.map(n=><a key={'w'+n} className="fb wa" href={`https://wa.me/20${n.slice(1)}`} target="_blank" rel="noopener"><Icon n="wa"/><span>واتساب</span><bdi dir="ltr">{n}</bdi></a>)}{CONTACT.map(n=><a key={'c'+n} className="fb" href={`tel:${n}`}><Icon n="phone"/><span>اتصل</span><bdi dir="ltr">{n}</bdi></a>)}</div>
<div className="finfo"><div className="fbox"><h4><Icon n="pin"/>العنوان</h4><p>المحمودية – البحيرة<br/>كوبري فوه، بجانب العبارة سوليتير</p></div>
<div className="fbox"><h4><Icon n="clock"/>مواعيد العمل</h4><table><tbody><tr><td>يومياً</td><td>9 صباحاً – 3 صباحاً</td></tr><tr><td>الجمعة</td><td>بعد صلاة الجمعة – 3 صباحاً</td></tr></tbody></table></div></div>
<nav className="flinks"><a href="#story">عن المكان</a><a href="#areas">الأماكن</a><a href="#menu">المنيو</a><a href="#book">الحجز</a></nav>
{SOCIAL.length>0&&<div className="fsoc">{SOCIAL.map(x=><a key={x.n} href={x.u} target="_blank" rel="noopener" aria-label={x.n}>{x.n}</a>)}</div>}
<div className="fcopy">© 2026 قرية عروس النيل. جميع الحقوق محفوظة</div></div></footer>
</>}
createRoot(document.getElementById('root')).render(<App/>)
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js')
