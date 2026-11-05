(()=>{
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const header=$('#siteHeader'),menuButton=$('#menuButton'),mobileNav=$('#mobileNav');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>35),{passive:true});
function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open menu');mobileNav.hidden=true;}
menuButton.addEventListener('click',()=>{const isOpen=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!isOpen));menuButton.setAttribute('aria-label',isOpen?'Open menu':'Close menu');mobileNav.hidden=isOpen;});
$$('.mobile-nav a').forEach(a=>a.addEventListener('click',closeMenu));
const observer=window.IntersectionObserver?new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.13}):null;
$$('.reveal').forEach(el=>observer?observer.observe(el):el.classList.add('visible'));
$('#year').textContent=new Date().getFullYear();
const filters=$$('.gallery-filters button'),items=$$('.gallery-item');
filters.forEach(button=>button.addEventListener('click',()=>{const category=button.dataset.filter;filters.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});items.forEach(item=>item.classList.toggle('hide',category!=='all'&&item.dataset.category!==category));}));
const modals=$$('.modal');let lastFocus=null;
function openModal(modal){lastFocus=document.activeElement;modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');const btn=modal.querySelector('.modal-close');if(btn)btn.focus();}
function closeModal(modal){modal.setAttribute('aria-hidden','true');if(modal.id==='filmModal')$('#filmPlayer').pause();if(modals.every(m=>m.getAttribute('aria-hidden')==='true'))document.body.classList.remove('modal-open');if(lastFocus&&typeof lastFocus.focus==='function')lastFocus.focus();}
modals.forEach(modal=>modal.querySelectorAll('[data-close]').forEach(x=>x.addEventListener('click',()=>closeModal(modal))));
document.addEventListener('keydown',e=>{if(e.key==='Escape')modals.forEach(m=>{if(m.getAttribute('aria-hidden')==='false')closeModal(m);});if(e.key==='Tab'){const modal=modals.find(m=>m.getAttribute('aria-hidden')==='false');if(!modal)return;const els=[...modal.querySelectorAll('button:not([disabled]),a[href],textarea,input,select,video[controls]')].filter(x=>x.offsetParent!==null);if(els.length){if(e.shiftKey&&document.activeElement===els[0]){e.preventDefault();els.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===els.at(-1)){e.preventDefault();els[0].focus();}}}});
items.forEach(item=>item.addEventListener('click',()=>{$('#modalImage').src=item.dataset.image;$('#modalImage').alt=item.querySelector('img').alt;$('#modalCaption').textContent=item.dataset.caption;openModal($('#imageModal'));}));
$('#openFilm').addEventListener('click',()=>{openModal($('#filmModal'));$('#filmPlayer').play().catch(()=>{});});
const checkin=$('#checkin'),checkout=$('#checkout'),today=new Date();today.setMinutes(today.getMinutes()-today.getTimezoneOffset());const todayDate=today.toISOString().slice(0,10);checkin.min=todayDate;checkout.min=todayDate;
checkin.addEventListener('change',()=>{checkout.min=checkin.value;if(checkout.value&&checkout.value<=checkin.value)checkout.value='';});
$('#enquiryForm').addEventListener('submit',e=>{e.preventDefault();if(!checkin.value||!checkout.value)return;if(checkout.value<=checkin.value){checkout.setCustomValidity('Check-out must be after check-in');checkout.reportValidity();return;}checkout.setCustomValidity('');const message=`Hello Hotel Suraj Heritage,\n\nI would like to enquire about room availability.\nCheck-in: ${checkin.value}\nCheck-out: ${checkout.value}\nGuests: ${$('#guests').value}\n\nPlease share available room options, rates and booking details.\n\nThank you.`;$('#enquiryText').value=message;$('#copyFeedback').textContent='';openModal($('#enquiryModal'));});
checkout.addEventListener('change',()=>checkout.setCustomValidity(''));
$('#copyEnquiry').addEventListener('click',async()=>{const text=$('#enquiryText').value;try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);}else{const textarea=$('#enquiryText');textarea.focus();textarea.select();if(!document.execCommand('copy'))throw new Error('Copy unsupported');}$('#copyFeedback').textContent='Enquiry details copied. You can share them with the hotel.';}catch(e){$('#enquiryText').focus();$('#enquiryText').select();$('#copyFeedback').textContent='Select and copy the highlighted message manually.';}});
})();
