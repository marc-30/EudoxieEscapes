import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'
//// auth :CRAM VED
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
    { id: 'contact',  label: 'Contact' },
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
      img: U('accra ghana.jpg'),
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
      img: U('hero-2.jpg'),
    },
    {
      name: 'Gomoa Fetteh',
      tag: 'Plage de rêve',
      desc: "Lagune émeraude, cocotiers et sable blanc à perte de vue. Gomoa Fetteh est la destination idéale pour un séjour balnéaire d'exception, loin de l'agitation.",
      feats: ['Lagune', 'Plage privée', 'Détente', 'Luxe'],
      img: '/src/goma.jpg',
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 12 3.269 3.126A59.768 59.768 0 0 1 21.485 12 59.77 59.77 0 0 1 3.27 20.876L5.999 12Zm0 0h7.5"/>
                </svg>
              ),
              title: 'Voyages sur mesure',
              desc: "Couple, famille ou amis — chaque voyage est conçu selon vos envies, votre rythme et votre budget.",
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"/>
                </svg>
              ),
              title: 'Hébergements premium',
              desc: "Villas et appartements meublés haut de gamme sélectionnés pour votre confort et leur emplacement.",
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"/>
                </svg>
              ),
              title: 'Visites guidées',
              desc: "Explorez le Ghana avec nos guides locaux passionnés pour une immersion profonde dans la culture.",
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/>
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
            Prochainement : Sénégal et Zanzibar.
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
  const svcs = [
    { name: 'Voyages sur mesure',    img: U('photo-1436491865332-7a61a109cc05'), desc: "Nous concevons votre itinéraire de A à Z — vol, hébergement, activités — parfaitement adapté à votre groupe et vos attentes." },
    { name: 'Séjours de groupe',     img: '/src/sejour%20groupe.jpg', desc: "Groupes d'amis, de famille ou professionnels : nous gérons la logistique complète pour des séjours collectifs sans stress." },
    { name: 'Séjours linguistiques', img: U('photo-1503220317375-aaad61436b1b'), desc: "Apprenez l'anglais en situation réelle au cœur du Ghana avec des programmes pédagogiques et culturels immersifs." },
    { name: 'Hébergements premium',  img: '/src/Apart.jpg', desc: "Villas, appartements et maisons d'hôtes sélectionnés pour leur qualité, leur confort et leur emplacement stratégique." },
    { name: 'Visites guidées',       img: '/src/Kwame%20Nkrumah%20Memorial%20Park-Ghana%F0%9F%87%AC%F0%9F%87%AD.jpg', desc: "Nos guides locaux vous emmènent découvrir les sites incontournables et les trésors cachés du Ghana authentique." },
    { name: 'Expériences premium',   img: U('photo-1582719508461-905c673771fd'), desc: "Excursions exclusives, dîners privés, spa et événements sur mesure pour une expérience de voyage d'exception." },
  ]

  const dests = [
    { name: 'Accra',        sub: 'Capitale & Culture',  badge: 'Top',     img: U('photo-1660675133902-acd1b057f75d') },
    { name: 'Cape Coast',   sub: 'UNESCO & Plages',      badge: 'Populaire',img: U('photo-1519046904884-53103b34b206') },
    { name: 'Big Ada',      sub: 'Nature & Estuaire',   badge: 'Nature',   img: U('photo-1499793983690-e29da59ef1c2') },
    { name: 'Akosombo',     sub: 'Lac Volta',            badge: 'Insolite', img: U('photo-1506905925346-21bda4d32df4') },
    { name: 'Gomoa Fetteh', sub: 'Plage & Lagune',       badge: 'Luxe',     img: '/src/goma.jpg' },
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
          <span className="sec-label">Ce que nous proposons</span>
          <h2 className="sec-title">Nos prestations</h2>
          <p className="sec-sub">
            De l'organisation complète à l'expérience unique, nous couvrons tous vos besoins de voyage au Ghana.
          </p>
        </div>
        <div className="full-svcs__grid">
          {svcs.map(s => (
            <div className="fsvc-card" key={s.name}>
              <div className="fsvc-card__img" style={{ backgroundImage: `url(${s.img})` }} />
              <div className="fsvc-card__body">
                <p className="fsvc-card__name">{s.name}</p>
                <p className="fsvc-card__desc">{s.desc}</p>
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
            Bientôt, nous étendrons notre expertise au Sénégal et à Zanzibar.
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
          <span className="page-hero__label">Nous contacter</span>
          <h1 className="page-hero__title">Contactez-nous</h1>
          <p className="page-hero__sub">Planifiez votre séjour au Ghana — réponse garantie sous 24 heures.</p>
        </div>
      </div>

      <div className="contact-sec">
        {/* Info */}
        <div className="cinfo">
          <h2 className="cinfo__title">Parlons de votre voyage</h2>
          <p className="cinfo__sub">
            Dites-nous vos envies et nous construisons ensemble le séjour idéal.
            Chaque demande est traitée avec soin par notre équipe locale.
          </p>
          <div className="cinfo__list">
            {[
              { ico: '📞', lbl: 'Téléphone / WhatsApp', val: '+233 530 645 509' },
              { ico: '✉️', lbl: 'Email', val: 'contact@eudoxieescapes.com' },
              { ico: '📍', lbl: 'Bureaux', val: 'Accra, Ghana · Abidjan, Côte d\'Ivoire' },
              { ico: '🌐', lbl: 'Site web', val: 'eudoxieescapes.com' },
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
          {status === 'ok' && (
            <p className="form-ok">
              ✓ Votre demande a été envoyée ! Nous vous répondons sous 24h.
            </p>
          )}
          <div className="cform__row">
            <div className="fg">
              <label htmlFor="from_name">Nom et prénom *</label>
              <input id="from_name" name="from_name" type="text" placeholder="Jean Dupont" required />
            </div>
            <div className="fg">
              <label htmlFor="from_email">Email *</label>
              <input id="from_email" name="from_email" type="email" placeholder="jean@email.com" required />
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
              <label htmlFor="travel_month">Mois souhaité</label>
              <select id="travel_month" name="travel_month">
                <option value="">Mois</option>
                {['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div className="fg">
              <label htmlFor="travel_year">Année</label>
              <select id="travel_year" name="travel_year">
                <option value="">Année</option>
                {['2025','2026','2027'].map(y => <option key={y} value={y}>{y}</option>)}
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
            <textarea id="message" name="message" placeholder="Partagez vos envies, questions ou attentes particulières…" />
          </div>
          <button type="submit" className="btn btn--orange" style={{ alignSelf: 'flex-start' }} disabled={status === 'sending'}>
            {status === 'sending' ? 'Envoi en cours…' : 'Envoyer ma demande'}
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
