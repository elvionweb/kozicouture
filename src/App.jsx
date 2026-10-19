import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  MapPin, Phone, ArrowRight, ChevronLeft, ChevronRight, ChevronDown, X, Menu, Navigation, Send, Gem, Shirt, Scissors, Ruler,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import {
  CONFIG, SEO_TEXT, wa, waGeneral, waService, img, size,
  FILTERS, GALLERY, HERO, COLLECTIONS, STEPS, PILLARS, FAQ,
} from './data'

/* ───────── helpers ───────── */
// Custom smooth scroll: native smooth scroll is cancelled on mobile when the menu closes.
const NAV_OFFSET = 64
function smoothScrollTo(targetY, duration = 900) {
  const startY = window.scrollY
  const dist = targetY - startY
  if (Math.abs(dist) < 2) return
  const t0 = performance.now()
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
  const step = (now) => {
    const p = Math.min((now - t0) / duration, 1)
    window.scrollTo({ top: startY + dist * ease(p), behavior: 'instant' })
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
function goTo(e, hash, after) {
  e.preventDefault()
  if (after) after()
  const el = hash === '#top' ? null : document.querySelector(hash)
  smoothScrollTo(el ? el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET : 0)
  try { history.replaceState(null, '', hash) } catch { /* ignore */ }
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.85, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] } }),
}
const fadeIn = { hidden: { opacity: 0 }, show: (i = 0) => ({ opacity: 1, transition: { duration: 1, delay: i * 0.09 } }) }
const VP = { once: true, amount: 0.15 }

function Reveal({ children, i = 0, className = '', as = 'div', variants = fadeUp }) {
  const Tag = motion[as]
  return <Tag className={className} variants={variants} custom={i} initial="hidden" whileInView="show" viewport={VP}>{children}</Tag>
}
function Eyebrow({ children }) {
  return <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.34em] text-gold-400"><span className="h-px w-8 bg-gold-400/70" />{children}</p>
}
function Title({ children, className = '' }) {
  return <h2 className={`font-serif text-[2.5rem] font-medium leading-[1.04] text-ivory-50 sm:text-5xl lg:text-6xl ${className}`}>{children}</h2>
}
function Btn({ href, children, variant = 'gold', className = '', ...rest }) {
  const styles = {
    gold: 'bg-gold-500 text-night-900 hover:bg-gold-400',
    ghost: 'border border-ivory-100/30 text-ivory-50 hover:border-gold-400 hover:text-gold-300',
  }
  const cls = `group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[13px] font-medium uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5 ${styles[variant]} ${className}`
  return href ? <a href={href} className={cls} {...rest}>{children}</a> : <button className={cls} {...rest}>{children}</button>
}
function Logo() {
  return (
    <span className="flex items-center gap-3">
      <img src="/images/nav-mark.webp" alt="" width="40" height="40" className="h-10 w-10 rounded-full object-cover ring-1 ring-gold-500/50" />
      <span className="leading-none">
        <span className="block font-serif text-xl font-semibold uppercase tracking-[0.24em] text-ivory-50">Kozi</span>
        <span className="mt-0.5 block text-[9px] font-medium uppercase tracking-[0.5em] text-gold-400">Couture</span>
      </span>
    </span>
  )
}
function useVW() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => { const f = () => setW(window.innerWidth); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f) }, [])
  return w
}

/* ───────── nav ───────── */
const LINKS = [['About', '#about'], ['Collections', '#collections'], ['Lookbook', '#lookbook'], ['Process', '#process'], ['FAQ', '#faq'], ['Contact', '#contact']]

function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 30)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  const close = () => setOpen(false)
  return (
    <header className={`fixed inset-x-0 top-0 z-50 h-16 transition-colors duration-500 ${solid || open ? 'border-b border-gold-500/20 bg-night-950/90 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" onClick={(e) => goTo(e, '#top', close)} aria-label="Kozi Couture — home"><Logo /></a>
        <nav className="hidden items-center gap-8 xl:flex" aria-label="Main">
          {LINKS.map(([l, h]) => (
            <a key={h} href={h} onClick={(e) => goTo(e, h)} className="relative text-[12px] font-medium uppercase tracking-[0.22em] text-ivory-100/80 transition-colors hover:text-gold-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold-400 after:transition-all hover:after:w-full">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={waGeneral} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.16em] text-night-900 transition hover:bg-gold-400 sm:inline-flex"> Order now</a>
          <button onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} className="grid h-10 w-10 place-items-center rounded-full border border-ivory-100/25 text-ivory-50 xl:hidden">{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav aria-label="Mobile" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
            className="absolute inset-x-0 top-16 max-h-[calc(100svh-4rem)] overflow-y-auto border-b border-gold-500/20 bg-night-950 px-4 pb-6 pt-2 shadow-2xl xl:hidden">
            {LINKS.map(([l, h]) => (
              <a key={h} href={h} onClick={(e) => goTo(e, h, close)} className="flex items-center justify-between border-b border-ivory-100/10 py-4 font-serif text-2xl text-ivory-50">{l} <ArrowRight size={18} className="text-gold-400" /></a>
            ))}
            <a href={waGeneral} target="_blank" rel="noreferrer" onClick={close} className="mt-5 flex items-center justify-center gap-2 rounded-full bg-gold-500 py-3.5 text-[13px] font-medium uppercase tracking-[0.16em] text-night-900"> Order Now</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ───────── hero ───────── */
function Coverflow() {
  const vw = useVW()
  const cw = vw < 640 ? 210 : vw < 1024 ? 260 : 300
  const ch = Math.round(cw * 1.4)
  const step = cw * 0.66
  const n = HERO.length
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => { if (paused) return; const t = setInterval(() => setI((v) => (v + 1) % n), 4200); return () => clearInterval(t) }, [paused, n])
  const go = (d) => setI((v) => (v + d + n) % n)
  const off = (k) => { let o = (((k - i) % n) + n) % n; if (o > n / 2) o -= n; return o }
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <motion.div drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.12} onDragStart={() => setPaused(true)}
        onDragEnd={(_, { offset, velocity }) => { if (offset.x < -50 || velocity.x < -400) go(1); else if (offset.x > 50 || velocity.x > 400) go(-1); setPaused(false) }}
        className="relative mx-auto w-full cursor-grab touch-pan-y active:cursor-grabbing" style={{ height: ch + 8 }}>
        {HERO.map((s, k) => {
          const o = off(k); const a = Math.abs(o)
          return (
            <motion.button key={s.k} onClick={() => setI(k)} aria-label={`Show ${s.label}`} tabIndex={a > 2 ? -1 : 0} initial={false}
              animate={{ x: o * step, scale: 1 - a * 0.12, opacity: a > 2 ? 0 : 1 - a * 0.22 }} transition={{ type: 'spring', stiffness: 130, damping: 20 }}
              style={{ width: cw, height: ch, left: '50%', marginLeft: -cw / 2, zIndex: 10 - a, pointerEvents: a > 2 ? 'none' : 'auto' }}
              className="absolute top-0 overflow-hidden rounded-[1.25rem] bg-night-800 shadow-2xl shadow-black/60 ring-1 ring-gold-500/30">
              <img src={img(s.k)} alt={`${s.label} by Kozi Couture, Benin City`} draggable={false} {...size(s.k)} loading={a === 0 ? 'eager' : 'lazy'} className="pointer-events-none h-full w-full select-none object-cover" style={{ objectPosition: s.pos }} />
              <span className={`absolute inset-0 bg-night-950 transition-opacity duration-500 ${o === 0 ? 'opacity-0' : 'opacity-45'}`} />
              <span className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-night-950/90 to-transparent p-4 pt-14 text-left transition-opacity duration-500 ${o === 0 ? 'opacity-100' : 'opacity-0'}`}>
                <span className="font-serif text-2xl text-ivory-50">{s.label}</span>
              </span>
            </motion.button>
          )
        })}
      </motion.div>
      <div className="mt-8 flex items-center justify-center gap-5">
        <button onClick={() => go(-1)} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full border border-ivory-100/25 text-ivory-50 transition hover:border-gold-400 hover:text-gold-300"><ChevronLeft size={18} /></button>
        <div className="flex gap-2">{HERO.map((_, k) => <button key={k} onClick={() => setI(k)} aria-label={`Slide ${k + 1}`} className={`h-1.5 rounded-full transition-all duration-500 ${i === k ? 'w-8 bg-gold-400' : 'w-2 bg-ivory-100/30'}`} />)}</div>
        <button onClick={() => go(1)} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full border border-ivory-100/25 text-ivory-50 transition hover:border-gold-400 hover:text-gold-300"><ChevronRight size={18} /></button>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-night-900 pb-20 pt-28 sm:pt-32 lg:pb-24">
      <div className="pointer-events-none absolute left-1/2 top-24 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-gold-500/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1>
            <Reveal as="span" i={0} className="mb-6 block">
              <span className="hidden md:block inline-flex items-center gap-2 rounded-full border border-gold-500/35 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.26em] text-gold-300"><MapPin size={13} /> Kozi Couture · Benin City</span>
            </Reveal>
            <Reveal as="span" i={1} className="block font-serif text-[3rem] font-medium leading-[1.02] text-ivory-50 sm:text-6xl lg:text-7xl">
              Bold. Elegant. <em className="gold-text font-normal italic">Perfectly tailored.</em>
            </Reveal>
          </h1>
          <Reveal i={2}><p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ivory-100/75 sm:text-lg">Premium men’s fashion for the modern gentleman — bespoke suits, traditional wear, senator styles and wedding attire.</p></Reveal>
          <Reveal i={3} className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
            
            <div className='flex justify-center'>
              <Btn href="#lookbook" variant="ghost" onClick={(e) => goTo(e, '#lookbook')} className='bg-yellow-600 text-black'>View lookbook <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Btn>
            </div>
          </Reveal>
        </div>
        <Reveal variants={fadeIn} i={3} className="mt-12 overflow-hidden"><Coverflow /></Reveal>
      </div>
    </section>
  )
}

function Marquee() {
  const items = ['Bespoke suits', 'Traditional wear', 'Senator styles', 'Wedding attire', 'Corporate wear', 'Wear class. Wear confidence.']
  const row = [...items, ...items, ...items]
  return (
    <div className="overflow-hidden border-y border-gold-500/30 bg-night-950 py-4" aria-hidden="true">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[...row, ...row].map((t, k) => <span key={k} className="flex items-center font-serif text-2xl italic text-gold-300 sm:text-3xl">{t}<Scissors size={16} className="mx-7 shrink-0 text-gold-500" /></span>)}
      </div>
    </div>
  )
}

/* ───────── about ───────── */
function Word({ w, p, a, b }) {
  const o = useTransform(p, [a, b], [0.2, 1])
  return <><motion.span style={{ opacity: o }} className="inline-block">{w}</motion.span>{' '}</>
}
function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const words = SEO_TEXT.split(' ')
  return (
    <section id="about" className="bg-night-900 px-4 py-16 md:py-20 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal><Eyebrow>About Kozi Couture</Eyebrow></Reveal>
        <Reveal i={1}><p className="mx-auto mb-4 md:mb-8 max-w-md border-y border-gold-500/30 py-3 text-[12px] font-medium uppercase tracking-[0.4em] text-gold-300">{CONFIG.TAGLINE}</p></Reveal>
        <p ref={ref} className="font-serif text-[1.65rem] leading-[1.35] text-ivory-50 sm:text-3xl lg:text-[2.15rem]">
          {words.map((w, k) => <Word key={k} w={w} p={scrollYProgress} a={k / words.length} b={(k + 1) / words.length} />)}
        </p>
        <Reveal i={2} className="mt-10"><Btn href={waGeneral} target="_blank" rel="noreferrer" variant="ghost"><FaWhatsapp size={16} /> Chat with us</Btn></Reveal>
      </div>
    </section>
  )
}

/* ───────── collections ───────── */
function ParallaxImg({ src, alt, pos, dims, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-26, 26])
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} loading="lazy" {...dims} style={{ y, objectPosition: pos }} className="absolute left-0 top-[-8%] h-[116%] w-full object-cover" />
    </div>
  )
}
function Collections() {
  return (
    <section id="collections" className="bg-night-800 px-4 py-16 md:py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 items-end gap-6 lg:grid-cols-2">
          <div><Reveal><Eyebrow>Collections</Eyebrow></Reveal><Reveal i={1}><Title>Made for every <em className="gold-text font-normal italic">occasion.</em></Title></Reveal></div>
          <Reveal i={2}><p className="max-w-md text-base leading-relaxed text-ivory-100/70 lg:ml-auto">Weddings, corporate events, special occasions or everyday luxury choose a collection and order on WhatsApp.</p></Reveal>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {COLLECTIONS.map((c, k) => (
            <Reveal key={c.id} i={k % 2} as="article" className="group relative min-w-0 overflow-hidden rounded-3xl bg-night-700 ring-1 ring-gold-500/20">
              <ParallaxImg src={img(c.k)} alt={`${c.name} by Kozi Couture`} pos={c.pos} dims={size(c.k)} className="aspect-[3/4.4]" />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="font-serif text-lg text-gold-300">0{k + 1}</p>
                <h3 className="mt-1 font-serif text-3xl text-ivory-50">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory-100/75">{c.line}</p>
                <a href={waService(c.name)} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold-500 px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-night-900 transition hover:bg-gold-400"><FaWhatsapp size={14} /> Enquire</a>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, k) => {
            const Icon = [Gem, Shirt, Scissors, Ruler][k]
            return (
              <Reveal key={p.t} i={k} className="min-w-0 rounded-3xl border border-gold-500/20 bg-night-900 p-6">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-gold-500/40 text-gold-400"><Icon size={21} /></span>
                <h3 className="mt-5 font-serif text-2xl text-ivory-50">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory-100/65">{p.d}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ───────── lookbook ───────── */
function Lightbox({ list, index, setIndex, onClose }) {
  const item = list[index]
  const next = useCallback((d) => setIndex((index + d + list.length) % list.length), [index, list.length, setIndex])
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') next(1); if (e.key === 'ArrowLeft') next(-1) }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [next, onClose])
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[100] flex flex-col bg-night-950/95 backdrop-blur-sm" onClick={onClose}>
      <div className="flex items-center justify-between px-4 py-4 sm:px-8" onClick={(e) => e.stopPropagation()}>
        <p className="text-[12px] font-medium uppercase tracking-[0.24em] text-gold-300">{item.cat} · {index + 1}/{list.length}</p>
        <button onClick={onClose} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full border border-ivory-100/25 text-ivory-50"><X size={18} /></button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => next(-1)} aria-label="Previous" className="absolute left-2 z-10 grid h-11 w-11 place-items-center rounded-full bg-night-800/80 text-ivory-50 sm:left-8"><ChevronLeft size={20} /></button>
        <AnimatePresence mode="wait">
          <motion.img key={item.k} src={img(item.k)} alt={item.alt} {...size(item.k)} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.3} onDragEnd={(_, { offset }) => { if (offset.x < -60) next(1); else if (offset.x > 60) next(-1) }}
            className="max-h-full max-w-full rounded-2xl object-contain" />
        </AnimatePresence>
        <button onClick={() => next(1)} aria-label="Next" className="absolute right-2 z-10 grid h-11 w-11 place-items-center rounded-full bg-night-800/80 text-ivory-50 sm:right-8"><ChevronRight size={20} /></button>
      </div>
      <div className="flex justify-center px-4 py-5" onClick={(e) => e.stopPropagation()}>
        <Btn href={wa(`Hello Kozi Couture, I saw this outfit on your website (${item.alt}) and I'd like something similar.`)} target="_blank" rel="noreferrer"><FaWhatsapp size={16} /> I want this style</Btn>
      </div>
    </motion.div>
  )
}

function Lookbook() {
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(null)
  const list = filter === 'All' ? GALLERY : GALLERY.filter((g) => g.cat === filter)
  const close = useCallback(() => setOpen(null), [])
  return (
    <section id="lookbook" className="bg-night-900 px-4 py-16 md:py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div><Reveal><Eyebrow>Lookbook</Eyebrow></Reveal><Reveal i={1}><Title>Outfits we’ve <em className="gold-text font-normal italic">made.</em></Title></Reveal></div>
          <Reveal i={2} className="no-scrollbar -mx-4 min-w-0 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div className="flex w-max gap-2" role="tablist" aria-label="Filter outfits">
              {FILTERS.map((f) => (
                <button key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)} className={`rounded-full border px-4 py-2 text-[12px] font-medium uppercase tracking-[0.16em] transition ${filter === f ? 'border-gold-500 bg-gold-500 text-night-900' : 'border-ivory-100/20 text-ivory-100/75 hover:border-gold-400'}`}>{f}</button>
              ))}
            </div>
          </Reveal>
        </div>
        <div key={filter} className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
          {list.map((g, k) => (
            <motion.button key={g.k} onClick={() => setOpen(k)} aria-label={`Open photo: ${g.alt}`} variants={fadeUp} custom={(k % 4) * 0.6} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
              className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-night-800 text-left ring-1 ring-gold-500/15 sm:mb-4">
              <img src={img(g.k)} alt={g.alt} loading="lazy" {...size(g.k)} className="h-auto w-full transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-night-950/80 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-md:opacity-100">
                <span className="rounded-full bg-night-950/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-gold-300 backdrop-blur">{g.cat}</span>
              </span>
            </motion.button>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <p className="mb-5 text-sm text-ivory-100/60">Have a style in mind? Send us a photo and we’ll make it for you.</p>
          <Btn href={wa('Hello Kozi Couture, I have a style in mind. Here is a reference photo.')} target="_blank" rel="noreferrer" variant="ghost"><FaWhatsapp size={15} /> Send a reference</Btn>
        </Reveal>
      </div>
      <AnimatePresence>{open !== null && <Lightbox list={list} index={open} setIndex={setOpen} onClose={close} />}</AnimatePresence>
    </section>
  )
}

/* ───────── process ───────── */
function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-night-800 px-4 py-16 md:py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="pointer-events-none absolute -right-40 top-0 h-[28rem] w-[28rem] rounded-full bg-gold-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-5xl">
        <Reveal><Eyebrow>How it works</Eyebrow></Reveal>
        <Reveal i={1}><Title>From message to <em className="gold-text font-normal italic">fitting.</em></Title></Reveal>
        <ol className="mt-8 md:mt-12 grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-3">
          {STEPS.map((s, k) => (
            <Reveal as="li" key={s.n} i={k} className="min-w-0 border-t border-gold-500/30 pt-6">
              <span className="font-serif text-5xl italic text-gold-400">{s.n}</span>
              <h3 className="mt-3 font-serif text-2xl text-ivory-50">{s.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ivory-100/70">{s.d}</p>
            </Reveal>
          ))}
        </ol>
        {/* <Reveal i={3} className="mt-12"><Btn href={waGeneral} target="_blank" rel="noreferrer"><FaWhatsapp size={17} /> Start on WhatsApp</Btn></Reveal> */}
      </div>
    </section>
  )
}

/* ───────── faq ───────── */
function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="bg-night-900 px-4 py-16 md:py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 md:mb-8 text-center"><Reveal><Eyebrow>Good to know</Eyebrow></Reveal><Reveal i={1}><Title>Frequently asked <em className="gold-text font-normal italic">questions.</em></Title></Reveal></div>
        <Reveal i={2}>
          {FAQ.map((f, k) => {
            const on = open === k
            return (
              <div key={f.q} className="border-b border-gold-500/25">
                <h3><button onClick={() => setOpen(on ? -1 : k)} aria-expanded={on} className="flex w-full items-center justify-between gap-4 py-4 text-left font-serif text-xl text-ivory-50 sm:text-2xl"><span className="min-w-0">{f.q}</span><ChevronDown size={20} className={`shrink-0 text-gold-400 transition-transform duration-300 ${on ? 'rotate-180' : ''}`} /></button></h3>
                <AnimatePresence initial={false}>
                  {on && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden"><p className="pb-5 text-[15px] leading-relaxed text-ivory-100/70 sm:text-base">{f.a}</p></motion.div>}
                </AnimatePresence>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

function Dropdown({ value, onChange, options, label }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('pointerdown', onDoc); document.removeEventListener('keydown', onKey) }
  }, [])

  return (
    <div ref={ref} className="relative w-full min-w-0">
      <button
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full min-w-0 items-center justify-between gap-3 rounded-xl border bg-night-900 px-4 py-3 text-left text-[15px] text-ivory-50 outline-none transition ${open ? 'border-gold-400' : 'border-gold-500/25'}`}
      >
        <span className="min-w-0 truncate">{value}</span>
        <ChevronDown size={18} className={`shrink-0 text-gold-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 top-full z-30 mt-2 max-h-60 overflow-y-auto overscroll-contain rounded-xl border border-gold-500/30 bg-night-950 py-1 shadow-2xl shadow-black/60"
          >
            {options.map((o) => (
              <li key={o} role="option" aria-selected={o === value}>
                <button
                  type="button"
                  onClick={() => { onChange(o); setOpen(false) }}
                  className={`block w-full break-words px-4 py-3 text-left text-[15px] transition hover:bg-gold-500/10 hover:text-gold-300 ${o === value ? 'bg-gold-500/10 text-gold-300' : 'text-ivory-100/85'}`}
                >
                  {o}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ───────── contact ───────── */
function ContactForm() {
  const [name, setName] = useState('')
  const opts = [...COLLECTIONS.map((c) => c.name), 'Corporate wear', 'Something else']
  const [item, setItem] = useState(opts[0])
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')
  const submit = (e) => { e.preventDefault(); window.open(wa(`Hello Kozi Couture! ${name ? `I'm ${name}. ` : ''}I'd like to order: ${item}.${date ? ` Needed by: ${date}.` : ''}${note ? ` ${note}` : ''}`), '_blank', 'noopener') }
  const f = 'w-full min-w-0 rounded-xl border border-gold-500/25 bg-night-900 px-4 py-3 text-[15px] text-ivory-50 outline-none transition placeholder:text-ivory-100/40 focus:border-gold-400'
  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-3">
      <input className={f} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} aria-label="Your name" />
            <Dropdown value={item} onChange={setItem} options={opts} label="Outfit type" />
      <input className={f} placeholder="Date needed (optional)" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Date needed" />
      <textarea className={`${f} min-h-[88px] resize-none`} placeholder="Tell us about the outfit (optional)" value={note} onChange={(e) => setNote(e.target.value)} aria-label="Message" />
      <div className='flex justify-center'>
        <Btn type="submit" className="w-36"><Send size={15} /> Send</Btn>
      </div>
    </form>
  )
}
function InfoRow({ icon, label, children, href, ext }) {
  const inner = (<><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold-500/40 text-gold-400">{icon}</span><span className="min-w-0"><span className="block text-[10px] font-medium uppercase tracking-[0.24em] text-gold-400">{label}</span><span className="block break-words text-[15px] leading-snug text-ivory-50">{children}</span></span></>)
  const cls = 'flex min-w-0 items-center gap-4 rounded-2xl border border-gold-500/20 bg-night-800 p-4 transition hover:border-gold-400'
  return href ? <a href={href} {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})} className={cls}>{inner}</a> : <div className={cls}>{inner}</div>
}
function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(CONFIG.MAP_QUERY)}&output=embed`
  const dir = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CONFIG.MAP_QUERY)}`
  return (
    <section id="contact" className="bg-night-950 px-4 py-16 md:py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <Reveal><Eyebrow>Contact</Eyebrow></Reveal>
          <Reveal i={1}><Title>Let’s make your <em className="gold-text font-normal italic">next outfit.</em></Title></Reveal>
          <Reveal i={2}><p className="mt-5 text-base leading-relaxed text-ivory-100/70">Visit us in Uselu, Benin City, or message us on WhatsApp to order.</p></Reveal>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
          <div className="min-w-0 space-y-3">
            <Reveal><InfoRow icon={<FaWhatsapp size={20} />} label="WhatsApp" href={waGeneral} ext>{CONFIG.PHONE_DISPLAY}</InfoRow></Reveal>
            <Reveal i={1}><InfoRow icon={<Phone size={18} />} label="Call" href={`tel:${CONFIG.PHONE_TEL}`}>{CONFIG.PHONE_DISPLAY}</InfoRow></Reveal>
            <Reveal i={2}><InfoRow icon={<MapPin size={18} />} label="Visit us" href={dir} ext><address className="not-italic">{CONFIG.ADDRESS_LINES.map((l) => <span key={l} className="block">{l}</span>)}</address></InfoRow></Reveal>
            <Reveal i={3}><div className="rounded-3xl border border-gold-500/20 bg-night-800 p-5 sm:p-6"><p className="mb-4 font-serif text-2xl text-ivory-50">Quick order message</p><ContactForm /></div></Reveal>
          </div>
          <Reveal i={1} className="min-w-0">
            <div className="flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-gold-500/25 bg-night-800">
              <iframe title="Kozi Couture location, Uselu, Benin City" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="h-[340px] w-full flex-1 border-0 sm:h-[440px] lg:min-h-[560px]" />
              <div className="flex flex-col items-stretch justify-between gap-3 border-t border-gold-500/20 p-4 sm:flex-row sm:items-center sm:p-5">
                <p className="min-w-0 text-sm text-ivory-100/80">8, Osarbo Street, Off Igbinosa Street, Mela Motel Road, Uselu.</p>
                <div className='flex justify-center'>
                  <Btn href={dir} target="_blank" rel="noreferrer" variant="ghost" className="shrink-0 !py-2.5"><Navigation size={14} /> Directions</Btn>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-gold-500/20 bg-night-950 px-4 pb-8 md:pb-10 pt-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 border-b border-ivory-100/10 pb-6 md:pb-8 md:grid-cols-[1.2fr_1fr_1fr]">
          <div><Logo /><p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory-100/60">Premium men’s fashion in Benin City. Bespoke suits, traditional wear, senator styles and wedding attire.</p></div>
          <nav aria-label="Footer" className="flex flex-wrap content-start gap-x-7 gap-y-3">{LINKS.map(([l, h]) => <a key={h} href={h} onClick={(e) => goTo(e, h)} className="text-[12px] font-medium uppercase tracking-[0.2em] text-ivory-100/70 transition hover:text-gold-300">{l}</a>)}</nav>
          <address className="text-sm not-italic leading-relaxed text-ivory-100/70">{CONFIG.ADDRESS_LINES.map((l) => <span key={l} className="block">{l}</span>)}<a href={`tel:${CONFIG.PHONE_TEL}`} className="mt-3 block text-gold-300">{CONFIG.PHONE_DISPLAY}</a></address>
        </div>


        {/* Builder Credit */}
        <p className="mt-2 text-xs sm:text-sm opacity-80 flex items-center justify-center gap-2">
          <img
              src="/logos.jpg"
              alt="Elvionweb Logo"
              className="w-8 h-8 object-contain"
          />
          Built by{" "}
          <a
            href="https://www.elvionweb.com"
        target="_blank"
          rel="noopener noreferrer"
        className="font-semibold underline underline-offset-4 hover:opacity-100 transition-opacity"
          >
          Elvionweb
          </a>
          </p>
        <p className="pt-6 text-center text-xs text-ivory-100/45">© {new Date().getFullYear()} Kozi Couture · {CONFIG.TAGLINE}</p>
      </div>
    </footer>
  )
}
function WhatsAppFab() {
  return (
    <a href={waGeneral} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
      <span className="absolute inset-0 animate-pulseRing rounded-full bg-[#25D366]" />
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105"><FaWhatsapp size={28} /></span>
    </a>
  )
}
function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gold-500" />
}

export default function App() {
  return (
    <>
      <ProgressBar />
      <Nav />
      <main>
        <Hero /><Marquee /><About /><Collections /><Lookbook /><Process /><Faq /><Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
