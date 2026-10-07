(function(){var f=document.currentScript.parentNode.querySelector('.contact-form'),ok=f.parentNode.querySelector('.cf-ok'),e=f.querySelector('.roi-err');
function v(n){var x=f.elements[n];return x?String(x.value||'').trim():''}
f.addEventListener('submit',function(ev){ev.preventDefault();e.hidden=true;
if(!f.checkValidity()){e.textContent='Please fill in your name, company, a valid email and what you need to automate.';e.hidden=false;if(f.reportValidity)f.reportValidity();return}
if(f.elements.website.value){f.hidden=true;ok.hidden=false;return}
var msg='Needs: '+v('need')+(v('speed')?' | Line speed: '+v('speed'):'')+(v('timeline')?' | Timeline: '+v('timeline'):'')+(v('role')?' | Role: '+v('role'):'')+(v('message')?'\n'+v('message'):'');
var b={email:v('email'),contactName:v('name'),company:v('company'),phone:v('phone'),message:msg,source:'contact-form',pageUrl:location.href};
var btn=f.querySelector('button');btn.disabled=true;
fetch(f.getAttribute('data-api'),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(b)}).then(function(r){if(!r.ok)throw 0;f.hidden=true;ok.hidden=false;ok.scrollIntoView({behavior:'smooth',block:'start'});var fr=ok.querySelector('iframe[data-src]');if(fr)fr.src=fr.getAttribute('data-src')}).catch(function(){btn.disabled=false;e.textContent='We could not send your message. Please call (913) 242-8019 or try again.';e.hidden=false});
});})();