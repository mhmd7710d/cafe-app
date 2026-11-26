import React,{useState,useEffect,useRef} from 'react'
import {createRoot} from 'react-dom/client'
import './style.css'
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
<section id="menu" className="menus"><span className="eyebrow dk c">المنيو</span><h2 className="c">رحلة طعم</h2>
<div className="dishes">{dishes.map(([im,n,p],k)=><Reveal key={n} delay={k%2*80} className="dish"><img src={I(im)} alt="" loading="lazy"/><div><b>{n}</b><span>{p} ج</span></div></Reveal>)}</div>
<div className="c"><a className="btn green" href="#book">شوف المنيو كامل ←</a></div>
<p className="note">الصور والأسعار مؤقتة لحد ما يوصل المنيو الحقيقي.</p></section>
<section className="atmo"><Leaf/><Reveal><span className="eyebrow">الأجواء</span><h2>مكان للراحة والاستمتاع</h2><p>خضرة وأشجار، إطلالة على النيل، وهدوء يريّح.</p><a className="btn ghost" href="#areas">استكشف الأماكن</a></Reveal>
<div className="trio"><img src={I('a1')} alt="" loading="lazy"/><img src={I('a2')} alt="" loading="lazy"/><img src={I('a3')} alt="" loading="lazy"/></div></section>
<section id="book" className="book" style={{backgroundImage:`url(${I('nile')})`}}><div className="shade"/><div className="in"><span className="eyebrow">الحجز</span><h2>طاولتك مستنياك</h2><p className="sub">احجز دلوقتي واستمتع بوقت لا يتنسي.</p>
<form className="form" onSubmit={e=>e.preventDefault()}>
<select>{areas.map(a=><option key={a.t}>{a.t}</option>)}</select>
<input type="date"/><input type="number" placeholder="عدد الأفراد"/><input placeholder="رقم الموبايل"/>
<button className="btn green">احجز الآن ←</button></form></div></section>
<footer><div className="cols"><div><b><Icon n="tree"/>قرية عروس النيل</b><span>أكل حلو، لحظات حلوة.</span></div>
<div><h4>روابط</h4><a href="#story">عن المكان</a><a href="#areas">الأماكن</a><a href="#menu">المنيو</a><a href="#book">الحجز</a></div>
<div><h4>تواصل</h4><span>التليفون والعنوان هيتضافوا قريبًا</span></div>
<div><h4>مواعيد العمل</h4><span>هتتضاف قريبًا</span></div></div><small>© قرية عروس النيل</small></footer>
</>}
createRoot(document.getElementById('root')).render(<App/>)
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js')
