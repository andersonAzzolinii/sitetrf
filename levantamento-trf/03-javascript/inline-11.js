(function(){
var L={"Alabama": [0.1495, 24.5, 36.66], "Alaska": [0.2161, 25.05, 37.49], "Arizona": [0.1187, 25.91, 38.77], "Arkansas": [0.1072, 22.44, 33.58], "California": [0.2692, 30.51, 45.66], "Colorado": [0.1221, 32.52, 48.66], "Connecticut": [0.2221, 31.38, 46.96], "Delaware": [0.1291, 28.25, 42.27], "District of Columbia": [0.2221, 26.77, 40.06], "Florida": [0.1138, 29.83, 44.64], "Georgia": [0.1149, 23.97, 35.87], "Hawaii": [0.3818, 29.33, 43.89], "Idaho": [0.089, 24.03, 35.96], "Illinois": [0.1242, 25.82, 38.64], "Indiana": [0.1364, 25.88, 38.73], "Iowa": [0.1026, 25.05, 37.49], "Kansas": [0.1093, 23.98, 35.88], "Kentucky": [0.1175, 26.22, 39.24], "Louisiana": [0.116, 29.49, 44.13], "Maine": [0.2155, 27.39, 40.99], "Maryland": [0.1586, 26.72, 39.99], "Massachusetts": [0.2476, 28.73, 42.99], "Michigan": [0.1441, 27.92, 41.78], "Minnesota": [0.1161, 28.5, 42.65], "Mississippi": [0.1341, 22.52, 33.7], "Missouri": [0.0947, 27.65, 41.38], "Montana": [0.1162, 23.69, 35.45], "Nebraska": [0.0828, 25.65, 38.38], "Nevada": [0.0895, 22.66, 33.91], "New Hampshire": [0.2119, 27.35, 40.93], "New Jersey": [0.1613, 25.62, 38.34], "New Mexico": [0.1078, 24.58, 36.78], "New York": [0.2061, 27.71, 41.47], "North Carolina": [0.1074, 23.31, 34.88], "North Dakota": [0.0728, 26.42, 39.54], "Ohio": [0.1225, 26.56, 39.75], "Oklahoma": [0.086, 26.35, 39.43], "Oregon": [0.1031, 29.15, 43.62], "Pennsylvania": [0.1316, 26.66, 39.9], "Rhode Island": [0.2569, 25.86, 38.7], "South Carolina": [0.1153, 25.83, 38.65], "South Dakota": [0.1043, 25.07, 37.52], "Tennessee": [0.1262, 24.54, 36.72], "Texas": [0.0903, 30.42, 45.52], "Utah": [0.0947, 27.02, 40.43], "Vermont": [0.207, 26.14, 39.12], "Virginia": [0.1021, 26.45, 39.58], "Washington": [0.1105, 32.35, 48.41], "West Virginia": [0.1141, 25.19, 37.7], "Wisconsin": [0.1266, 26.33, 39.4], "Wyoming": [0.0955, 33.77, 50.53], "Alberta": [0.1883, 27.92, 41.78], "British Columbia": [0.0832, 27.92, 41.78], "Manitoba": [0.0745, 27.92, 41.78], "New Brunswick": [0.1015, 27.92, 41.78], "Newfoundland & Labrador": [0.108, 27.92, 41.78], "Nova Scotia": [0.1336, 27.92, 41.78], "Ontario": [0.1029, 27.92, 41.78], "Prince Edward Island": [0.1343, 27.92, 41.78], "Quebec": [0.0569, 27.92, 41.78], "Saskatchewan": [0.1453, 27.92, 41.78], "Mexico (National)": [0.224, 30.42, 45.52]},BUD={"TRFCobot": 120000, "TRFCompact": 180000, "TRFSpeed": 350000},MODEL={"TRFCobot": "TRFCobot Dual", "TRFCompact": "TRFCompact Dual", "TRFSpeed": "TRFSpeed 100"},KW=20,TIERS=[[2, 1, 1, "1 to 2 workers"], [4, 1.5, 2, "3 to 4 workers"], [6, 1.95, 3, "5 to 6 workers"], [9, 2.535, 4, "7 to 9 workers"], [999, 3.2955, 5, "10 or more workers"]];var FREE=["gmail.com", "googlemail.com", "hotmail.com", "hotmail.co.uk", "hotmail.fr", "outlook.com", "live.com", "msn.com", "yahoo.com", "yahoo.co.uk", "yahoo.ca", "yahoo.com.br", "ymail.com", "rocketmail.com", "aol.com", "icloud.com", "me.com", "mac.com", "proton.me", "protonmail.com", "pm.me", "gmx.com", "gmx.net", "gmx.us", "mail.com", "zoho.com", "zohomail.com", "yandex.com", "yandex.ru", "bol.com.br", "uol.com.br", "terra.com.br", "ig.com.br", "comcast.net", "verizon.net", "att.net", "sbcglobal.net", "bellsouth.net", "cox.net", "charter.net", "earthlink.net", "fastmail.com", "tutanota.com", "tuta.io", "hey.com", "inbox.com", "qq.com", "163.com", "126.com"];function isWork(m){var d=String(m||'').split('@').pop().toLowerCase().trim();return FREE.indexOf(d)<0}
var sec=document.currentScript.parentNode,f=sec.querySelector('.roi-form'),o=sec.querySelector('.roi-out'),e=f.querySelector('.roi-err');
var pl=f.elements.platform,cp=f.elements.customPrice,st=f.elements.state,lr=f.elements.laborRate,pp=f.elements.people,hh=f.elements.hours,ss=f.elements.shifts,dd=f.elements.days;
var q=function(s){return sec.querySelector(s)};
var edited=false;
lr.addEventListener('focus',function(){edited=true});
function basePrice(){if(pl.value==='Custom')return +cp.value||0;return BUD[pl.value]||0}
function tier(p){for(var i=0;i<TIERS.length;i++){if(p<=TIERS[i][0])return TIERS[i]}return TIERS[TIERS.length-1]}
function money(n){return (n<0?'-':'')+'$'+Math.round(Math.abs(n)).toLocaleString('en-US')}
function num(n){return Math.round(n).toLocaleString('en-US')}
function txt(s,v){var x=q(s);if(x)x.textContent=v}
function onPlatform(){var custom=pl.value==='Custom',dc=q('[data-custom]');if(dc)dc.hidden=!custom;var b=basePrice();
txt('[data-app-price]',b>0?money(b):'Entered below');txt('[data-app-kw]',KW+' kW');var ai=q('[data-app-info]');if(ai)ai.hidden=!pl.value;calc()}
function onLocation(){var d=L[st.value];if(d){txt('[data-loc-elec]','$'+d[0].toFixed(4)+'/kWh');txt('[data-loc-wage]','$'+d[1].toFixed(2)+'/hr');if(!edited)lr.value=d[1].toFixed(2)}q('[data-loc-info]').hidden=!d;calc()}
function calc(){
var rate=+lr.value||0,P=parseInt(pp.value)||0,H=+hh.value||0,S=parseInt(ss.value)||0,D=parseInt(dd.value)||0,d=L[st.value],b=basePrice();
var ok=d&&rate>0&&P>0&&H>0&&S>0&&D>0&&b>0;
var t=P>0?tier(P):TIERS[0];
if(P>0&&b>0){txt('[data-tier-price]',money(b*t[1]));txt('[data-tier-elec]',t[2]+'x ('+t[3]+')');q('[data-tier-info]').hidden=false}else{q('[data-tier-info]').hidden=true}
q('[data-prev]').hidden=!ok;if(!ok)return null;
var manY=P*H*S*D*52*rate,adj=b*t[1],ecph=d[0]*KW*t[2],useY=H*S*D*52,sysCost=adj+0.05*adj*20,robY=useY*ecph,rob20=robY*20+sysCost,
sav20=manY*20-rob20,net=manY-robY,be=net>0?sysCost/net:99;
txt('[data-p-labor]',money(manY));txt('[data-p-robot]',money(robY));txt('[data-p-be]',be<20?be.toFixed(1)+' years':'20+ years');txt('[data-p-sav]',money(sav20));
return {rate:rate,P:P,H:H,S:S,D:D,d:d,b:b,t:t,manY:manY,adj:adj,ecph:ecph,useY:useY,sysCost:sysCost,robY:robY,rob20:rob20,sav20:sav20,net:net,be:be}}
pl.addEventListener('change',onPlatform);if(cp)cp.addEventListener('input',onPlatform);st.addEventListener('change',onLocation);
[lr,pp,hh,ss,dd].forEach(function(x){x.addEventListener('input',calc)});onPlatform();onLocation();
f.addEventListener('submit',function(ev){ev.preventDefault();e.hidden=true;
if(!f.checkValidity()){e.textContent='Please fill in every field and a valid work email.';e.hidden=false;if(f.reportValidity)f.reportValidity();return}
if(!isWork(f.elements.email.value)){e.textContent='Please use your work email.';e.hidden=false;f.elements.email.focus();return}
var r=calc();if(!r){e.textContent='Please select the platform and the location, and fill in the labor and schedule fields.';e.hidden=false;return}
if(r.H*r.S>24){e.textContent='Hours per shift times shifts per day cannot exceed 24.';e.hidden=false;return}
var hrs20=r.useY*20,effHr=hrs20>0?r.rob20/hrs20:0;
txt('[data-o=sav20]',money(r.sav20));txt('[data-o=be]',r.be<20?r.be.toFixed(1)+' years':'20+ years');txt('[data-o=rate]','$'+r.rate.toFixed(2)+'/hr');txt('[data-o=effhr]','$'+effHr.toFixed(2)+'/hr');
txt('[data-o=b-labor]',r.P+' people x '+r.H+' h x '+r.S+' shifts x '+r.D+' days x 52 weeks x $'+r.rate.toFixed(2)+'/hr = '+money(r.manY)+' per year, '+money(r.manY*20)+' over 20 years');
txt('[data-o=b-price]',money(r.b)+' x '+r.t[1]+' ('+r.t[3]+') = '+money(r.adj));
txt('[data-o=b-maint]','5% x '+money(r.adj)+' x 20 years = '+money(0.05*r.adj*20));
txt('[data-o=b-elec]',num(r.useY)+' h x $'+r.d[0].toFixed(4)+'/kWh x '+KW+' kW x '+r.t[2]+' = '+money(r.robY)+' per year, '+money(r.robY*20)+' over 20 years');
txt('[data-o=b-sys]',money(r.adj)+' price + '+money(0.05*r.adj*20)+' maintenance = '+money(r.sysCost));
txt('[data-o=b-rob20]',money(r.robY*20)+' electricity + '+money(r.sysCost)+' system = '+money(r.rob20));
txt('[data-o=b-be]',r.net>0?money(r.sysCost)+' / ('+money(r.manY)+' - '+money(r.robY)+') = '+r.be.toFixed(2)+' years ('+Math.round(r.be*12)+' months)':'Annual net savings are not positive with these inputs.');
txt('[data-o=b-sav]',money(r.manY*20)+' manual labor - '+money(r.rob20)+' robotic system = '+money(r.sav20));
var mx=Math.max(r.manY*20,r.rob20)||1;o.hidden=false;
setTimeout(function(){q('[data-b=manual]').style.width=(r.manY*20/mx*100)+'%';q('[data-b=robot]').style.width=(r.rob20/mx*100)+'%'},60);
o.scrollIntoView({behavior:'smooth',block:'start'});
if(f.elements.website.value)return;
var body={email:f.elements.email.value,source:'roi-calculator',pageUrl:location.href,message:'Payback calculator estimate, '+pl.value+(window.TRF_GPC?' (GPC signal present)':''),
roiInputs:{platform:pl.value,state:st.value,laborRate:r.rate,peoplePerShift:r.P,hoursPerShift:r.H,shiftsPerDay:r.S,daysPerWeek:r.D,investment:Math.round(r.adj),paybackYears:r.net>0?Math.round(r.be*100)/100:null,annualLaborCost:Math.round(r.manY),twentyYearSavings:Math.round(r.sav20)}};
try{fetch(f.getAttribute('data-api'),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}).catch(function(){})}catch(x){}
});})();