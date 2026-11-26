import React,{useState,useEffect,useRef} from 'react'
import {createRoot} from 'react-dom/client'
import './style.css'
const areas=[
{i:'🎮',t:'صالة الشباب ١',d:'جلسة واسعة، بلايستيشن وبنج بونج، أجواء حماسية.',tag:'شباب'},
{i:'🎧',t:'صالة الشباب ٢',d:'هدوء أكتر للمذاكرة والشغل واللمّة الصغيرة.',tag:'شباب'},
{i:'🧸',t:'منطقة الأطفال',d:'ملعب آمن ومراقب، وأولادك قدام عينك.',tag:'كيدز'},
{i:'👨‍👩‍👧',t:'منطقة العائلات',d:'خصوصية وراحة، قعدات مريحة للأسرة كلها.',tag:'عائلات'},
{i:'👑',t:'VIP مقفولة',d:'غرفة خاصة بالكامل بخدمة مخصصة.',tag:'VIP'},
{i:'🎉',t:'قاعة المناسبات',d:'أعياد ميلاد وخطوبة واجتماعات لحد ٨٠ فرد.',tag:'مناسبات'},
{i:'📸',t:'لوكيشن التصوير',d:'ركن مصمم للجلسات والبراندات والتصوير.',tag:'تصوير'},
{i:'🍽️',t:'المطعم',d:'وجبات كاملة من المطبخ للصالة.',tag:'مطعم'}]
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
/* ANIM 3: steaming cup (SVG + CSS) */
const Cup=()=><svg className="cup" viewBox="0 0 120 120" aria-hidden="true">
<path className="steam s1" d="M40 36c-8-8 8-14 0-24"/><path className="steam s2" d="M60 36c-8-8 8-14 0-24"/><path className="steam s3" d="M80 36c-8-8 8-14 0-24"/>
<path d="M24 48h64v22a28 28 0 0 1-28 28h-8a28 28 0 0 1-28-28z" fill="#f3e9d7"/><path d="M88 54h8a12 12 0 0 1 0 24h-10" fill="none" stroke="#f3e9d7" strokeWidth="7"/>
<ellipse cx="56" cy="104" rx="46" ry="5" fill="#000" opacity=".2"/></svg>
const Beans=()=><div className="beans" aria-hidden="true">{Array.from({length:10}).map((_,i)=><i key={i} style={{left:(i*10+3)+'%',animationDelay:(i*0.9)+'s',animationDuration:(7+i%4*2)+'s'}}/>)}</div>
/* ANIM 10: Nile waves at the bottom of the hero (two SVG layers sliding at different speeds) */
const Waves=()=><div className="waves" aria-hidden="true"><svg viewBox="0 0 1200 40" preserveAspectRatio="none"><path d="M0 20Q75 0 150 20T300 20T450 20T600 20T750 20T900 20T1050 20T1200 20V40H0z"/></svg><svg viewBox="0 0 1200 40" preserveAspectRatio="none"><path d="M0 24Q75 8 150 24T300 24T450 24T600 24T750 24T900 24T1050 24T1200 24V40H0z"/></svg></div>
const words=['قهوة مختصة','برجر طازج','حلويات','عصاير','أجواء عائلية','لمّة الشباب']
function App(){
const [tab,setTab]=useState('مشروبات ساخنة')
return <>
<header className="nav"><b>☕ عروس النيل</b><nav><a href="#areas">الأماكن</a><a href="#menu">المنيو</a><a href="#book">احجز</a></nav></header>
<section className="hero"><Beans/><Cup/><span className="pill">الصور والمنيو مؤقتة</span>
<div className="brand">عروس النيل</div><h1><span>مكان</span> <span>لكل</span> <span>لمّة</span></h1><p className="sub">شباب، عائلات، أطفال، VIP، مناسبات وتصوير. كله في مكان واحد.</p>
<div className="btns"><a className="btn pulse" href="#book">احجز مكانك</a><a className="btn ghost" href="#menu">شوف المنيو</a></div><Waves/></section>
<div className="marquee" aria-hidden="true"><div>{[...words,...words].map((w,i)=><span key={i}>{w} ✦</span>)}</div></div>
<section className="stats"><Reveal><Count to={8}/><small>أماكن</small></Reveal><Reveal delay={120}><Count to={80}/><small>فرد في القاعة</small></Reveal><Reveal delay={240}><Count to={100}/><small>صنف</small></Reveal></section>

<section id="areas"><h2>أماكننا</h2><div className="grid">
{areas.map((a,k)=><Reveal as="article" delay={k%2*100} className="card" key={a.t}><div className="ph">{a.i}</div><span className="tag">{a.tag}</span><h3>{a.t}</h3><p>{a.d}</p></Reveal>)}</div></section>
<section id="menu" className="alt"><h2>المنيو</h2><div className="tabs">
{Object.keys(menu).map(k=><button key={k} className={k===tab?'on':''} onClick={()=>setTab(k)}>{k}</button>)}</div>
<ul className="menu" key={tab}>{menu[tab].map(([n,p],k)=><li key={n} style={{animationDelay:(k*90)+'ms'}}><span>{n}</span><i/><b>{p} ج</b></li>)}</ul></section>
<section id="book"><h2>احجز</h2><form className="form" onSubmit={e=>e.preventDefault()}>
<select>{areas.map(a=><option key={a.t}>{a.t}</option>)}</select>
<input type="date"/><input type="number" placeholder="عدد الأفراد"/><input placeholder="رقم الموبايل"/>
<button className="btn">أرسل الحجز</button></form></section>
<footer>© عروس النيل · العنوان · مواعيد العمل</footer>
</>}
createRoot(document.getElementById('root')).render(<App/>)
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js')
