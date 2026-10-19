import dims from './dims.json'

// ───────── EDIT THESE ─────────
export const CONFIG = {
  NAME: 'Kozi Couture',
  WHATSAPP: '2349159064242',          // wa.me format: country code + number, no + or spaces
  PHONE_DISPLAY: '+234 915 906 4242',
  PHONE_TEL: '+2349159064242',
  ADDRESS_LINES: ['8, Osarbo Street, Off Igbinosa Street,', 'Mela Motel Road, Uselu,', 'Benin City, Edo State, Nigeria'],
  ADDRESS_ONE_LINE: '8, Osarbo Street, Off Igbinosa Street, Mela Motel Road, Uselu, Benin City, Edo State, Nigeria',
  MAP_QUERY: '8 Osarbo Street, Off Igbinosa Street, Mela Motel Road, Uselu, Benin City, Nigeria',
  TAGLINE: 'Wear Class. Wear Confidence.',
}

export const SEO_TEXT =
  'Kozi Couture is a premium men’s fashion brand creating bold, elegant, and perfectly tailored outfits for the modern gentleman. We specialize in bespoke suits, traditional wear, senator styles, wedding attire. Whether for weddings, corporate events, special occasions, or everyday luxury.'

export const wa = (t) => `https://wa.me/${CONFIG.WHATSAPP}?text=${encodeURIComponent(t)}`
export const waGeneral = wa("Hello Kozi Couture, I'd like to order an outfit.")
export const waService = (n) => wa(`Hello Kozi Couture, I'd like to enquire about ${n}.`)
export const img = (k) => `/images/${k}.webp`
export const size = (k) => ({ width: dims[k][0], height: dims[k][1] })

export const HERO = [
  { k: 'wine-stripe-set', label: 'Senator styles', pos: '50% 30%' },
  { k: 'grey-agbada', label: 'Traditional wear', pos: '50% 30%' },
  { k: 'gold-print-shirt', label: 'Statement shirts', pos: '50% 35%' },
  { k: 'white-stripe-set', label: 'Wedding & event wear', pos: '50% 30%' },
  { k: 'black-kaftan-pocket', label: 'Bespoke tailoring', pos: '50% 35%' },
  { k: 'blue-senator', label: 'Everyday luxury', pos: '50% 35%' },
]

export const FILTERS = ['All', 'Senator & Kaftan', 'Traditional', 'Shirts', 'Details']
export const GALLERY = [
  { k: 'wine-stripe-set', cat: 'Senator & Kaftan', alt: 'Wine striped senator outfit with matching cap' },
  { k: 'grey-agbada', cat: 'Traditional', alt: 'Grey agbada with blue embroidered chest panel and cap' },
  { k: 'black-kaftan-pocket', cat: 'Senator & Kaftan', alt: 'Black kaftan with embroidered pocket' },
  { k: 'gold-print-shirt', cat: 'Shirts', alt: 'Gold and blue printed shirt with tailored black trousers' },
  { k: 'white-embroidered', cat: 'Details', alt: 'White outfit with gold cross-stitch embroidery on pocket and placket' },
  { k: 'navy-set-door', cat: 'Senator & Kaftan', alt: 'Black senator set with minimal seams' },
  { k: 'ikat-shirt-black', cat: 'Shirts', alt: 'Black shirt with orange and gold brush print' },
  { k: 'white-stripe-set', cat: 'Traditional', alt: 'White pinstripe native set with cap' },
  { k: 'embroidery-flatlay', cat: 'Details', alt: 'Black outfits with white geometric embroidery details' },
  { k: 'blue-senator', cat: 'Senator & Kaftan', alt: 'Royal blue senator set with embroidered pocket' },
  { k: 'art-shirt-black', cat: 'Shirts', alt: 'Black shirt with painted art panel' },
  { k: 'black-set-brick', cat: 'Senator & Kaftan', alt: 'Black senator kaftan with embroidered pocket crest' },
  { k: 'white-mannequin', cat: 'Details', alt: 'White senator top with pleated pockets on a mannequin' },
  { k: 'green-print-shirt', cat: 'Shirts', alt: 'Green and orange printed shirt' },
  { k: 'two-gentlemen', cat: 'Shirts', alt: 'Two gentlemen in tailored shirts and trousers' },
]

export const COLLECTIONS = [
  { id: 'senator', name: 'Senator styles', k: 'wine-stripe-set', pos: '50% 25%', line: 'Clean, sharp senator and kaftan sets in rich fabrics, cut to sit properly on your frame.' },
  { id: 'traditional', name: 'Traditional wear', k: 'grey-agbada', pos: '50% 30%', line: 'Agbada, native sets and caps with embroidery that honours tradition and still looks modern.' },
  { id: 'wedding', name: 'Wedding attire', k: 'white-stripe-set', pos: '50% 30%', line: 'Outfits for the groom, groomsmen and guests — planned early and fitted to perfection.' },
  { id: 'bespoke', name: 'Bespoke suits', k: 'blue-senator', pos: '50% 35%', line: 'Made-to-measure pieces for corporate days, special occasions and everyday luxury.' },
]

export const STEPS = [
  { n: '01', t: 'Message us on WhatsApp', d: 'Tell us the outfit, the occasion and the date. Send a reference photo if you have one.' },
  { n: '02', t: 'Choose fabric & get measured', d: 'We agree the style, fabric and details, then take your measurements for a made-to-fit cut.' },
  { n: '03', t: 'Fitting & collection', d: 'Try it on, we adjust where needed, and you step out looking the part.' },
]

export const PILLARS = [
  { t: 'Premium quality', d: 'Quality fabrics and clean finishing on every piece.' },
  { t: 'Timeless style', d: 'Bold and elegant cuts that stay sharp season after season.' },
  { t: 'Expert craftsmanship', d: 'Careful embroidery, pockets and details done by hand.' },
  { t: 'Perfect fit', d: 'Made to your measurements, so it fits the way it should.' },
]

export const FAQ = [
  { q: 'What does Kozi Couture make?', a: 'Kozi Couture creates bespoke suits, traditional wear, senator styles and wedding attire for men — for weddings, corporate events, special occasions and everyday luxury.' },
  { q: 'Where is Kozi Couture located?', a: `${CONFIG.ADDRESS_ONE_LINE}.` },
  { q: 'How do I place an order?', a: `Message us on WhatsApp at ${CONFIG.PHONE_DISPLAY} with the outfit you want, the occasion and your date. We will guide you from there.` },
  { q: 'Can you make outfits for a wedding party?', a: 'Yes. Wedding attire is one of our specialities. Message us early with the date and the number of outfits so we can plan the fabric and fittings.' },
  { q: 'Can I bring my own style or reference?', a: 'Yes. Send a photo of the style you like on WhatsApp and we will advise on how to make it for you.' },
]
