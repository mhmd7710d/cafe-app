import React,{useState} from 'react'
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
function App(){
const [tab,setTab]=useState('مشروبات ساخنة')
return <>
<header className="nav"><b>☕ اسم الكافيه</b><nav><a href="#areas">الأماكن</a><a href="#menu">المنيو</a><a href="#book">احجز</a></nav></header>
<section className="hero"><span className="pill">مؤقت: الاسم والصور هتتغير</span>
<h1>مكان لكل لمّة</h1><p>شباب، عائلات، أطفال، VIP، مناسبات وتصوير. كله في مكان واحد.</p>
<div className="btns"><a className="btn" href="#book">احجز مكانك</a><a className="btn ghost" href="#menu">شوف المنيو</a></div></section>
<section id="areas"><h2>أماكننا</h2><div className="grid">
{areas.map(a=><article className="card" key={a.t}><div className="ph">{a.i}</div><span className="tag">{a.tag}</span><h3>{a.t}</h3><p>{a.d}</p></article>)}</div></section>
<section id="menu" className="alt"><h2>المنيو</h2><div className="tabs">
{Object.keys(menu).map(k=><button key={k} className={k===tab?'on':''} onClick={()=>setTab(k)}>{k}</button>)}</div>
<ul className="menu">{menu[tab].map(([n,p])=><li key={n}><span>{n}</span><i/><b>{p} ج</b></li>)}</ul></section>
<section id="book"><h2>احجز</h2><form className="form" onSubmit={e=>e.preventDefault()}>
<select>{areas.map(a=><option key={a.t}>{a.t}</option>)}</select>
<input type="date"/><input type="number" placeholder="عدد الأفراد"/><input placeholder="رقم الموبايل"/>
<button className="btn">أرسل الحجز</button></form></section>
<footer>© اسم الكافيه · العنوان · مواعيد العمل</footer>
</>}
createRoot(document.getElementById('root')).render(<App/>)
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js')
