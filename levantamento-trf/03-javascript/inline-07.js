(function(){var f=document.currentScript.parentNode.querySelector('.omb-form'),ok=f.parentNode.querySelector('.cf-ok'),e=f.querySelector('.roi-err');
f.addEventListener('submit',function(ev){ev.preventDefault();e.hidden=true;
var m=String(f.elements.message.value||'').trim();if(m.length<20){e.textContent='Please describe what happened (at least a few sentences).';e.hidden=false;f.elements.message.focus();return}
if(f.elements.website.value){f.hidden=true;ok.hidden=false;return}
var em=String(f.elements.email.value||'').trim(),nm=String(f.elements.name.value||'').trim();
var b={email:em||'anonymous@report.trfautomation.com',contactName:nm||'Anonymous',source:'contact-form',pageUrl:location.href,message:'[COMPLIANCE REPORT, ombudsman channel] Subject: '+String(f.elements.subject.value||'')+'\n'+m+(em?'':'\n(Anonymous report, no contact details provided)')};
var btn=f.querySelector('button');btn.disabled=true;
fetch(f.getAttribute('data-api'),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(b)}).then(function(r){if(!r.ok)throw 0;f.hidden=true;ok.hidden=false}).catch(function(){btn.disabled=false;e.textContent='We could not send your report. Please email ouvidoria@torfresma.com.';e.hidden=false});
});})();