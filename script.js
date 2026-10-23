const slides=[...document.querySelectorAll('.hero-slide')];
const dotsWrap=document.querySelector('.hero-dots');
let current=0, timer;
slides.forEach((_,i)=>{const b=document.createElement('button');b.setAttribute('aria-label',`Ir para slide ${i+1}`);b.addEventListener('click',()=>go(i));dotsWrap.appendChild(b)});
const dots=[...dotsWrap.children];
function render(){slides.forEach((s,i)=>s.classList.toggle('active',i===current));dots.forEach((d,i)=>d.classList.toggle('active',i===current))}
function go(i){current=(i+slides.length)%slides.length;render();restart()}
function restart(){clearInterval(timer);timer=setInterval(()=>go(current+1),6500)}
document.querySelector('.hero-arrow.next').onclick=()=>go(current+1);
document.querySelector('.hero-arrow.prev').onclick=()=>go(current-1);
render();restart();

const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

document.querySelectorAll('.accordion-item button').forEach(btn=>btn.addEventListener('click',()=>{
  const item=btn.parentElement;
  const wasOpen=item.classList.contains('open');
  document.querySelectorAll('.accordion-item').forEach(acc=>acc.classList.remove('open'));
  if(!wasOpen){item.classList.add('open')}
}));


const form=document.getElementById('leadForm');
form?.addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(form);
  const msg=[
    'Olá, quero ser cliente L2K!',
    `Nome: ${data.get('nome')}`,
    `Email: ${data.get('email')}`,
    `Telefone: ${data.get('telefone')}`,
    `Cidade: ${data.get('cidade')}`,
    `Plano: ${data.get('plano')}`,
    `Endereço: ${data.get('endereco')||'Não informado'}`
  ].join('\n');
  window.open(`https://wa.me/5575981167034?text=${encodeURIComponent(msg)}`,'_blank');
});


// Planos com adicionais opcionais
const brl = value => value.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});

document.querySelectorAll('.plan-card[data-base-price]').forEach(card=>{
  const base = Number(card.dataset.basePrice);
  const mega = card.dataset.mega;
  const priceEl = card.querySelector('.price-value');
  const totalEl = card.querySelector('.plan-total');
  const cta = card.querySelector('.btn.full');
  const options = [...card.querySelectorAll('.plan-option')];

  const updatePlan = () => {
    const selected = options.filter(o=>o.checked);
    const extra = selected.reduce((sum,o)=>sum + Number(o.dataset.price||0),0);
    const total = base + extra;
    priceEl.textContent = `R$ ${brl(total)}`;
    totalEl.textContent = `R$ ${brl(total)}/mês`;

    card.classList.remove('price-updated');
    void card.offsetWidth;
    if(extra>0) card.classList.add('price-updated');

    const extrasText = selected.length
      ? selected.map(o=>`${o.dataset.option} (+ R$ ${brl(Number(o.dataset.price))})`).join(', ')
      : 'Sem adicionais opcionais';
    const message = [
      `Olá, quero o plano de ${mega} Mega.`,
      `Valor base: R$ ${brl(base)}/mês`,
      `Adicionais: ${extrasText}`,
      `Valor total: R$ ${brl(total)}/mês`
    ].join('\n');
    cta.href = `https://wa.me/5575981167034?text=${encodeURIComponent(message)}`;
  };

  options.forEach(option=>option.addEventListener('change',updatePlan));
  updatePlan();
});
