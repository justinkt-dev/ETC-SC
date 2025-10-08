type ProductCategory = 'laptop'|'printer'|'ink'|'camera'|'cleaner';

interface Product {
  id: string;
  name: string;
  image: string;
  category: ProductCategory;
  isNew?: boolean;
  bestSeller?: boolean;
  specs?: Record<string,string>;
}

const products: Product[] = [
  { id: 'p1', name: 'Ordinateur Portable Pro 14"', image: 'assets/hero-laptop.webp', category: 'laptop', isNew: true, specs: { CPU: 'Intel Core i7', RAM: '16 Go', Stockage: '512 Go SSD' } },
  { id: 'p2', name: 'Imprimante Jet d’encre X200', image: 'assets/sample-printer.webp', category: 'printer', bestSeller: true, specs: { Résolution: '4800 x 1200 dpi', Connectivité: 'Wi‑Fi, USB' } },
  { id: 'p3', name: 'Encre Universelle CMYK (Pack)', image: 'assets/sample-ink.webp', category: 'ink', specs: { Compatibilité: 'Jet d’encre', Rendement: 'Jusqu’à 5000 pages' } },
  { id: 'p4', name: 'Caméra Action 4K', image: 'assets/sample-camera.webp', category: 'camera', isNew: true, specs: { Vidéo: '4K60', Étanchéité: '10 m' } },
  { id: 'p5', name: 'Nettoyant pour appareils (Kit)', image: 'assets/sample-cleaner.webp', category: 'cleaner', bestSeller: true, specs: { Contenu: 'Spray + chiffon', Volume: '200 ml' } },
  { id: 'p6', name: 'Laptop UltraFin 15"', image: 'assets/hero-laptop.webp', category: 'laptop', specs: { CPU: 'AMD Ryzen 7', RAM: '16 Go', Poids: '1.4 kg' } },
  { id: 'p7', name: 'Imprimante Laser L500', image: 'assets/sample-printer.webp', category: 'printer', specs: { Vitesse: '35 ppm', Réseau: 'Ethernet' } },
  { id: 'p8', name: 'Caméra Bridge Zoom', image: 'assets/sample-camera.webp', category: 'camera', specs: { Capteur: '20 MP', Zoom: '40x' } },
  { id: 'p9', name: 'Spray Nettoyant Écran', image: 'assets/sample-cleaner.webp', category: 'cleaner', specs: { Sans_alcool: 'Oui', Volume: '100 ml' } },
];

function formatGNF(value: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'GNF', maximumFractionDigits: 0 }).format(value);
}

function createProductCard(product: Product): HTMLElement {
  const card = document.createElement('article');
  card.className = 'card';
  card.setAttribute('data-category', product.category);
  card.innerHTML = `
    ${product.isNew ? '<span class="badge new">Nouveau</span>' : product.bestSeller ? '<span class="badge best">Best‑Seller</span>' : ''}
    <picture>
      <source type="image/webp" srcset="${product.image}">
      <img src="${product.image.replace('.webp','.svg')}" alt="${product.name}">
    </picture>
    <h4>${product.name}</h4>
    <div class="muted">Disponible</div>
    
    <div class="actions">
      <button class="btn primary" data-details data-id="${product.id}">Voir détails</button>
    </div>
  `;
  return card;
}

function renderProducts(filter: ProductCategory | 'all' | 'new' = 'all') {
  const grid = document.getElementById('productGrid') as HTMLElement | null;
  if (!grid) return;
  grid.innerHTML = '';
  products
    .filter(p => {
      if(filter === 'all') return true;
      if(filter === 'new') return !!p.isNew;
      return p.category === filter;
    })
    .forEach(p => grid.appendChild(createProductCard(p)));
  wireDetails();
}

function activateFilters(){
  const pills = document.querySelectorAll('.pill') as NodeListOf<HTMLElement>;
  pills.forEach(p => p.addEventListener('click', () => {
    pills.forEach(el => el.classList.remove('active'));
    p.classList.add('active');
    const target = (p.dataset.filter || 'all') as ProductCategory | 'all';
    renderProducts(target);
  }));
}

function renderTopSellers(){
  const ul = document.getElementById('topSellers');
  if(!ul) return;
  ul.innerHTML = '';
  products.slice(0,8).forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `<picture><source type="image/webp" srcset="${p.image}"><img src="${p.image.replace('.webp','.svg')}" alt="${p.name}"></picture><span>${p.name}</span>`;
    ul.appendChild(li);
  });
}

function wireDetails(){
  const grid = document.getElementById('productGrid');
  const modal = document.getElementById('productModal') as HTMLElement | null;
  const body = document.getElementById('modalBody') as HTMLElement | null;
  if(!grid || !modal || !body) return;
  grid.querySelectorAll('[data-details]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = (btn as HTMLElement).dataset.id || '';
      const product = products.find(p => p.id === id);
      if(!product) return;
      const specsHtml = Object.entries(product.specs || {}).map(([k,v]) => `<div class="spec-item"><span>${k}</span><span>${v}</span></div>`).join('');
      
      body.innerHTML = `
        <div>
          <picture>
            <source type="image/webp" srcset="${product.image}">
            <img style="width:100%;height:300px;object-fit:cover;border-radius:12px" src="${product.image.replace('.webp','.svg')}" alt="${product.name}">
          </picture>
        </div>
        <div>
          <h3 style="margin:0 0 8px 0">${product.name}</h3>
          
          <div class="specs" style="margin-top:10px">${specsHtml || '<span class="muted">Spécifications à venir…</span>'}</div>
        </div>`;
      modal.setAttribute('aria-hidden','false');
    });
  });
  // close handlers
  modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click',()=>modal.setAttribute('aria-hidden','true')));
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') modal.setAttribute('aria-hidden','true');
  });
}

function wireNewsletter(){
  const form = document.getElementById('newsletterForm') as HTMLFormElement | null;
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletterEmail') as HTMLInputElement | null;
    const email = emailInput?.value || '';
    if (!email) return;
    alert(`Merci! Les offres seront envoyées à ${email}.`);
    form.reset();
  });
}

function wireSearch(){
  const form = document.getElementById('searchForm') as HTMLFormElement | null;
  const input = document.getElementById('searchInput') as HTMLInputElement | null;
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const q = (input?.value || '').toLowerCase();
    const cards = Array.from(document.querySelectorAll('#productGrid .card')) as HTMLElement[];
    cards.forEach(card => {
      const name = card.querySelector('h4')?.textContent?.toLowerCase() || '';
      card.style.display = name.includes(q) ? '' : 'none';
    });
  });
}

function wireContact(){
  const form = document.getElementById('contactForm') as HTMLFormElement | null;
  const flash = document.getElementById('contactFlash') as HTMLElement | null;
  form?.addEventListener('submit', e => {
    e.preventDefault();
    if (!form) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const email = String(data.get('email') || '').trim();
    const subject = String(data.get('subject') || '').trim();
    const message = String(data.get('message') || '').trim();
    if(!name || !phone || !email || !subject || !message){
      if (flash) {
        flash.textContent = 'Veuillez remplir tous les champs obligatoires.';
        flash.style.color = '#b91c1c';
      }
      return;
    }
    if (flash) {
      flash.textContent = `Merci ${name}! Votre message a été envoyé.`;
      flash.style.color = '#065f46';
    }
    form.reset();
  });
}

function setYear(){
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = String(new Date().getFullYear());
}

function startHeroRotation(){
  const container = document.getElementById('heroRotator');
  if(!container) return;
  const img = container.querySelector('img') as HTMLImageElement | null;
  if(!img) return;
  const sources = [
    { webp: 'assets/laptop.webp', fallback: 'assets/laptop.webp', alt: 'Laptop' },
    { webp: 'assets/cctv.webp', fallback: 'assets/cctv.webp', alt: 'Caméra' },
    { webp: 'assets/printer.webp', fallback: 'assets/printer.webp', alt: 'Imprimante' },
    { webp: 'assets/inc.webp', fallback: 'assets/inc.webp', alt: 'Encres' },
    { webp: 'assets/converter.webp', fallback: 'assets/converter.webp', alt: 'Convertisseur' },
  ];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % sources.length;
    const pic = container.querySelector('source') as HTMLSourceElement | null;
    if(pic){ pic.srcset = sources[i].webp; }
    img.src = sources[i].fallback;
    img.alt = sources[i].alt;
  }, 3500);
}

function wireThemeToggle(){
  const btn = document.getElementById('themeToggle');
  if(!btn) return;
  // initialize from localStorage
  const saved = localStorage.getItem('theme');
  if(saved === 'dark') document.documentElement.classList.add('dark');
  btn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

function wireQuickRequest(){
  const form = document.getElementById('quickRequestForm') as HTMLFormElement | null;
  const flash = document.getElementById('quickFlash') as HTMLElement | null;
  form?.addEventListener('submit', e => {
    e.preventDefault();
    flash && (flash.textContent = 'Merci! Nous vous recontactons rapidement.');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');
  renderTopSellers();
  activateFilters();
  wireNewsletter();
  wireSearch();
  wireContact();
  setYear();
  startHeroRotation();
  wireThemeToggle();
  const nouveauxLink = document.getElementById('linkNouveaux');
  nouveauxLink?.addEventListener('click', (e) => {
    e.preventDefault();
    const newPill = document.querySelector('[data-filter="new"]') as HTMLElement | null;
    if(newPill){
      document.querySelectorAll('.pill').forEach(el => el.classList.remove('active'));
      newPill.classList.add('active');
      renderProducts('new');
    }
    document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


