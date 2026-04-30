import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'
// AUTH: CRAM VED
const WA = 'https://wa.me/233530645509'
const U  = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

/* ── LOGO ───────────────────────────────────────────────────── */
function Logo({ light = true }) {
  const c  = light ? '#ffffff' : '#C84B11'
  const cs = light ? 'rgba(255,255,255,.65)' : 'rgba(200,75,17,.6)'
  return (
    <svg width="164" height="48" viewBox="0 0 164 48" fill="none" aria-label="Eudoxie Escapes">
      <path d="M104 40 Q132 13 152 8" stroke={c} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <g transform="translate(147,4) rotate(38)">
        <path d="M0 0 L7 3.5 L0 7 L2 3.5 Z" fill={c}/>
        <path d="M2 1.8 L-2.5 0 L-2.5 1.8 Z" fill={c} opacity=".55"/>
        <path d="M2 5.2 L-2.5 7 L-2.5 5.2 Z" fill={c} opacity=".55"/>
      </g>
      <text x="2" y="32" fontFamily="'Dancing Script',cursive" fontSize="30" fontWeight="700" fill={c}>Eudoxie</text>
      <text x="4" y="46" fontFamily="'Montserrat',sans-serif" fontSize="8" fontWeight="700" letterSpacing="4.5" fill={cs}>ESCAPES</text>
    </svg>
  )
}

/* ── WHATSAPP ICON ──────────────────────────────────────────── */
const IcoWA = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
)

/* ── NAVBAR ─────────────────────────────────────────────────── */
function Navbar({ page, go }) {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  useEffect(() => setOpen(false), [page])

  const links = [
    { id: 'accueil',  label: 'Accueil' },
    { id: 'services', label: 'Nos Services' },
    { id: 'apropos',  label: 'À Propos' },
    { id: 'contact',  label: 'Réservation' },
  ]

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav--scrolled' : 'nav--top'}`}>
        <button className="nav__logo-btn" onClick={() => go('accueil')}>
          <Logo light={!scrolled} />
        </button>
        <div className="nav__links">
          {links.map(l => (
            <button
              key={l.id}
              className={`nav__link${page === l.id ? ' nav__link--on' : ''}`}
              onClick={() => go(l.id)}
            >
              {l.label}
            </button>
          ))}
          <button className="nav__cta" onClick={() => go('contact')}>Réservez</button>
        </div>
        <button className="nav__burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span style={open ? { transform: 'rotate(45deg) translate(5px,6px)' }  : {}} />
          <span style={open ? { opacity: 0 }                                      : {}} />
          <span style={open ? { transform: 'rotate(-45deg) translate(5px,-6px)' }: {}} />
        </button>
      </nav>

      {open && (
        <div className="drawer">
          {links.map(l => (
            <button
              key={l.id}
              className={`drawer__link${page === l.id ? ' drawer__link--on' : ''}`}
              onClick={() => go(l.id)}
            >
              {l.label}
            </button>
          ))}
          <button className="drawer__cta" onClick={() => go('contact')}>
            Réservez maintenant
          </button>
        </div>
      )}
    </>
  )
}

/* ── FOOTER ─────────────────────────────────────────────────── */
function Footer({ go }) {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__col">
          <Logo light />
          <p className="footer__txt" style={{ marginTop: '.5rem' }}>
            Votre agence spécialisée Ghana. Nous créons des expériences de voyage
            authentiques et inoubliables pour chaque voyageur.
          </p>
          <a href={WA} target="_blank" rel="noreferrer" className="footer__lnk" style={{ marginTop: '.5rem' }}>
            +233 530 645 509
          </a>
        </div>
        <div className="footer__col">
          <p className="footer__head">Navigation</p>
          {['accueil','services','apropos','contact'].map(id => (
            <button key={id} className="footer__lnk" style={{ textAlign:'left' }} onClick={() => go(id)}>
              {id === 'accueil' ? 'Accueil' : id === 'services' ? 'Nos Services' : id === 'apropos' ? 'À Propos' : 'Contact'}
            </button>
          ))}
        </div>
        <div className="footer__col">
          <p className="footer__head">Nos Services</p>
          {["Voyages sur mesure","Séjours de groupe","Séjours linguistiques","Hébergements premium","Visites guidées","Transferts"].map(s => (
            <span key={s} className="footer__txt" style={{ fontSize:'.84rem' }}>{s}</span>
          ))}
        </div>
        <div className="footer__col">
          <p className="footer__head">Contact</p>
          <span className="footer__txt">contact@eudoxieescapes.com</span>
          <span className="footer__txt">+233 530 645 509</span>
          <span className="footer__txt">Accra, Ghana</span>
          <span className="footer__txt">Abidjan, Côte d'Ivoire</span>
          <a href={WA} target="_blank" rel="noreferrer"
            className="btn btn--orange"
            style={{ marginTop:'1rem', fontSize:'.72rem', padding:'11px 22px' }}>
            WhatsApp
          </a>
        </div>
      </div>
      <div className="footer__bot">
        <span>© 2024 <span className="footer__bot-brand">Eudoxie Escapes</span>. Tous droits réservés.</span>
        <span>Accra · Abidjan</span>
      </div>
    </footer>
  )
}

/* ── HOMEPAGE ───────────────────────────────────────────────── */
function HomePage({ go }) {
  // AUTH: CRAM VED
  const [dest, setDest] = useState(0)

  const destinations = [
    {
      name: 'Accra',
      tag: 'Capitale vibrante',
      desc: "Découvrez la capitale dynamique du Ghana : marchés colorés, gastronomie locale, vie nocturne animée et musées qui racontent l'histoire d'un peuple fier.",
      feats: ['Culture', 'Gastronomie', 'Nightlife', 'Shopping'],
      img: U('photo-1660675133902-acd1b057f75d'),
    },
    {
      name: 'Cape Coast',
      tag: 'Histoire & Océan',
      desc: "Entre l'imposant château classé UNESCO et les plages de sable doré, Cape Coast vous plonge dans l'histoire du Ghana tout en offrant des eaux turquoise spectaculaires.",
      feats: ['Patrimoine UNESCO', 'Plages', 'Histoire', 'Surf'],
      img: '/bojo-beach.jpg',
    },
    {
      name: 'Big Ada',
      tag: 'Estuaire & Nature',
      desc: "À la rencontre de la Volta et de l'Atlantique, Big Ada est un paradis naturel préservé. Croisières en pirogue, oiseaux migrateurs et couchers de soleil magiques.",
      feats: ['Nature', 'Croisières', 'Pêche', 'Détente'],
      img: U('photo-1499793983690-e29da59ef1c2'),
    },
    {
      name: 'Akosombo',
      tag: 'Lac Volta',
      desc: "Le plus grand lac artificiel du monde vous attend. Croisières sur le lac Volta, barrages impressionnants et villages de pêcheurs authentiques à découvrir.",
      feats: ['Lac Volta', 'Croisières', 'Randonnée', 'Villages'],
      img: '/hero-2.jpg',
    },
    {
      name: 'Gomoa Fetteh',
      tag: 'Plage de rêve',
      desc: "Lagune émeraude, cocotiers et sable blanc à perte de vue. Gomoa Fetteh est la destination idéale pour un séjour balnéaire d'exception, loin de l'agitation.",
      feats: ['Lagune', 'Plage privée', 'Détente', 'Luxe'],
      img: '/cascades.jpeg',
    },
    {
      name: 'Adukrom',
      tag: 'Forêt tropicale',
      desc: "Partez à la conquête des collines d'Akuapem. Cascades cachées, forêts primaires et communautés rurales accueillantes pour une immersion authentique au cœur du Ghana.",
      feats: ['Forêt', 'Cascades', 'Randonnée', 'Éco-tourisme'],
      img: U('photo-1441974231531-c6227db76b6e'),
    },
  ]

  return (
    <div className="page-in">
      {/* HERO */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__overlay" />
        <div className="hero__content">
          <span className="hero__eyebrow">Agence de voyage spécialisée Ghana</span>
          <h1 className="hero__title">
            Découvrez<br />
            <span className="hero__title-accent">le Ghana</span>
          </h1>
          <p className="hero__desc">
            Voyages sur mesure, séjours linguistiques, expériences premium —
            Eudoxie Escapes vous ouvre les portes d'un Ghana authentique et inoubliable.
          </p>
          <div className="hero__actions">
            <button className="btn btn--orange" onClick={() => go('contact')}>
              Demandez votre séjour
            </button>
            <button className="btn btn--outline" onClick={() => go('services')}>
              Nos destinations
            </button>
          </div>
        </div>
        <div className="hero__stats">
          {[
            { n: '6+', l: 'Destinations' },
            { n: '100%', l: 'Sur mesure' },
            { n: '5★', l: 'Qualité' },
            { n: '2', l: 'Pays couverts' },
          ].map(s => (
            <div className="hero__stat" key={s.l}>
              <span className="hero__stat-num">{s.n}</span>
              <span className="hero__stat-lbl">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICE CARDS */}
      <div className="svc-cards-wrap">
        <div className="svc-cards-grid">
          {[
            {
              icon: (
                <svg viewBox="0 0 32 32" fill="currentColor">
                  <path d="M29 14.15 18 8V4a2 2 0 0 0-4 0v4L3 14.15a1 1 0 0 0-.5.87V17a.5.5 0 0 0 .6.49L12 15.56V20l-2.4 1.8A1 1 0 0 0 9 23v2a.5.5 0 0 0 .67.47L16 23l6.33 2.47A.5.5 0 0 0 23 25v-2a1 1 0 0 0-.4-.8L20 20v-4.44l8.9 1.93A.5.5 0 0 0 29.5 17v-1.98a1 1 0 0 0-.5-.87z"/>
                </svg>
              ),
              title: 'Voyages sur mesure',
              desc: "Couple, famille ou amis — chaque voyage est conçu selon vos envies, votre rythme et votre budget.",
            },
            {
              icon: (
                <svg viewBox="0 0 32 32" fill="currentColor">
                  <path d="M28 14v-4a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v4a4 4 0 0 0-2 3.46V26h2v-2h24v2h2V17.46A4 4 0 0 0 28 14zm-4-6a2 2 0 0 1 2 2v3.17A3.99 3.99 0 0 0 24 13h-6V8zm-16 2a2 2 0 0 1 2-2h6v5H8a3.99 3.99 0 0 0-2 .17V10zm-2 7.46A2 2 0 0 1 8 15h16a2 2 0 0 1 2 2v5H4z"/>
                </svg>
              ),
              title: 'Hébergements premium',
              desc: "Villas et appartements meublés haut de gamme sélectionnés pour votre confort et leur emplacement.",
            },
            {
              icon: (
                <svg viewBox="0 0 32 32" fill="currentColor">
                  <path d="M29 8h-5l-2-4H10L8 8H3a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1zm-1 18H4V10h5l2-4h10l2 4h5zM16 12a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"/>
                </svg>
              ),
              title: 'Visites guidées',
              desc: "Explorez le Ghana avec nos guides locaux passionnés pour une immersion profonde dans la culture.",
            },
            {
              icon: (
                <svg viewBox="0 0 32 32" fill="currentColor">
                  <path d="M28 4H12a4 4 0 0 0-4 4v2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a4 4 0 0 0 4-4v-2h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-6 22a2 2 0 0 1-2 2H4V12h16zM26 22h-4V12a2 2 0 0 0-2-2H10V8a2 2 0 0 1 2-2h16z"/>
                </svg>
              ),
              title: 'Séjours linguistiques',
              desc: "Apprenez l'anglais au cœur du Ghana avec des programmes immersifs alliant cours et découvertes.",
            },
          ].map(c => (
            <div className="svc-card" key={c.title}>
              <div className="svc-card__icon">{c.icon}</div>
              <p className="svc-card__title">{c.title}</p>
              <p className="svc-card__desc">{c.desc}</p>
              <button className="svc-card__link" onClick={() => go('services')}>
                En savoir plus →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT PREVIEW */}
      <section className="about-prev-sec">
        <div className="about-prev">
          <div className="about-prev__img-wrap">
            <div className="about-prev__img" />
            <div className="about-prev__badge">
              <span className="about-prev__badge-num">5+</span>
              <span className="about-prev__badge-lbl">Années d'expertise</span>
            </div>
          </div>
          <div className="about-prev__text">
            <span className="sec-label">À Propos de nous</span>
            <h2 className="sec-title">
              Votre partenaire<br />de voyage au Ghana
            </h2>
            <p style={{ fontSize: '.95rem', color: 'var(--muted)', lineHeight: '1.85' }}>
              Eudoxie Escapes est bien plus qu'une agence de voyage. Nous sommes vos
              compagnons de route, des passionnés du Ghana qui partagent leurs trésors
              cachés pour vous offrir une expérience unique.
            </p>
            <div className="about-prev__points">
              {[
                "Équipe locale, connaissance terrain approfondie",
                "Partenariats exclusifs avec les meilleurs hébergements",
                "Accompagnement personnalisé de A à Z",
                "Basés à Accra et Abidjan pour être toujours proches de vous",
              ].map(pt => (
                <div className="about-prev__pt" key={pt}>
                  <span className="about-prev__pt-dot">✓</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
            <button className="btn btn--orange" style={{ alignSelf: 'flex-start' }} onClick={() => go('apropos')}>
              Découvrez notre histoire
            </button>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="destinations-sec">
        <div className="destinations-head">
          <span className="sec-label">Nos Destinations</span>
          <h2 className="sec-title sec-title--w">Explorez le Ghana</h2>
          <p className="sec-sub sec-sub--w">
            Six destinations d'exception, chacune avec sa propre personnalité.
            Prochainement : Sénégal et au Zanzibar.
          </p>
        </div>
        <div className="dest-tabs-nav">
          {destinations.map((d, i) => (
            <button
              key={d.name}
              className={`dest-tab${dest === i ? ' dest-tab--on' : ''}`}
              onClick={() => setDest(i)}
            >
              {d.name}
            </button>
          ))}
        </div>
        <div className="dest-panel">
          <div className="dest-panel__img">
            <img
              key={destinations[dest].name}
              src={destinations[dest].img}
              alt={destinations[dest].name}
            />
          </div>
          <div className="dest-panel__text">
            <span className="dest-panel__tag">{destinations[dest].tag}</span>
            <h3 className="dest-panel__title">{destinations[dest].name}</h3>
            <p className="dest-panel__desc">{destinations[dest].desc}</p>
            <div className="dest-panel__feats">
              {destinations[dest].feats.map(f => (
                <span className="dest-panel__feat" key={f}>{f}</span>
              ))}
            </div>
            <button className="btn btn--orange" style={{ marginTop: '1rem' }} onClick={() => go('contact')}>
              Réservez ce séjour
            </button>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="why-sec">
        <div className="why-head">
          <span className="sec-label">Pourquoi nous choisir</span>
          <h2 className="sec-title">L'excellence Eudoxie</h2>
        </div>
        <div className="why-grid">
          {[
            { n: '01', title: 'Expertise locale', desc: "Notre équipe vit et travaille au Ghana. Nous connaissons les meilleures adresses, les routes secrètes et les expériences authentiques que les guides classiques ignorent." },
            { n: '02', title: 'Sur mesure à 100%', desc: "Chaque séjour est entièrement personnalisé. Pas de formules toutes faites — nous construisons votre voyage en fonction de vos envies, votre budget et vos intérêts." },
            { n: '03', title: 'Accompagnement total', desc: "De la première prise de contact jusqu'à votre retour, nous sommes disponibles 7j/7 pour vous accompagner et répondre à chaque question." },
          ].map(c => (
            <div className="why-card" key={c.n}>
              <span className="why-card__num">{c.n}</span>
              <p className="why-card__title">{c.title}</p>
              <p className="why-card__desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="cta-banner__bg" />
        <div className="cta-banner__overlay" />
        <div className="cta-banner__content">
          <h2 className="cta-banner__title">Prêt à partir au Ghana ?</h2>
          <p className="cta-banner__sub">
            Contactez-nous dès aujourd'hui pour construire ensemble le voyage de vos rêves.
            Réponse garantie sous 24h.
          </p>
          <div className="cta-banner__acts">
            <button className="btn btn--white" onClick={() => go('contact')}>
              Demandez un devis gratuit
            </button>
            <a href={WA} target="_blank" rel="noreferrer" className="btn btn--outline">
              WhatsApp direct
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ── SERVICES PAGE ──────────────────────────────────────────── */
function ServicesPage({ go }) {
  // AUTH: CRAM VED
  const avantages = [
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="28" height="28"><path d="M6 12 3.269 3.126A59.768 59.768 0 0 1 21.485 12 59.77 59.77 0 0 1 3.27 20.876L5.999 12Zm0 0h7.5"/></svg>,
      name: 'Voyages sur mesure',
      desc: "Itinéraire conçu de A à Z — vol, hébergement, activités — adapté à vos envies et votre budget.",
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="28" height="28"><path d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"/></svg>,
      name: 'Séjours de groupe',
      desc: "Groupes d'amis, familles ou professionnels : logistique complète gérée pour vous, sans stress.",
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="28" height="28"><path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/></svg>,
      name: 'Séjours linguistiques',
      desc: "Apprenez l'anglais en immersion totale au Ghana avec des programmes pédagogiques et culturels.",
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="28" height="28"><path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>,
      name: 'Hébergements premium',
      desc: "Villas, appartements et maisons d'hôtes soigneusement sélectionnés pour leur confort et leur emplacement.",
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="28" height="28"><path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>,
      name: 'Visites guidées',
      desc: "Nos guides locaux vous emmènent sur les sites incontournables et les trésors cachés du Ghana authentique.",
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="28" height="28"><path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/></svg>,
      name: 'Expériences premium',
      desc: "Excursions exclusives, dîners privés, spa et événements sur mesure pour une expérience d'exception.",
    },
  ]

  const dests = [
    { name: 'Accra',        sub: 'Capitale & Culture',  badge: 'Top',     img: U('photo-1660675133902-acd1b057f75d') },
    { name: 'Cape Coast',   sub: 'UNESCO & Plages',      badge: 'Populaire',img: '/bojo-beach.jpg' },
    { name: 'Big Ada',      sub: 'Nature & Estuaire',   badge: 'Nature',   img: U('photo-1499793983690-e29da59ef1c2') },
    { name: 'Akosombo',     sub: 'Lac Volta',            badge: 'Insolite', img: U('photo-1506905925346-21bda4d32df4') },
    { name: 'Gomoa Fetteh', sub: 'Plage & Lagune',       badge: 'Luxe',     img: '/cascades.jpeg' },
    { name: 'Adukrom',      sub: 'Forêt & Cascades',    badge: 'Éco',      img: U('photo-1441974231531-c6227db76b6e') },
  ]

  return (
    <div className="page-in">
      <div className="page-hero" style={{ '--bg': `url(${U('photo-1436491865332-7a61a109cc05', 1920)})` }}>
        <div className="page-hero__bg" style={{ backgroundImage: `url(${U('photo-1436491865332-7a61a109cc05', 1920)})` }} />
        <div className="page-hero__ov" />
        <div className="page-hero__cnt">
          <span className="page-hero__label">Eudoxie Escapes</span>
          <h1 className="page-hero__title">Nos Services</h1>
          <p className="page-hero__sub">Des voyages conçus pour vous — chaque détail pensé pour une expérience parfaite.</p>
        </div>
      </div>

      <div className="full-svcs">
        <div className="full-svcs__head">
          <span className="sec-label">Nos offres</span>
          <h2 className="sec-title">Choisissez votre séjour</h2>
          <p className="sec-sub">
            Des packages tout compris conçus pour chaque type de voyageur — couple, duo ou groupe.
          </p>
        </div>
        <div className="pkg-grid">
          {[
            { img: '/offre%20couple.jpg',           alt: 'Package Couple — 5 jours / 4 nuits' },
            { img: '/offre%202personnes.jpg',        alt: 'Offre Séjour — 3 nuits / 4 jours pour 2 personnes' },
            { img: '/entreprise%20ou%20groupe.jpg',  alt: 'Offre Entreprises / Groupes' },
          ].map(p => (
            <div className="pkg-card" key={p.alt}>
              <img src={p.img} alt={p.alt} loading="lazy" />
              <div className="pkg-card__footer">
                <button className="btn btn--orange" onClick={() => go('contact')}>
                  Réserver cette offre
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="avantages-sec">
        <div className="full-svcs__head">
          <span className="sec-label">Ce qui est inclus</span>
          <h2 className="sec-title">Tout ce dont vous avez besoin</h2>
          <p className="sec-sub">Chacun de nos séjours intègre ces prestations selon votre package choisi.</p>
        </div>
        <div className="avantages-grid">
          {avantages.map(a => (
            <div className="avantage-item" key={a.name}>
              <div className="avantage-item__icon">{a.icon}</div>
              <div>
                <h4 className="avantage-item__name">{a.name}</h4>
                <p className="avantage-item__desc">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dest-cards-sec">
        <div className="dest-cards-head">
          <span className="sec-label">Destinations incluses</span>
          <h2 className="sec-title">Explorez le Ghana</h2>
        </div>
        <div className="dest-cards-grid">
          {dests.map(d => (
            <div className="dcard" key={d.name}>
              <div className="dcard__img" style={{ backgroundImage: `url(${d.img})` }} />
              <div className="dcard__ov" />
              <div className="dcard__body">
                <p className="dcard__name">{d.name}</p>
                <p className="dcard__sub">{d.sub}</p>
                <span className="dcard__badge">{d.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="cta-banner">
        <div className="cta-banner__bg" style={{ backgroundImage: `url(${U('photo-1507525428034-b723cf961d3e', 1920)})` }} />
        <div className="cta-banner__overlay" />
        <div className="cta-banner__content">
          <h2 className="cta-banner__title">Construisons votre voyage</h2>
          <p className="cta-banner__sub">Réponse sous 24h · Devis gratuit · Aucun engagement</p>
          <div className="cta-banner__acts">
            <button className="btn btn--white" onClick={() => go('contact')}>Demander un devis</button>
            <a href={WA} target="_blank" rel="noreferrer" className="btn btn--outline">WhatsApp</a>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ── ABOUT PAGE ─────────────────────────────────────────────── */
function AboutPage({ go }) {
  // AUTH: CRAM VED
  const stats = [
    { n: '6+', l: 'Destinations Ghana' },
    { n: '100%', l: 'Satisfaction clients' },
    { n: '2', l: 'Pays de présence' },
    { n: '24h', l: 'Réactivité garantie' },
  ]
  const values = [
    { ico: '🤝', title: 'Confiance', desc: "La transparence est au cœur de chaque relation. Nous vous informons à chaque étape, sans surprise ni frais cachés." },
    { ico: '⭐', title: 'Excellence', desc: "Chaque prestation est sélectionnée avec rigueur. Nous n'acceptons que ce que nous serions fiers de vivre nous-mêmes." },
    { ico: '❤️', title: 'Passion', desc: "Nous aimons le Ghana avec ses richesses, ses contrastes et ses gens chaleureux. Cette passion se ressent dans chaque voyage que nous créons." },
  ]

  return (
    <div className="page-in">
      <div className="page-hero">
        <div className="page-hero__bg" style={{ backgroundImage: `url(${U('photo-1469474968028-56623f02e42e', 1920)})` }} />
        <div className="page-hero__ov" />
        <div className="page-hero__cnt">
          <span className="page-hero__label">Notre histoire</span>
          <h1 className="page-hero__title">À Propos</h1>
          <p className="page-hero__sub">Une équipe passionnée, une mission claire : vous faire vivre le Ghana autrement.</p>
        </div>
      </div>

      <div className="story-sec">
        <div className="story-img" style={{ backgroundImage: `url(${U('photo-1476514525535-07fb3b4ae5f1')})` }} />
        <div className="story-text">
          <span className="sec-label">Qui sommes-nous</span>
          <h2 className="sec-title">Eudoxie Escapes,<br />née d'une passion</h2>
          <p>
            Fondée par des passionnés du Ghana établis à Accra et Abidjan, Eudoxie Escapes
            est née d'une conviction : le Ghana mérite d'être découvert autrement.
            Loin des circuits touristiques standards, nous vous ouvrons les portes
            d'un Ghana authentique, vivant et accueillant.
          </p>
          <p>
            Notre agence est spécialisée exclusivement sur le Ghana — une spécialisation
            qui nous permet d'offrir une expertise terrain sans égal. Chaque destination,
            chaque hébergement, chaque activité que nous proposons a été testé et validé
            par notre équipe locale.
          </p>
          <p>
            Bientôt, nous étendrons notre expertise au Sénégal et au Zanzibar.
            En attendant, le Ghana n'a plus aucun secret pour nous.
          </p>
          <button className="btn btn--orange" style={{ alignSelf: 'flex-start' }} onClick={() => go('contact')}>
            Travaillez avec nous
          </button>
        </div>
      </div>

      <div className="stats-bar">
        {stats.map(s => (
          <div className="stats-bar__item" key={s.l}>
            <span className="stats-bar__num">{s.n}</span>
            <span className="stats-bar__lbl">{s.l}</span>
          </div>
        ))}
      </div>

      <section className="values-sec">
        <div className="values-head">
          <span className="sec-label">Nos valeurs</span>
          <h2 className="sec-title">Ce qui nous guide</h2>
        </div>
        <div className="values-grid">
          {values.map(v => (
            <div className="val-card" key={v.title}>
              <span className="val-card__icon">{v.ico}</span>
              <p className="val-card__title">{v.title}</p>
              <p className="val-card__desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <div className="cta-banner__bg" style={{ backgroundImage: `url(${U('photo-1571003123894-1f0594d2b5d9', 1920)})` }} />
        <div className="cta-banner__overlay" />
        <div className="cta-banner__content">
          <h2 className="cta-banner__title">Voyageons ensemble</h2>
          <p className="cta-banner__sub">
            Rejoignez les voyageurs qui nous font confiance. Votre prochaine aventure au Ghana commence ici.
          </p>
          <div className="cta-banner__acts">
            <button className="btn btn--white" onClick={() => go('contact')}>Planifier mon voyage</button>
            <a href={WA} target="_blank" rel="noreferrer" className="btn btn--outline">WhatsApp</a>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ── CONTACT PAGE ───────────────────────────────────────────── */
function ContactPage() {
  // AUTH: CRAM VED
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle')

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(
        'service_vbaoc55',
        'template_77umfvp',
        formRef.current,
        'CAjMLkujLgjLK0cTz'
      )
      setStatus('ok')
      formRef.current.reset()
    } catch {
      setStatus('idle')
      alert("Erreur lors de l'envoi. Veuillez réessayer ou nous contacter sur WhatsApp.")
    }
  }

  return (
    <div className="page-in">
      <div className="page-hero">
        <div className="page-hero__bg" style={{ backgroundImage: `url(${U('photo-1507525428034-b723cf961d3e', 1920)})` }} />
        <div className="page-hero__ov" />
        <div className="page-hero__cnt">
          <span className="page-hero__label">Demande de devis</span>
          <h1 className="page-hero__title">Réservez votre séjour</h1>
          <p className="page-hero__sub">Remplissez le formulaire ci-dessous — nous vous envoyons votre devis personnalisé sous 24 heures.</p>
        </div>
      </div>

      <div className="contact-sec">
        {/* Info */}
        <div className="cinfo">
          <h2 className="cinfo__title">Obtenez votre devis gratuit</h2>
          <p className="cinfo__sub">
            Remplissez le formulaire avec les détails de votre séjour. Notre équipe
            établit votre devis personnalisé et vous répond sous 24h.
          </p>
          <div className="cinfo__list">
            {[
              {
                ico: (
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd"/>
                  </svg>
                ),
                lbl: 'Téléphone / WhatsApp', val: '+233 530 645 509',
              },
              {
                ico: (
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67z"/>
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908z"/>
                  </svg>
                ),
                lbl: 'Email', val: 'contact@eudoxieescapes.com',
              },
              {
                ico: (
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-2.079 3.509-4.793 3.509-8.873a8.25 8.25 0 0 0-16.5 0c0 4.08 1.565 6.794 3.51 8.873a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.144.742zM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" clipRule="evenodd"/>
                  </svg>
                ),
                lbl: 'Bureaux', val: "Accra, Ghana · Abidjan, Côte d'Ivoire",
              },
              {
                ico: (
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477zM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0zM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605zM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477zM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816zM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49zM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276zM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985z"/>
                  </svg>
                ),
                lbl: 'Site web', val: 'eudoxieescapes.com',
              },
            ].map(item => (
              <div className="cinfo__item" key={item.lbl}>
                <div className="cinfo__icon">{item.ico}</div>
                <div>
                  <p className="cinfo__lbl">{item.lbl}</p>
                  <p className="cinfo__val">{item.val}</p>
                </div>
              </div>
            ))}
          </div>
          <a href={WA} target="_blank" rel="noreferrer" className="btn btn--orange" style={{ alignSelf: 'flex-start' }}>
            Ouvrir WhatsApp
          </a>
        </div>

        {/* Form */}
        <form
          ref={formRef}
          className={`cform${status === 'sending' ? ' form-sending' : ''}`}
          onSubmit={handleSubmit}
        >
          <div className="cform__intro">
            <p>Pour recevoir votre devis, merci de renseigner les informations suivantes. Tous les champs marqués <strong>*</strong> sont obligatoires.</p>
          </div>
          {status === 'ok' && (
            <p className="form-ok">
              ✓ Votre demande a bien été reçue ! Nous vous envoyons votre devis sous 24h.
            </p>
          )}
          <div className="cform__row">
            <div className="fg">
              <label htmlFor="from_name">Nom et prénom *</label>
              <input id="from_name" name="from_name" type="text" placeholder="Coffy AYAWA" required maxLength={100} />
            </div>
            <div className="fg">
              <label htmlFor="from_email">Email *</label>
              <input id="from_email" name="from_email" type="email" placeholder="coffyayawa@GMAIL.com" required maxLength={150} />
            </div>
          </div>
          <div className="cform__row">
            <div className="fg">
              <label htmlFor="participants">Nombre de participants *</label>
              <select id="participants" name="participants" required>
                <option value="">Sélectionner</option>
                {['1 personne','2 personnes','3–4 personnes','5–9 personnes','10+ personnes'].map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <div className="fg">
              <label htmlFor="stay_type">Type de séjour *</label>
              <select id="stay_type" name="stay_type" required>
                <option value="">Sélectionner</option>
                {['Voyage privé','Séjour de groupe','Séjour linguistique','Voyage d\'affaires','Expérience premium'].map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="cform__row">
            <div className="fg">
              <label htmlFor="travel_month">Mois souhaité *</label>
              <select id="travel_month" name="travel_month" required>
                <option value="">Mois</option>
                {['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div className="fg">
              <label htmlFor="travel_year">Année *</label>
              <select id="travel_year" name="travel_year" required>
                <option value="">Année</option>
                {['2025','2026','2027'].map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
          <div className="cform__row">
            <div className="fg">
              <label htmlFor="duration">Durée du séjour *</label>
              <select id="duration" name="duration" required>
                <option value="">Sélectionner</option>
                {['3 nuits / 4 jours','4 nuits / 5 jours','5 nuits / 6 jours','1 semaine','2 semaines','Plus de 2 semaines','À définir'].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="fg">
              <label htmlFor="accommodation">Type d'hébergement souhaité *</label>
              <select id="accommodation" name="accommodation" required>
                <option value="">Sélectionner</option>
                {['Villa privée','Appartement meublé','Maison d\'hôtes','Hôtel','Sur conseil de l\'agence'].map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="fg">
            <label htmlFor="budget">Budget estimé (optionnel)</label>
            <select id="budget" name="budget">
              <option value="">Sélectionner</option>
              {['Moins de 1 000 €','1 000 – 2 000 €','2 000 – 4 000 €','4 000 – 7 000 €','7 000 € et plus'].map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          <div className="fg">
            <label htmlFor="message">Message (optionnel)</label>
            <textarea id="message" name="message" placeholder="Partagez vos envies, questions ou attentes particulières…" maxLength={1000} />
          </div>

          <div className="cform__conditions">
            <div className="cform__conditions-title">Conditions de réservation</div>
            <ul className="cform__conditions-list">
              <li>La réservation est confirmée par un <strong>acompte de 50 %</strong> non remboursable.</li>
              <li>Le <strong>solde est à régler à votre arrivée</strong> au Ghana.</li>
            </ul>
          </div>

          <button type="submit" className="btn btn--orange" style={{ alignSelf: 'flex-start' }} disabled={status === 'sending'}>
            {status === 'sending' ? 'Envoi en cours…' : 'Demander mon devis gratuit'}
          </button>
        </form>
      </div>
    </div>
  )
}

/* ── APP ────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState('accueil')

  const go = id => {
    setPage(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Navbar page={page} go={go} />

      {page === 'accueil'  && <HomePage  go={go} />}
      {page === 'services' && <ServicesPage go={go} />}
      {page === 'apropos'  && <AboutPage  go={go} />}
      {page === 'contact'  && <ContactPage />}

      <Footer go={go} />

      <a href={WA} target="_blank" rel="noreferrer" className="wa-float" aria-label="WhatsApp">
        <IcoWA />
      </a>
    </>
  )
}
