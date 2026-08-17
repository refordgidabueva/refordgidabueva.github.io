(()=>{
  'use strict';

  if(!document.querySelector('link[data-portfolio-fixes]')){
    const css=document.createElement('link');
    css.rel='stylesheet';
    css.href='fixes.css?v=20260818-1';
    css.dataset.portfolioFixes='true';
    document.head.appendChild(css);
  }

  const qs=(s,r=document)=>r.querySelector(s);
  const qsa=(s,r=document)=>[...r.querySelectorAll(s)];

  function applyStaticEnhancements(){
    const cvif=qsa('.timeline').find(a=>a.querySelector('.institution')?.textContent.includes('Central Visayan Institute Foundation'));
    const box=cvif?.querySelector('.orglogo');
    if(box){
      box.classList.remove('initials');
      box.innerHTML='<img src="cvif-logo-small.webp" alt="Central Visayan Institute Foundation logo">';
    }

    const awards=qs('#awards');
    if(awards&&!awards.querySelector('[data-dost-scholar]')){
      const card=document.createElement('article');
      card.dataset.dostScholar='true';
      card.innerHTML='<span>Graduate Study · 2026—present</span><h3>DOST Scholar</h3><p>Graduate scholarship support for my Master of Science studies at Kasetsart University.</p><button class="expand" type="button" aria-expanded="false">Details +</button><div class="expandable" hidden>Supported by the Philippine Department of Science and Technology (DOST) during my graduate studies.</div>';
      awards.prepend(card);
    }

    const ms=qsa('.edu').find(e=>e.textContent.includes('Master of Science in Bioscience'));
    if(ms&&!ms.querySelector('.dost-chip')){
      const chip=document.createElement('span');
      chip.className='dost-chip';
      chip.textContent='DOST Scholar';
      ms.querySelector('.institution')?.insertAdjacentElement('afterend',chip);
    }

    if(!qs('style[data-dost-style]')){
      const st=document.createElement('style');
      st.dataset.dostStyle='true';
      st.textContent='.dost-chip{display:inline-block;margin:2px 0 10px;padding:5px 9px;border-radius:999px;background:#eef8f2;color:#055d30;font-size:.7rem;font-weight:800}#awards article{transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease}#awards article:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(5,93,48,.08);border-color:rgba(8,120,62,.28)}#awards .expand{margin-top:12px}';
      document.head.appendChild(st);
    }
  }

  const modalData={
    genomics:{k:'RESEARCH AREA 01',t:'Cassava Genomics',c:'I use targeted-gene curation and genome-scale analysis to examine genetic diversity in cassava, including sequence variants, haplotypes, and structural variation across starch-related genes.',tags:['Pangenomics','Gene curation','Haplotypes','SNPs & indels','Structural variants']},
    starch:{k:'RESEARCH AREA 02',t:'Starch Phosphorylation',c:'My research focuses on genetic and biochemical variation in pathways that shape cassava starch properties, particularly phosphorylation and the distribution of glucose-3-phosphate and glucose-6-phosphate.',tags:['GWD/PWD','G3P','G6P','Total phosphate','Starch quality']},
    phenotyping:{k:'RESEARCH AREA 03',t:'Integrated Phenotyping',c:'I pair genomic analyses with laboratory measurements so sequence variation can be interpreted alongside experimentally measured starch traits and spectral or microscopic data.',tags:['FT-NIR','HPAEC-PAD','Enzymatic assays','Starch isolation','SEM']}
  };

  function showPanel(tab){
    const id=tab?.dataset.tab;
    if(!id)return;
    qsa('.tab').forEach(t=>{
      const active=t===tab;
      t.classList.toggle('active',active);
      t.setAttribute('aria-selected',String(active));
    });
    qsa('.panel').forEach(p=>{
      const active=p.id===id;
      p.hidden=!active;
      p.classList.toggle('active',active);
    });
  }

  function toggleDetails(btn){
    const details=btn.nextElementSibling;
    if(!details)return;
    const opening=details.hidden;
    details.hidden=!opening;
    btn.setAttribute('aria-expanded',String(opening));
    btn.textContent=opening?'Hide details −':'Details +';
  }

  function toggleWorkflow(btn){
    const target=document.getElementById(btn.dataset.toggle);
    if(!target)return;
    const opening=target.hidden;
    target.hidden=!opening;
    btn.setAttribute('aria-expanded',String(opening));
    btn.textContent=opening?'Hide research workflow −':'View research workflow +';
  }

  function setFilter(btn){
    const value=btn.dataset.filter;
    qsa('.filter').forEach(f=>f.classList.toggle('active',f===btn));
    qsa('.skill-cloud span').forEach(s=>s.classList.toggle('hidden',value!=='all'&&s.dataset.cat!==value));
  }

  function openResearch(btn){
    const x=modalData[btn.dataset.modal];
    const d=qs('#research-dialog');
    if(!x||!d)return;
    qs('#dialog-kicker').textContent=x.k;
    qs('#dialog-title').textContent=x.t;
    qs('#dialog-copy').textContent=x.c;
    qs('#dialog-tags').innerHTML=x.tags.map(v=>`<span>${v}</span>`).join('');
    if(typeof d.showModal==='function'&&!d.open)d.showModal();
  }

  function resetUi(){
    applyStaticEnhancements();
    document.documentElement.classList.add('ui-ready');
    qsa('.reveal').forEach(el=>el.classList.add('visible'));
    const activeTab=qs('.tab.active')||qs('.tab');
    if(activeTab)showPanel(activeTab);
    const activeFilter=qs('.filter.active')||qs('.filter[data-filter="all"]');
    if(activeFilter)setFilter(activeFilter);
    const year=qs('#year');
    if(year)year.textContent=new Date().getFullYear();
  }

  document.addEventListener('click',e=>{
    const button=e.target.closest('button');
    if(!button)return;

    if(button.matches('.menu')){
      e.preventDefault();e.stopImmediatePropagation();
      const nav=qs('.site-header nav');
      const opening=!nav?.classList.contains('open');
      nav?.classList.toggle('open',opening);
      button.setAttribute('aria-expanded',String(opening));
      return;
    }
    if(button.matches('.tab')){
      e.preventDefault();e.stopImmediatePropagation();showPanel(button);return;
    }
    if(button.matches('.expand')){
      e.preventDefault();e.stopImmediatePropagation();toggleDetails(button);return;
    }
    if(button.matches('[data-toggle="workflow"]')){
      e.preventDefault();e.stopImmediatePropagation();toggleWorkflow(button);return;
    }
    if(button.matches('.filter')){
      e.preventDefault();e.stopImmediatePropagation();setFilter(button);return;
    }
    if(button.matches('[data-modal]')){
      e.preventDefault();e.stopImmediatePropagation();openResearch(button);return;
    }
    if(button.matches('#research-dialog .close')){
      e.preventDefault();e.stopImmediatePropagation();qs('#research-dialog')?.close();return;
    }
  },true);

  document.addEventListener('click',e=>{
    if(!e.target.closest('.site-header nav a'))return;
    qs('.site-header nav')?.classList.remove('open');
    qs('.menu')?.setAttribute('aria-expanded','false');
  });

  qs('#research-dialog')?.addEventListener('click',e=>{
    const d=e.currentTarget;
    const r=d.getBoundingClientRect();
    if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();
  });

  document.addEventListener('keydown',e=>{if(e.key==='Escape')qs('#research-dialog')?.close();});

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',resetUi,{once:true});
  else resetUi();
  window.addEventListener('pageshow',resetUi);
  window.addEventListener('focus',()=>document.documentElement.classList.add('ui-ready'));
})();
