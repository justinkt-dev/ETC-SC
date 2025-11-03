"use strict";
// Global configuration for contact details and shared helpers
const CONTACT = {
  whatsapp: '+224666958301',
  phonePrimary: '666 958301',
  phoneSecondary: '+224 620874088'
};

// Choose which product IDs to feature in "Meilleures ventes" (leave empty to auto-pick first 8)
// Example: ['p23','p21','p25','p26']
const TOP_SELLER_IDS = ['p1','p20','p40','p60', 'p71', 'p112'];

function buildWhatsAppUrl(phone, message) {
  const base = 'https://api.whatsapp.com/send';
  const params = new URLSearchParams({
    phone: String(phone || '').replace(/\s+/g, ''),
    text: message || 'Bonjour ! Puis-je en savoir plus à ce sujet ?'
  });
  return `${base}?${params.toString()}`;
}

// Lightweight version banner (one-time)
(() => {
  if (!window.__etcAppBootLogged) {
    window.__etcAppBootLogged = true;
    // eslint-disable-next-line no-console
    console.log('[ETC SC Corp] App initialized • contact:', CONTACT.phonePrimary, CONTACT.phoneSecondary);
  }
})();
// Central email configuration for outbound requests/notifications
const products = [
  // { id: 'p1', name: 'Ordinateur Portable Pro 14"', image: 'assets/ordi-portable.webp', category: 'laptop', isNew: true, specs: { CPU: 'Intel Core i7', RAM: '16 Go', Stockage: '512 Go SSD' } },
  { id: 'p1', name: 'HP Omen 13e génération i9, 16 GB RAM, 1 TB SSD, 8 GB C.G', image: 'assets/omen-laptop.webp', category: 'laptop', isNew: true, specs: { CPU: 'Intel Core i9', RAM: '16 GB', Graphics: '8 GB C.G', Stockage: '1 TB SSD' } },
  { id: 'p2', name: 'HP Omen 13e génération i9, 32 GB RAM, 1 TB SSD, 8 GB C.G', image: 'assets/omen-laptop.webp', category: 'laptop', specs: { CPU: 'Intel Core i9', RAM: '32 GB', Graphics: '8 GB C.G', Stockage: '1 TB SSD' } },
  
  { id: 'p10', name: 'HP Victus 13e génération i7, 16 GB RAM, 512 GB SSD, 6GB C.G', image: 'assets/victus-laptop.webp', category: 'laptop', isNew: true, specs: { CPU: 'Intel Core i7', RAM: '16 GB', Graphics: '6 GB C.G', Stockage: '512 GB SSD' } },
  { id: 'p11', name: 'HP Victus 13e génération i7, 32 GB RAM, 1 TB SSD, 6GB C.G', image: 'assets/victus-laptop.webp', category: 'laptop', specs: { CPU: 'Intel Core i7', RAM: '32 GB', Graphics: '6 GB C.G', Stockage: '1 TB SSD' } },
  { id: 'p12', name: 'Imprimante Epson L3252', image: 'assets/epson-l3252.webp', category: 'printer', specs: { Vitesse: '35 ppm', Réseau: 'Ethernet', Colours: 'Noir & Blanc | Colorié' } },
  { id: 'p13', name: 'Imprimante HP M3303FDW', image: 'assets/hp-m3303fdw.webp', category: 'printer', specs: { Vitesse: '35 ppm', Réseau: 'Ethernet', Colours: 'Noir & Blanc | Colorié' } },


  { id: 'p20', name: 'Laptop HP 12e et 13e génération Note-Book i3, 8 GB RAM, 512 GB SSD', image: 'assets/noteprobook-laptop.webp', category: 'laptop', specs: { CPU: 'Intel Core i3', RAM: '8 GB | 16 GB', Stockage: '512 GB SSD' } },
  { id: 'p22', name: 'Laptop HP 12e et 13e génération Note-Book i5, 8 GB RAM, 512 GB SSD', image: 'assets/noteprobook-laptop.webp', category: 'laptop', isNew: true, specs: { CPU: 'Intel Core i5', RAM: '8 GB | 16 GB', Stockage: '512 GB SSD' } },
  { id: 'p23', name: 'Laptop HP 12e et 13e génération Note-Book i5, 16 GB RAM, 512 GB SSD', image: 'assets/noteprobook-laptop.webp', category: 'laptop', specs: { CPU: 'Intel Core i5', RAM: '16 GB', Stockage: '512 GB SSD' } },
  { id: 'p24', name: 'Laptop HP 12e et 13e génération Note-Book i7, 16 GB RAM, 512 GB SSD', image: 'assets/noteprobook-laptop.webp', category: 'laptop', isNew: true, specs: { CPU: 'Intel Core i7', RAM: '16 GB', Stockage: '512 GB SSD' } },

  { id: 'p30', name: 'HP Envy Intel Core i5, 16 GB RAM, 512 GB SSD', image: 'assets/hp-ultra-thin.webp', category: 'laptop', specs: { CPU: 'Intel Core i5', RAM: '16 GB', Stockage: '512 GB SSD' } },
  { id: 'p31', name: 'HP Envy Ultra 5, 16 GB RAM, 512 GB SSD', image: 'assets/hp-ultra-thin.webp', category: 'laptop', specs: { CPU: 'Ultra 5', RAM: '16 GB', Stockage: '512 GB SSD' } },
  { id: 'p32', name: 'HP Envy Ultra 7, 16 GB RAM, 512 GB SSD', image: 'assets/hp-ultra-thin.webp', category: 'laptop', specs: { CPU: 'Ultra 7', RAM: '16 GB', Stockage: '512 GB SSD' } },
  { id: 'p33', name: 'Chargeurs HP', image: 'assets/hp-charger2.webp', category: 'chargers', specs: { Type: 'Chargeurs', Cagetories: 'HP' } },
  { id: 'p34', name: 'Chargeurs Dell', image: 'assets/dell-charger2.webp', category: 'chargers', specs: { Type: 'Chargeurs', Cagetories: 'HP' } },
  { id: 'p35', name: 'Chargeurs Lenovo', image: 'assets/lenovo-charger2.webp', category: 'chargers', specs: { Type: 'Chargeurs', Cagetories: 'HP' } },


  { id: 'p40', name: 'HP Omni Book 5, i5, 8 GB RAM, 512 GB SSD', image: 'assets/omni-book5.webp', bestSeller: true, category: 'laptop', specs: { CPU: 'Intel Core i5', RAM: '16 GB', Stockage: '512 GB SSD' } },
  
  { id: 'p42', name: 'Onduleur 1200VA, 1500VA, 2250VA, 3000VA', image: 'assets/onduleur.webp', category: 'accessory', specs: { Type: 'Onduleur', Puissance: '1200VA | 1500VA | 2250VA | 3000VA' } },
  { id: 'p43', name: 'Climatiseurs 9000 BTU, 12000 BTU', image: 'assets/climatiseur.webp', category: 'accessory', specs: { Type: 'Climatiseurs', Puissance: '9000 BTU | 12000 BTU' } },
  { id: 'p44', name: 'Fourniture de bureau', image: 'assets/station.webp', category: 'papeteries', specs: { Type: 'Papeteries' } },
  { id: 'p45', name: 'Fourniture de bureau', image: 'assets/station2.webp', category: 'papeteries', specs: { Type: 'Papeteries' } },
  { id: 'p46', name: 'Fourniture de bureau', image: 'assets/station3.webp', category: 'papeteries', specs: { Type: 'Papeteries' } },
  { id: 'p47', name: 'Enveloppes', image: 'assets/station4.webp', category: 'papeteries', specs: { Type: 'Papeteries' } },

  
  { id: 'p50', name: 'Desktop All in One 12e et 13e génération i5, 8 GB RAM, 512 GB SSD', image: 'assets/dellAIO.webp', category: 'laptop', isNew: true, specs: { CPU: 'Intel Core i5', RAM: '8 GB', Stockage: '512 GB | 1 TB SSD' } },
  { id: 'p51', name: 'Desktop All in One 12e et 13e génération i5, 16 GB RAM, 512 GB SSD', image: 'assets/dellAIO.webp', category: 'laptop', specs: { CPU: 'Intel Core i5', RAM: '16 GB', Stockage: '512 GB | 1 TB SSD' } },
  { id: 'p52', name: 'Desktop All in One 12e et 13e génération i7, 8 GB RAM, 512 GB SSD', image: 'assets/dellAIO.webp', category: 'laptop', specs: { CPU: 'Intel Core i5 | i7', RAM: '8 GB | 16 GB', Stockage: '512 GB | 1 TB SSD' } },
  { id: 'p53', name: 'Desktop All in One 12e et 13e génération i7, 16 GB RAM, 1TB SSD', image: 'assets/dellAIO.webp', category: 'laptop', isNew: true, specs: { CPU: 'Intel Core i5 | i7', RAM: '8 GB | 16 GB', Stockage: '512 GB | 1 TB SSD' } },
  { id: 'p55', name: 'Desktop HP 290 i5, 8 GB RAM, 512 GB SSD', image: 'assets/hp290.webp', category: 'laptop', specs: { CPU: 'Intel Core i5', RAM: '8 GB', Stockage: '512 GB SSD' } },
  { id: 'p56', name: 'Desktop HP 290 i7, 8 GB RAM, 512 GB SSD', image: 'assets/hp290.webp', category: 'laptop', isNew: true, specs: { CPU: 'Intel Core i7', RAM: '8 GB', Stockage: '512 GB SSD' } },
  
  { id: 'p60', name: 'Chargeurs HP Type-C 65W', image: 'assets/hp-charger.webp', bestSeller: true, category: 'chargers', specs: { Type: 'Chargeurs', Cagetories: 'HP' } },
  { id: 'p61', name: 'Chargeurs DELL Type-C 65W', image: 'assets/dell-charger.webp', category: 'chargers', specs: { Type: 'Chargeurs', Cagetories: 'HP | Dell | Lenovo' } },
  { id: 'p62', name: 'Chargeurs Lenovo Type-C 65W', image: 'assets/lenovo-charger.webp', category: 'chargers', specs: { Type: 'Chargeurs', Cagetories: 'HP | Dell | Lenovo' } },
  { id: 'p63', name: 'Rallonge Electrique APC 1.8 M cord, 5 Outlets', image: 'assets/ext-apc.webp', category: 'rallonge', specs: { Type: 'Rallonge Electrique', Cagetories: 'APC' } },
  { id: 'p64', name: 'Rallonge Electrique APC USB, Type-C', image: 'assets/ext-apc-c.webp', category: 'rallonge', specs: { Type: 'Rallonge Electrique', Cagetories: 'APC Type-C' } },
  { id: 'p65', name: 'Rallonge Electrique Tripplite 1.8 M cord, 6 Outlets, 220-240W', image: 'assets/ext-trip.webp', category: 'rallonge', specs: { Type: 'Rallonge Electrique', Cagetories: 'Tripplite' } },
  { id: 'p66', name: 'Rallonge Electrique GONGNIU 5 M cord, 6 Outlets, Max 3250W', image: 'assets/ext-gongniu.webp', category: 'rallonge', specs: { Type: 'Rallonge Electrique', Cagetories: 'APC Type-C' } },
  { id: 'p68', name: 'Câbles USB, Rj45,HDMI-HDMI, HDMI- DP', image: 'assets/cables.webp', category: 'cables', isNew: true, specs: { Types: 'Câbles', Types: 'USB | Rj45 | HDMI-HDMI | HDMI-VGA | HDMI- DP' } },


  { id: 'p70', name: 'Encre Epson 101, 103, 664', image: 'assets/epson-ink.webp', category: 'ink', isNew: true, specs: { Type: 'Encre', Models: '101 |103 | 667' } },
  { id: 'p71', name: 'Encre HP Toner 107A, 117A', image: 'assets/hptoner-107a.webp', category: 'ink', bestSeller: true, specs: { Type: 'Encre', Models: '107 | 117 | 207 | 216 | 307 | 410 | 415' } },
  { id: 'p72', name: 'Encre HP Toner 203A, 207A, 307A', image: 'assets/hptoner-203a.webp', category: 'ink', bestSeller: true, specs: { Type: 'Encre', Models: '107 | 117 | 207 | 216 | 307 | 410 | 415' } },
  { id: 'p73', name: 'Encre HP Toner 410A, 415A', image: 'assets/hptoner-410a.webp', category: 'ink', bestSeller: true, specs: { Type: 'Encre', Models: '107 | 117 | 207 | 216 | 307 | 410 | 415' } },

  { id: 'p74', name: 'Encre Canon CEXV33', image: 'assets/canon-CEXV33.webp', category: 'ink', specs: { Type: 'Encre', Models: 'Canon CEXV33' } },
  { id: 'p75', name: 'Encre Canon CEXV42', image: 'assets/canon-CEXV42.webp', category: 'ink', specs: { Type: 'Encre', Models: 'Canon CEXV42' } },
  { id: 'p76', name: 'Encre Canon CEXV54', image: 'assets/canon-CEXV54.webp', category: 'ink', specs: { Type: 'Encre', Models: 'Canon CEXV54' } },
  { id: 'p77', name: 'Encre Canon CEXV60', image: 'assets/canon-CEXV60.webp', category: 'ink', specs: { Type: 'Encre', Models: 'Canon CEXV60' } },

  { id: 'p79', name: 'Encre RICOH MP2501SP', image: 'assets/ricoh-ink.webp', category: 'ink', isNew: true, specs: { Type: 'Encre', Models: 'MP2501SP' } },
  
  { id: 'p80', name: 'Souris HP', image: 'assets/hp-mouse.webp', category: 'accessory', specs: { Type: 'Souris', Categories: 'HP' } },
  { id: 'p81', name: 'Souris Logitech M170', image: 'assets/log-mouse.webp', category: 'accessory', specs: { Type: 'Souris', Categories: 'Logitech' } },
  { id: 'p82', name: 'Souris Dell', image: 'assets/dell-mouse.webp', category: 'accessory', specs: { Type: 'Souris', Categories: 'Dell' } },
  { id: 'p83', name: 'Switch 4 Ports', image: 'assets/switch-simple.webp', category: 'switch', specs: { Type: 'Switch', Categories: '6 Ports | 8 Ports | 10 Ports' } },
  { id: 'p84', name: 'Switch 6 Ports POA', image: 'assets/switch-poa.webp', category: 'switch', specs: { Type: 'Switch', Categories: '6 Ports | 8 Ports | 10 Ports' } },
  { id: 'p85', name: 'Switch 8 Ports, 16 Ports Gigabits', image: 'assets/switch.webp', category: 'switch', specs: { Type: 'Switch', Categories: '8 Ports | 16 Ports Gigabits' } },

  
  { id: 'p90', name: "Verrous d'ordinateur Avec clé | Avec code", image: 'assets/comp-lock.webp', category: 'accessory', isNew: true, specs: { Type: 'Verrous', Categories: 'Avec clé | Avec code' } },
  { id: 'p91', name: 'Casque stéréo', image: 'assets/stereo-hs.webp', category: 'accessory', specs: { Type: 'Casque', Categories: 'Stereo' } },
  { id: 'p92', name: 'Adaptateur Type C Rj45', image: 'assets/adapt.webp', category: 'cables', specs: { Type: 'Adaptateur', Categories: 'Type C Rj45' } },
  { id: 'p93', name: 'Souffleur electronique', image: 'assets/soufler.webp', category: 'accessory', isNew: true, specs: { Type: 'Accessoires', Categories: 'Souffleur electronique' } },
  { id: 'p94', name: 'Boîtier disque dur Externe HHD', image: 'assets/box-hdd.webp', category: 'accessory', specs: { Type: 'Boîtier disque dur Externe', Categories: 'HHD' } },
  { id: 'p95', name: 'Boîtier disque dur Externe SDD', image: 'assets/box-ssd.webp', category: 'accessory', specs: { Type: 'Boîtier disque dur Externe', Categories: 'SSD' } },
  { id: 'p96', name: 'Antivirus Kaspersky', image: 'assets/kaspersky.webp', category: 'accessory', specs: { Type: 'Antivirus', Categories: 'Kaspersky' } },
  { id: 'p97', name: 'Licence Office 2021', image: 'assets/licence.webp', category: 'accessory', specs: { Type: 'Licence', Categories: 'Office 2021' } },


  { id: 'p100', name: 'Nettoyant pour appareils (Kit)', image: 'assets/cleaner-kit.webp', category: 'cleaner', bestSeller: true, specs: { Contenu: 'Spray + chiffon', Volume: '200 ml' } },
  { id: 'p101', name: 'Caméra Bridge Zoom', image: 'assets/cctv_old.webp', category: 'camera', specs: { Capteur: '20 MP', Zoom: '40x' } },
  { id: 'p102', name: 'Caméras Dahua technology', image: 'assets/cctv-dahua.webp', category: 'camera', specs: { Capteur: '20 MP', Zoom: '40x' } },
  
  { id: 'p108', name: 'Scanneur Led 300', image: 'assets/scanner-led.webp', category: 'printer', specs: { Type: 'Scanneurs', Categories: 'Led 300' } },
  { id: 'p109', name: 'Scanneur HP2600 F1', image: 'assets/scanner-hp.webp', category: 'printer', specs: { Type: 'Scanneurs', Categories: 'HP 2600 F1' } },
  
  { id: 'p110', name: 'Support Laptop Light Weight', image: 'assets/lapt-stand.webp', category: 'accessory', specs: { Type: 'Support Laptop', Categories: 'Light Weight | Portable' } },
  { id: 'p111', name: 'Support Laptop', image: 'assets/stand-fan.webp', category: 'accessory', specs: { Type: 'Support Laptop', Categories: 'Tablette | Portable' } },
  { id: 'p112', name: 'Spray Nettoyant Écran', image: 'assets/foam-cleaner.webp', bestSeller: true, category: 'cleaner', specs: { Sans_alcool: 'Oui', Volume: '100 ml' } },
  { id: 'p113', name: 'Nettoyeurs - Air Dust', image: 'assets/air-dust.webp', category: 'cleaner', specs: { Type: 'Netoyyant', Marque: 'Hisense', Capacité: '7 Kg' } },
  { id: 'p114', name: 'Routeur Tp‑Link', image: 'assets/router-tp.webp', category: 'router', specs: { Débit: 'Jusqu’à 300 Mbps', Hotspot_WiFi: 'Oui', Couverture: 'Améliorée', Appareils: 'Jusqu’à 32', Réseau: '4G LTE' } },
  { id: 'p115', name: 'Routeur 4G LTE D‑Link DWR‑M921', image: 'assets/router.webp', category: 'router', specs: { Débit: 'Jusqu’à 300 Mbps', Hotspot_WiFi: 'Oui', Couverture: 'Améliorée', Appareils: 'Jusqu’à 32', Réseau: '4G LTE' } },
  { id: 'p116', name: 'Machine a laver', image: 'assets/washing-machine.webp', category: 'accessory', specs: { Type: 'Machine a laver', Marque: 'Hisense', Capacité: '7 Kg' } },
  { id: 'p117', name: 'Câble HDMI-VGA', image: 'assets/hdmi-vga.webp', category: 'cables', specs: { Type: 'HDMI-VGA', Résolution: 'Jusqu\'à 1080p', Longueur: '1.8 m', Compatibilité: 'PC | Moniteur | Projecteur' } },
  { id: 'p118', name: 'Hub USB‑C 11‑en‑1 (Multiports)', image: 'assets/usbc-hub.webp', category: 'cables', specs: { HDMI: '4K @ 30 Hz', VGA: '1080p @ 60 Hz', USB_3_0: 'x3 ports (5 Gbps)', USB_C_PD: 'Jusqu\'à 100 W', Ethernet: 'Gigabit RJ45', Lecteur_cartes: 'SD + microSD', Audio: 'Jack 3.5 mm', Câble: '15 cm intégré', Compatibilité: 'Windows / macOS / Android' } },

  // Papeteries - Paper related products
  { id: 'p120', name: 'Papier A4 Blanc 80g', image: 'assets/paper-A4.webp', category: 'papeteries', specs: { Type: 'Papier A4', Grammage: '80g', Couleur: 'Blanc', Quantité: '500 feuilles' } },
  { id: 'p121', name: 'Papier A4 Couleur', image: 'assets/paper-A4-color.webp', category: 'papeteries', specs: { Type: 'Papier A4', Grammage: '80g', Couleur: 'Multicolore', Quantité: '250 feuilles' } },
  { id: 'p122', name: 'Agrapheuse Standard', image: 'assets/stapler.webp', category: 'papeteries', specs: { Type: 'Agrapheuse', Capacité: '20 feuilles', Matériau: 'Métal' } },
  { id: 'p123', name: 'Agrafes Standard', image: 'assets/staples.webp', category: 'papeteries', specs: { Type: 'Agrafes', Taille: '26/6', Quantité: '1000 pièces' } },
  { id: 'p124', name: 'Perforateur 2 trous', image: 'assets/perform-2trous.webp', category: 'papeteries', specs: { Type: 'Perforateur', Trous: '2', Capacité: '20 feuilles' } },
  { id: 'p125', name: 'Accessoires Papeterie', image: 'assets/accessoires.webp', category: 'papeteries', specs: { Type: 'Perforateur', Trous: '3', Capacité: '20 feuilles' } },
  { id: 'p126', name: 'Classeur A4', image: 'assets/binder-A4.webp', category: 'papeteries', specs: { Type: 'Classeur', Format: 'A4', Anneaux: '2 ou 4', Couleur: 'Multicolore' } },
  { id: 'p127', name: 'Chemises cartonnées', image: 'assets/folders.webp', category: 'papeteries', isNew: true, specs: { Type: 'Chemises', Matériau: 'Carton', Format: 'A4', Quantité: '10 pièces' } },
  // { id: 'p128', name: 'Papier photo 10x15', image: 'assets/photo-paper.webp', category: 'papeteries', isNew: true, specs: { Type: 'Papier photo', Format: '10x15 cm', Finition: 'Brillant', Quantité: '100 feuilles' } },
  // { id: 'p129', name: 'Papier calque A4', image: 'assets/tracing-paper.webp', category: 'papeteries', isNew: true, specs: { Type: 'Papier calque', Format: 'A4', Transparence: 'Haute', Quantité: '50 feuilles' } },

];


function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'card';
  card.setAttribute('data-category', product.category);
  card.innerHTML = `
    ${product.isNew ? '<span class="badge new">Nouveau</span>' : product.bestSeller ? '<span class="badge best">Best‑Seller</span>' : ''}
    <picture> 
      <source type="image/webp" srcset="${product.image}">
      <img src="${product.image}" alt="${product.name}">
    </picture>
    <h4>${product.name}</h4>
    <div class="muted">Disponible</div>
    <div class="actions">
      <a class="btn whatsapp-btn" target="_blank" rel="noreferrer" href="https://api.whatsapp.com/send?phone=224666958301&text=Lien%C2%A0%3A%0Ahttps%3A%2F%2Ffb.me%2F3ASBAsGrl%0A%0ABonjour%C2%A0%21+Puis-je+en+savoir+plus+%C3%A0+ce+sujet%C2%A0%3F&source_url=https%3A%2F%2Ffb.me%2F3ASBAsGrl&icebreaker=Bonjour%C2%A0%21+Puis-je+en+savoir+plus+%C3%A0+ce+sujet%C2%A0%3F&app=facebook&entry_point=post_cta&jid=224666958301%40s.whatsapp.net&lid=48262581096511%40lid&show_ad_attribution=1&source=FB_Post&token=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyNSJ9.eyJleHAiOjE3NTk3NTYyOTksInBob25lIjoiMjI0NjY2OTU4MzAxIiwidGV4dCI6IkxpZW5cdTAwYTA6XG5odHRwczpcL1wvZmIubWVcLzNBU0JBc0dybFxuXG5Cb25qb3VyXHUwMGEwISBQdWlzLWplIGVuIHNhdm9pciBwbHVzIFx1MDBlMCBjZSBzdWpldFx1MDBhMD8iLCJzb3VyY2VfdXJsIjoiaHR0cHM6XC9cL2ZiLm1lXC8zQVNCQXNHcmwiLCJpY2VicmVha2VyIjoiQm9uam91clx1MDBhMCEgUHVpcy1qZSBlbiBzYXZvaXIgcGx1cyBcdTAwZTAgY2Ugc3VqZXRcdTAwYTA_IiwiYXBwIjoiZmFjZWJvb2siLCJlbnRyeV9wb2ludCI6InBvc3RfY3RhIiwiamlkIjoiMjI0NjY2OTU4MzAxXHUwMDQwcy53aGF0c2FwcC5uZXQiLCJsaWQiOiI0ODI2MjU4MTA5NjUxMVx1MDA0MGxpZCIsInNob3dfYWRfYXR0cmlidXRpb24iOjEsInNvdXJjZSI6IkZCX1Bvc3QiLCJzb3VyY2VfaWQiOiIxMjIwOTU0NDc3NjAyNTc3NjkiLCJjb250ZXh0IjoiQWZkRUZreVJqQWRPMWJvWTdua3pIRDRxVnRiWkVoLU9rNmJrSDZEWlFRQ1A5V3V1SmhGeFJldUg3bkxwSWQ0RTE0YU4xT0hlUW9yOHBLeGR4NUtKak1lVGZUU3VoQi1wLXJnRFIyV1dBX1hHelNwVGlJZ3RYUTFrZDdTSDJsSTR5bWpjUk44NTNEZ1FwQnhrUGRkMmNiYmFLU0x5aUcwbldFMnhEWWljVTlNVFJsSXh1TWdaTDJPMGx6NlJURnVFTGh3d1JVcE92STh4MkVXMmQxS3h6T1FLdnJFaDJqYjZOZ2RaT004dE90TXo4NUxDcGw5dEc2SERCaFM5NndzcWphZktVNmNVckt5VFdZNERaSzZ1ajFkNmw0T2ZPdWtldktCSzcyMzZOMVFGbzVfLUNIRW9FUmhXOGVENms3VHJaMVlmVkhLYXhydFA2SUhYellVb3B5TzdqMkxsdFljMUd4Y1dSVGJ0alQwWlBkMmUxQ1QyIn0.fNknohtQNmyKxCytPzcWPFgmaX-SlVU9lTegdr20iNZ0cCTOT9UCqZLQusxZKl65QEhnwkqVAKnREcqDMxNTTw">
        <span>WhatsApp</span>
      </a>
      <a class="btn messenger-btn" target="_blank" rel="noreferrer" href="https://m.me/sita.camara.90">
        <span>Messenger</span>
      </a>
      <button class="btn primary" data-details data-id="${product.id}">Détails</button>
    </div>
  `;
  return card;
}

// Render products based on the filter
function renderProducts(filter = 'all') {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  products
    .filter(p => {
    if (filter === 'all')
      return true;
    if (filter === 'new')
      return !!p.isNew;
    if (filter === 'ordinateurs')
      return p.category === 'laptop' || p.category === 'pc';
    if (filter === 'printer')
      return p.category === 'printer' || p.category === 'scanner' || /scanneur|scanner/i.test(p.name || '');
    if (filter === 'chargers') {
      // Include chargers, rallonge, and cables categories
      return p.category === 'chargers' || p.category === 'rallonge' || p.category === 'cables';
    }
    if (filter === 'others') {
      // Anything not covered by existing pills: ordinateurs(laptop|pc), printer, ink, camera, cleaner, papeteries, chargers, rallonge, cables
      const covered = new Set(['laptop','pc','printer','ink','camera','cleaner','papeteries','chargers','rallonge','cables']);
      return !covered.has(p.category);
    }
    return p.category === filter;
  })
    .forEach(p => grid.appendChild(createProductCard(p)));
  wireDetails();
}


function activateFilters() {
  const pills = document.querySelectorAll('.pill');
  pills.forEach(p => p.addEventListener('click', () => {
    pills.forEach(el => el.classList.remove('active'));
    p.classList.add('active');
    const target = p.dataset.filter;
    renderProducts(target);
  }));

  // Mirror filters from the sidebar "Gammes proposées"
  const svc = document.getElementById('servicesFilters');
  if (svc) {
    svc.querySelectorAll('li[data-filter]').forEach(li => {
      const apply = () => {
        const target = li.getAttribute('data-filter') || 'all';
        // Sync top pills active state for visual consistency
        document.querySelectorAll('.pills .pill').forEach(el => el.classList.remove('active'));
        document.querySelector(`.pills .pill[data-filter="${target}"]`)?.classList.add('active');
        renderProducts(target);
        document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      li.addEventListener('click', apply);
      li.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          apply();
        }
      });
    });
  }
}


function renderTopSellers() {
  const ul = document.getElementById('topSellers');
  if (!ul)
    return;
  ul.innerHTML = '';
  const selectedIds = Array.isArray(TOP_SELLER_IDS) ? TOP_SELLER_IDS : [];
  const items = selectedIds.length
    ? selectedIds.map(id => products.find(p => p && p.id === id)).filter(Boolean)
    : products.slice(0, 8);
  items.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `<picture><source type="image/webp" srcset="${p.image}"><img src="${p.image}" alt="${p.name}"></picture><span>${p.name}</span>`;
    ul.appendChild(li);
  });
}

function wireDetails() {
  const grid = document.getElementById('productGrid');
  const modal = document.getElementById('productModal');
  const body = document.getElementById('modalBody');
  if (!grid || !modal || !body)
    return;
  grid.querySelectorAll('[data-details]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id || '';
      const product = products.find(p => p.id === id);
      if (!product)
        return;
      const specsHtml = Object.entries(product.specs || {}).map(([k, v]) => `<div class=\"spec-item\"><span>${k}</span><span>${v}</span></div>`).join('');
      const priceRange = `<a class=\"btn primary\" target=\"_blank\" rel=\"noreferrer\" href=\"https://api.whatsapp.com/send?phone=224666958301&text=Lien%C2%A0%3A%0Ahttps%3A%2F%2Ffb.me%2F3ASBAsGrl%0A%0ABonjour%C2%A0%21+Puis-je+en+savoir+plus+%C3%A0+ce+sujet%C2%A0%3F&source_url=https%3A%2F%2Ffb.me%2F3ASBAsGrl&icebreaker=Bonjour%C2%A0%21+Puis-je+en+savoir+plus+%C3%A0+ce+sujet%C2%A0%3F&app=facebook&entry_point=post_cta&jid=224666958301%40s.whatsapp.net&lid=48262581096511%40lid&show_ad_attribution=1&source=FB_Post&token=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyNSJ9.eyJleHAiOjE3NTk3NTYyOTksInBob25lIjoiMjI0NjY2OTU4MzAxIiwidGV4dCI6IkxpZW5cdTAwYTA6XG5odHRwczpcL1wvZmIubWVcLzNBU0JBc0dybFxuXG5Cb25qb3VyXHUwMGEwISBQdWlzLWplIGVuIHNhdm9pciBwbHVzIFx1MDBlMCBjZSBzdWpldFx1MDBhMD8iLCJzb3VyY2VfdXJsIjoiaHR0cHM6XC9cL2ZiLm1lXC8zQVNCQXNHcmwiLCJpY2VicmVha2VyIjoiQm9uam91clx1MDBhMCEgUHVpcy1qZSBlbiBzYXZvaXIgcGx1cyBcdTAwZTAgY2Ugc3VqZXRcdTAwYTA_IiwiYXBwIjoiZmFjZWJvb2siLCJlbnRyeV9wb2ludCI6InBvc3RfY3RhIiwiamlkIjoiMjI0NjY2OTU4MzAxXHUwMDQwcy53aGF0c2FwcC5uZXQiLCJsaWQiOiI0ODI2MjU4MTA5NjUxMVx1MDA0MGxpZCIsInNob3dfYWRfYXR0cmlidXRpb24iOjEsInNvdXJjZSI6IkZCX1Bvc3QiLCJzb3VyY2VfaWQiOiIxMjIwOTU0NDc3NjAyNTc3NjkiLCJjb250ZXh0IjoiQWZkRUZreVJqQWRPMWJvWTdua3pIRDRxVnRiWkVoLU9rNmJrSDZEWlFRQ1A5V3V1SmhGeFJldUg3bkxwSWQ0RTE0YU4xT0hlUW9yOHBLeGR4NUtKak1lVGZUU3VoQi1wLXJnRFIyV1dBX1hHelNwVGlJZ3RYUTFrZDdTSDJsSTR5bWpjUk44NTNEZ1FwQnhrUGRkMmNiYmFLU0x5aUcwbldFMnhEWWljVTlNVFJsSXh1TWdaTDJPMGx6NlJURnVFTGh3d1JVcE92STh4MkVXMmQxS3h6T1FLdnJFaDJqYjZOZ2RaT004dE90TXo4NUxDcGw5dEc2SERCaFM5NndzcWphZktVNmNVckt5VFdZNERaSzZ1ajFkNmw0T2ZPdWtldktCSzcyMzZOMVFGbzVfLUNIRW9FUmhXOGVENms3VHJaMVlmVkhLYXhydFA2SUhYellVb3B5TzdqMkxsdFljMUd4Y1dSVGJ0alQwWlBkMmUxQ1QyIn0.fNknohtQNmyKxCytPzcWPFgmaX-SlVU9lTegdr20iNZ0cCTOT9UCqZLQusxZKl65QEhnwkqVAKnREcqDMxNTTw">Prix: Contactez 666 958301</a>`;
      body.innerHTML = `
        <div>
          <picture>
            <source type=\"image/webp\" srcset=\"${product.image}\">
            <img style=\"width:100%;height:340px;object-fit:contain;border-radius:12px;background:transparent;filter:drop-shadow(0 10px 24px rgba(0,0,0,.18))\" src=\"${product.image}\" alt=\"${product.name}\"> 
          </picture>
        </div>

        <div>
          <h3 style=\"margin:0 0 8px 0\">${product.name}</h3>
          <div class=\"price-range\">${priceRange}</div>
          <div class=\"specs\" style=\"margin-top:10px\">${specsHtml || '<span class=\"muted\">Spécifications à venir…</span>'}</div>
        </div>`;
      modal.setAttribute('aria-hidden', 'false');
    });
  });
  modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true')));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape')
      modal.setAttribute('aria-hidden', 'true');
  });
}

function wireNewsletter() {
  const form = document.getElementById('newsletterForm');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    // Silently accept and confirm subscription without opening mail client
    // const email = document.getElementById('newsletterEmail').value; // kept if later needed
    alert('Merci ! Vous recevrez bientôt la newsletter.');
    form.reset();
  });
}

function wireSearch() {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  const footerForm = document.getElementById('footerSearchForm');
  const footerInput = document.getElementById('footerSearchInput');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const q = (input?.value || '').toLowerCase();
    applyProductSearch(q);
  });
  footerForm?.addEventListener('submit', e => {
    e.preventDefault();
    const q = (footerInput?.value || '').toLowerCase();
    applyProductSearch(q);
  });
}

function applyProductSearch(q){
  // Ensure products section is visible and rendered
  document.querySelectorAll('.pill').forEach(el => el.classList.remove('active'));
  document.querySelector('[data-filter="all"]')?.classList.add('active');
  renderProducts('all');
  const gridEl = document.getElementById('productGrid');
  const cards = Array.from(document.querySelectorAll('#productGrid .card'));
  cards.forEach(card => {
    const name = card.querySelector('h4')?.textContent?.toLowerCase() || '';
    card.style.display = name.includes(q) ? '' : 'none';
  });
  // Scroll into view after filtering
  document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // Focus grid for accessibility
  gridEl?.setAttribute('tabindex','-1');
  gridEl?.focus({ preventScroll: true });
}

function wireContact() {
  const form = document.getElementById('contactForm');
  const flash = document.getElementById('contactFlash');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const email = String(data.get('email') || '').trim();
    const subject = String(data.get('subject') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!name || !phone || !email || !subject || !message) {
      flash.textContent = 'Veuillez remplir tous les champs obligatoires.';
      flash.style.color = '#b91c1c';
      return;
    }
    // Accept the message and show confirmation without opening mail client
    flash.textContent = `Merci ${name}! Nous vous recontacterons très bientôt.`;
    flash.style.color = '#065f46';
    form.reset();
  });
}

function setYear() {
  const yearEl = document.getElementById('year');
  if (yearEl)
    yearEl.textContent = String(new Date().getFullYear());
}

function startHeroRotation() {
  const container = document.getElementById('heroRotator');
  if (!container)
    return;
  const img = container.querySelector('img');
  if (!img)
    return;
  // Lock hero size based on inc.webp natural dimensions for consistent switching
  const probe = new Image();
  probe.src = 'assets/inc.webp';
  probe.onload = () => {
    const w = probe.naturalWidth;
    const h = probe.naturalHeight;
    if (w && h) {
      // Set CSS variables to keep consistent size
      container.style.setProperty('--hero-w', w + 'px');
      container.style.setProperty('--hero-h', h + 'px');
    }
  };
  
  // Base images already present in the project
  const sources = [
    { webp: 'assets/laptop.webp', fallback: 'assets/laptop.webp', alt: 'Laptop' },
    { webp: 'assets/cctv.webp', fallback: 'assets/cctv.webp', alt: 'Caméra' },
    { webp: 'assets/printer.webp', fallback: 'assets/printer.webp', alt: 'Imprimante' },
    { webp: 'assets/inc.webp', fallback: 'assets/inc.webp', alt: 'Encres' },
    { webp: 'assets/converter.webp', fallback: 'assets/converter.webp', alt: 'Convertisseur' },
    { webp: 'assets/omen-laptop.webp', fallback: 'assets/omen-laptop.webp', alt: 'Laptop HP Omen' },
  ];
  // Additional images that will be added eventually. We preload and append only if they exist.
  const additionalCandidates = [
    { webp: 'assets/ethernet.webp', fallback: 'assets/ethernet.webp', alt: 'Câble Ethernet' },
    { webp: 'assets/router.webp', fallback: 'assets/router.webp', alt: 'Routeur' },
    { webp: 'assets/bag.webp', fallback: 'assets/bag.webp', alt: 'Sac d’ordinateur' },
    { webp: 'assets/charger.webp', fallback: 'assets/charger.webp', alt: 'Chargeur' },
    { webp: 'assets/mouse.webp', fallback: 'assets/mouse.webp', alt: 'Souris' },
    { webp: 'assets/dellAIO.webp', fallback: 'assets/dellAIO.webp', alt: 'Dell AIO' },
    { webp: 'assets/hp-m3303fdw.webp', fallback: 'assets/hp-m3303fdw.webp', alt: 'Imprimante HP M3303FDW' },
    { webp: 'assets/epson-l3252.webp', fallback: 'assets/epson-l3252.webp', alt: 'Imprimante Epson L3252' },
    { webp: 'assets/hp-charger2.webp', fallback: 'assets/hp-charger2.webp', alt: 'Chargeur HP' },
    { webp: 'assets/victus-laptop.webp', fallback: 'assets/victus-laptop.webp', alt: 'Laptop HP Victus' },
    { webp: 'assets/dell-charger2.webp', fallback: 'assets/dell-charger2.webp', alt: 'Chargeur Dell' },
    { webp: 'assets/lenovo-charger2.webp', fallback: 'assets/lenovo-charger2.webp', alt: 'Chargeur Lenovo' },
    { webp: 'assets/hp-mouse.webp', fallback: 'assets/hp-mouse.webp', alt: 'Souris HP' },
    { webp: 'assets/licence.webp', fallback: 'assets/licence.webp', alt: 'Licence' },

  ];

  additionalCandidates.forEach(candidate => {
    const testImg = new Image();
    testImg.onload = () => {
      // Only append if it successfully loads (exists and is accessible)
      sources.push(candidate);
    };
    testImg.onerror = () => {
      // Silently ignore missing assets until they are added later
    };
    testImg.src = candidate.webp;
  });
  let i = 0;
  setInterval(() => {
    if (sources.length === 0)
      return;
    i = (i + 1) % sources.length;
    const pic = container.querySelector('source');
    // Fade out, swap, fade in
    img.style.opacity = '0';
    setTimeout(() => {
      if (pic) {
        pic.srcset = sources[i].webp;
      }
      img.src = sources[i].fallback;
      img.alt = sources[i].alt;
      // After a short delay, fade back in
      setTimeout(() => { img.style.opacity = '1'; }, 50);
    }, 220);
  }, 3500);
}
function wireThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn)
    return;
  // Force light theme by default on mobile
  const saved = localStorage.getItem('theme');
  const isMobile = window.matchMedia && window.matchMedia('(max-width: 560px)').matches;
  if (isMobile) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else if (saved === 'dark') {
    document.documentElement.classList.add('dark');
  }
  btn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

function wireMobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const navbar = document.getElementById('navbar');
  
  if (!toggle || !navbar) return;
  
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navbar.classList.toggle('active');
  });
  
  // Close menu when clicking on a link
  navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navbar.classList.remove('active');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !toggle.contains(e.target)) {
      toggle.classList.remove('active');
      navbar.classList.remove('active');
    }
  });
}

function wireSidebarToggle() {
  const toggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  
  if (!toggle || !sidebar) return;
  
  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
  
  // Close sidebar when clicking outside
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
      sidebar.classList.remove('active');
    }
  });
  
  // Close sidebar when clicking on a link inside
  sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('active');
    });
  });
}
// quick request removed
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
  wireMobileMenu();
  wireSidebarToggle();
  // Make all "Nouveautés" links reactive (header + footer)
  document.querySelectorAll('a[href="#nouveaux"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const newPill = document.querySelector('[data-filter="new"]');
      if (newPill) {
        document.querySelectorAll('.pill').forEach(el => el.classList.remove('active'));
        newPill.classList.add('active');
        renderProducts('new');
      }
      document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});


