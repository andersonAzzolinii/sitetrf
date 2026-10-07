(function(){
var h=document.querySelector('header.site');setTimeout(function(){document.querySelectorAll('.rv').forEach(function(e){e.classList.add('in')})},2500);
function s(){if(h)h.classList.toggle('scrolled',window.scrollY>24)}
window.addEventListener('scroll',s,{passive:true});s();
var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var els=document.querySelectorAll('.rv');
if(rm||!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.08});
els.forEach(function(e,i){e.style.transitionDelay=(Math.min(i%4,3)*70)+'ms';io.observe(e)});
})();