const menu=document.querySelector('.menu');const nav=document.querySelector('.site-header nav');menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav?.classList.toggle('open',!open)});document.querySelectorAll('.site-header nav a').forEach(a=>a.addEventListener('click',()=>{nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
const secObs=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;document.querySelectorAll('.site-header nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${e.target.id}`))}),{rootMargin:'-35% 0px -55% 0px'});document.querySelectorAll('.anchor').forEach(s=>secObs.observe(s));
const wfBtn=document.querySelector('[data-toggle="workflow"]');const wf=document.getElementById('workflow');wfBtn?.addEventListener('click',()=>{const x=wfBtn.getAttribute('aria-expanded')==='true';wfBtn.setAttribute('aria-expanded',String(!x));if(wf)wf.hidden=x});
document.querySelectorAll('.expand').forEach(b=>b.addEventListener('click',()=>{const c=b.nextElementSibling;if(!c)return;const x=!c.hidden;c.hidden=x;b.textContent=x?'Details +':'Hide details −'}));
const tabs=[...document.querySelectorAll('.tab')],panels=[...document.querySelectorAll('.panel')];tabs.forEach(t=>t.addEventListener('click',()=>{tabs.forEach(x=>x.classList.remove('active'));panels.forEach(p=>{p.hidden=true;p.classList.remove('active')});t.classList.add('active');const p=document.getElementById(t.dataset.tab);if(p){p.hidden=false;p.classList.add('active')}}));
const filters=[...document.querySelectorAll('.filter')],skills=[...document.querySelectorAll('.skill-cloud span')];filters.forEach(f=>f.addEventListener('click',()=>{filters.forEach(x=>x.classList.remove('active'));f.classList.add('active');skills.forEach(s=>s.classList.toggle('hidden',f.dataset.filter!=='all'&&s.dataset.cat!==f.dataset.filter))}));
const data={genomics:{k:'RESEARCH AREA 01',t:'Cassava Genomics',c:'I use targeted-gene curation and genome-scale analysis to examine genetic diversity in cassava, including sequence variants, haplotypes, and structural variation across starch-related genes.',tags:['Pangenomics','Gene curation','Haplotypes','SNPs & indels','Structural variants']},starch:{k:'RESEARCH AREA 02',t:'Starch Phosphorylation',c:'My research focuses on genetic and biochemical variation in pathways that shape cassava starch properties, particularly phosphorylation and the distribution of glucose-3-phosphate and glucose-6-phosphate.',tags:['GWD/PWD','G3P','G6P','Total phosphate','Starch quality']},phenotyping:{k:'RESEARCH AREA 03',t:'Integrated Phenotyping',c:'I pair genomic analyses with laboratory measurements so sequence variation can be interpreted alongside experimentally measured starch traits and spectral or microscopic data.',tags:['FT-NIR','HPAEC-PAD','Enzymatic assays','Starch isolation','SEM']}};
const d=document.getElementById('research-dialog');document.querySelectorAll('[data-modal]').forEach(b=>b.addEventListener('click',()=>{const x=data[b.dataset.modal];if(!x||!d)return;document.getElementById('dialog-kicker').textContent=x.k;document.getElementById('dialog-title').textContent=x.t;document.getElementById('dialog-copy').textContent=x.c;document.getElementById('dialog-tags').innerHTML=x.tags.map(v=>`<span>${v}</span>`).join('');d.showModal()}));d?.querySelector('.close')?.addEventListener('click',()=>d.close());d?.addEventListener('click',e=>{const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()});document.getElementById('year').textContent=new Date().getFullYear();

/* Institution marks: corrected sources with safe fallbacks. */
const logoStyle=document.createElement('style');logoStyle.textContent=`
.logo-fallback{font-weight:900;color:#08783e;font-size:1rem;letter-spacing:.03em;text-align:center;line-height:1.05}
.logo-fallback small{display:block;font-size:.46rem;color:#64736c;margin-top:3px;letter-spacing:0}
`;document.head.appendChild(logoStyle);

/* Exact KU mark currently used on the Thai Wikipedia article supplied by the site owner; its Commons record cites the official KU Corporate Identity Guidelines. */
const kuImg=[...document.querySelectorAll('.edulogo img')].find(img=>img.alt==='Kasetsart University logo');
if(kuImg){
  kuImg.referrerPolicy='no-referrer';
  kuImg.src='https://upload.wikimedia.org/wikipedia/commons/4/43/Kasetsart_Sublogo-TH.svg';
  kuImg.onerror=()=>{const box=kuImg.parentElement;if(box){box.innerHTML='<div class="logo-fallback">KU<small>Kasetsart University</small></div>'}}
}

/* DA-CBC: use the icon associated with the official dacbc.philrice.gov.ph site rather than a generic DA regional logo. */
const cbcArticle=[...document.querySelectorAll('.timeline')].find(a=>a.querySelector('.institution')?.textContent.includes('Crop Biotechnology Center'));
if(cbcArticle){
  const box=cbcArticle.querySelector('.orglogo');
  const img=box?.querySelector('img');
  if(img){
    img.referrerPolicy='no-referrer';
    img.src='https://www.google.com/s2/favicons?domain=dacbc.philrice.gov.ph&sz=256';
    img.alt='DA-Crop Biotechnology Center logo';
    img.onerror=()=>{if(box)box.innerHTML='<div class="logo-fallback">DA-CBC<small>Crop Biotechnology Center</small></div>'}
  }
}
