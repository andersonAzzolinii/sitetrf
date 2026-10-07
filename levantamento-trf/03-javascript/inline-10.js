(function(){var f=document.currentScript.parentNode.querySelector('.priv-form'),ok=f.parentNode.querySelector('.cf-ok'),e=f.querySelector('.roi-err');
f.addEventListener('submit',function(ev){ev.preventDefault();e.hidden=true;
if(!f.checkValidity()){e.textContent='Please enter your name, a valid email and the type of request.';e.hidden=false;if(f.reportValidity)f.reportValidity();return}
if(f.elements.website.value){f.hidden=true;ok.hidden=false;return}
var b={email:f.elements.email.value,contactName:f.elements.name.value,source:'contact-form',pageUrl:location.href,message:'[Privacy request] '+f.elements.kind.value+(window.TRF_GPC?' (GPC signal present)':'')+'. '+f.elements.details.value};
var btn=f.querySelector('button');btn.disabled=true;
fetch(f.getAttribute('data-api'),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(b)}).then(function(r){if(!r.ok)throw 0;f.hidden=true;ok.hidden=false}).catch(function(){btn.disabled=false;e.textContent='We could not send your request. Please call (913) 242-8019 or try again.';e.hidden=false});
});})();