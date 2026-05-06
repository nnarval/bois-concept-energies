// ============================================================
// Realisations — featured before/after + filterable grid
// ============================================================
function Realisations() {
  const all = [
    { src: '../../assets/photography/realisations/bce-realisation-poele-1.jpg', cap: 'Poêle installé · chantier BCE', cat: 'poele' },
    { src: '../../assets/photography/realisations/bce-realisation-poele-2.jpg', cap: 'Poêle à granulés · chantier BCE', cat: 'poele' },
    { src: '../../assets/photography/realisations/bce-realisation-poele-3.jpg', cap: 'Poêle à bois · chantier BCE', cat: 'poele' },
    { src: '../../assets/photography/realisations/bce-realisation-insert-1.jpg', cap: 'Insert posé · chantier BCE', cat: 'insert' },
    { src: '../../assets/photography/realisations/bce-realisation-insert-2.jpg', cap: 'Insert bois · chantier BCE', cat: 'insert' },
    { src: '../../assets/photography/realisations/bce-realisation-insert-3.jpg', cap: 'Insert en cheminée existante · chantier BCE', cat: 'insert' },
  ];
  const [filter, setFilter] = React.useState('tous');
  const filtered = filter === 'tous' ? all : all.filter(p => p.cat === filter);

  return (
    <section id="realisations" data-screen-label="05 Realisations" style={{ background: 'var(--bg)', padding: '128px 32px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ maxWidth: 720, marginBottom: 48 }}>
          <span className="eyebrow">Réalisations</span>
          <h2 style={{ marginTop: 14 }}>Avant / après — exemple récent à Caussade.</h2>
          <p style={{ color: 'var(--fg-2)' }}>
            Glissez le curseur pour voir la transformation. Foyer ouvert obsolète remplacé par un insert à granulés haut rendement, habillage pierre conservé.
          </p>
        </div>

        <BeforeAfter
          before="../../assets/photography/avant-insert.png"
          after="../../assets/photography/apres-insert.png"
          labelBefore="Foyer d'origine"
          labelAfter="Insert posé"
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, margin: '96px 0 32px' }}>
          <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 32 }}>D'autres chantiers</h3>
          <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--surface)', borderRadius: 999, border: '1px solid var(--sand)' }}>
            {[
              { k: 'tous', l: 'Tous' },
              { k: 'poele', l: 'Poêles' },
              { k: 'insert', l: 'Inserts' },
            ].map(o => (
              <button key={o.k} onClick={() => setFilter(o.k)} style={{
                padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                fontFamily: 'var(--font-body)', cursor: 'pointer', border: 'none',
                background: filter === o.k ? 'var(--ink)' : 'transparent',
                color: filter === o.k ? 'var(--bg)' : 'var(--fg-2)',
                transition: 'all 200ms var(--ease)',
              }}>{o.l}</button>
            ))}
          </div>
        </div>

        <div className="bce-realisations-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {filtered.map((p, i) => (
            <figure key={p.src} style={{ margin: 0, animation: 'fadeUp 380ms var(--ease) both', animationDelay: (i*60) + 'ms' }}>
              <div style={{ aspectRatio: '3/4', borderRadius: 8, overflow: 'hidden', position: 'relative', background: 'var(--surface)' }}>
                <img src={p.src} alt={p.cap} loading="lazy"
                     style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                              transition: 'transform 480ms var(--ease)' }}
                     onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                     onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} />
              </div>
              <figcaption style={{ marginTop: 10, fontSize: 13, color: 'var(--fg-3)' }}>{p.cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }`}</style>
    </section>
  );
}

function ProductCatalogTeaser() {
  const families = [
    {
      title: 'Poêles à bois',
      count: '101 modèles',
      status: 'Catalogue disponible',
      src: '../../assets/photography/catalogue-poele-bois.png',
    },
    {
      title: 'Poêles à granulés',
      count: '136 modèles',
      status: 'Catalogue disponible',
      src: '../../assets/photography/catalogue-poele-granules.png',
    },
    {
      title: 'Inserts bois',
      count: '47 modèles',
      status: 'Catalogue disponible',
      src: '../../assets/photography/catalogue-insert-bois.png',
    },
    {
      title: 'Inserts à granulés',
      count: '6 modèles',
      status: 'Catalogue disponible',
      src: '../../assets/photography/catalogue-insert-granules.png',
    },
  ];

  return (
    <section id="produits" className="bce-products-entry" aria-labelledby="catalogue-home-title">
      <div className="bce-products-entry-top">
        <div className="bce-products-entry-copy">
          <h3 id="catalogue-home-title">Catalogue produits</h3>
          <p>
            Comparez en ligne nos poêles et inserts par marque, famille et type de chauffage.
          </p>
        </div>
      </div>
      <div className="bce-family-grid">
        {families.map((family) => (
          <figure className="bce-family-card" key={family.title}>
            <img src={family.src} alt={family.title} loading="lazy" />
            <figcaption>
              <span>{family.status}</span>
              <strong>{family.title}</strong>
              <small>{family.count}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <a className="bce-products-offer" href="nos-produits.html" aria-label="Voir le catalogue pour profiter de l'offre moins dix pour cent">
        <div>
          <strong>-10%</strong>
          <span>pour toute installation faite avant fin août</span>
        </div>
        <em>Voir le catalogue <Icon name="arrow-right" size={15} /></em>
      </a>
    </section>
  );
}

// ============================================================
// Zone — interactive map + temps de trajet
// ============================================================
function Zone() {
  return (
    <section id="zone" data-screen-label="06 Zone" style={{ background: 'var(--surface)', padding: '128px 32px', borderTop: '1px solid var(--sand)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'center' }}>
        <div>
          <span className="eyebrow">Zone d'intervention</span>
          <h2 style={{ marginTop: 14 }}>Tout le Tarn-et-Garonne, depuis Nègrepelisse.</h2>
          <p style={{ color: 'var(--fg-2)' }}>
            Survolez les communes pour voir le temps de trajet depuis l'atelier. Pour un déplacement plus lointain, appelez-nous — chaque demande est étudiée.
          </p>
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'var(--fg-2)' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--leaf)' }} /> Atelier BCE
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'var(--fg-2)' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--ash)' }} /> Communes desservies
            </div>
          </div>
        </div>
        <DeptMap />
      </div>
    </section>
  );
}

// ============================================================
// Contact — adds response-time pill, direct contact links, success state
// ============================================================
function Contact() {
  const [sent, setSent] = React.useState(false);
  const phoneDisplay = '06 08 35 62 76';
  const phoneHref = 'tel:+33608356276';
  const email = 'boisconceptenergies@gmail.com';
  const emailCopy = 'grieumard.xavier82@gmail.com';
  const mailtoHref = `mailto:${email}?cc=${encodeURIComponent(emailCopy)}`;
  const mapsHref = 'https://www.google.com/maps/search/?api=1&query=735%20route%20des%20Combattants%20d%27Indochine%2082800%20N%C3%A8grepelisse';
  const handleContactSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      'Bonjour,',
      '',
      'Je souhaite être recontacté au sujet de mon projet.',
      '',
      `Nom : ${data.get('name') || ''}`,
      `Téléphone : ${data.get('tel') || ''}`,
      `Email : ${data.get('email') || ''}`,
      `Type de projet : ${data.get('project') || ''}`,
      '',
      'Message :',
      data.get('message') || '',
      '',
      'Message envoyé depuis le site Bois Concept Énergies.',
    ].join('\n');
    const href = `mailto:${email}?cc=${encodeURIComponent(emailCopy)}&subject=${encodeURIComponent('Demande de contact - Bois Concept Énergies')}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSent(true);
  };

  return (
    <section id="contact" data-screen-label="08 Contact" style={{ background: 'var(--bg)', padding: '128px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 96 }}>
        <div>
          <span className="eyebrow">Nous contacter</span>
          <h2 style={{ marginTop: 14 }}>Parlons de votre projet.</h2>
          <p style={{ color: 'var(--fg-2)' }}>
            Une question, un devis, une visite à programmer ? Trois façons de nous joindre — choisissez celle qui vous arrange.
          </p>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 24,
            padding: '8px 14px', background: 'rgba(70,130,27,0.1)', borderRadius: 999,
            fontSize: 13, color: 'var(--leaf-2)', fontWeight: 600,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--leaf)', boxShadow: '0 0 0 4px rgba(70,130,27,0.2)' }} />
            Réponse moyenne en 4h ouvrées
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: '40px 0 0', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <li style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <Icon name="phone" size={18} style={{ color: 'var(--leaf)' }} />
              <a href={phoneHref} style={{ color: 'var(--ink)', borderBottom: '1px solid rgba(70,130,27,0.35)' }}>{phoneDisplay}</a>
            </li>
            <li style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <Icon name="mail" size={18} style={{ color: 'var(--leaf)' }} />
              <a href={mailtoHref} style={{ color: 'var(--ink)', borderBottom: '1px solid rgba(70,130,27,0.35)' }}>{email}</a>
            </li>
            <li style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <Icon name="map-pin" size={18} style={{ color: 'var(--leaf)' }} />
              <a href={mapsHref} target="_blank" rel="noreferrer" style={{ color: 'var(--ink)', borderBottom: '1px solid rgba(70,130,27,0.35)' }}>
                Showroom Tignol Béton · 735 route des Combattants d'Indochine · 82800 Nègrepelisse
              </a>
            </li>
            <li style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <Icon name="clock" size={18} style={{ color: 'var(--leaf)' }} /> Lun–Ven · 8h30–18h · Sam sur RDV
            </li>
          </ul>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
            <a className="bce-button" href={phoneHref} style={{
              background: 'var(--leaf)', color: 'var(--bg)', border: '1px solid var(--leaf)',
              padding: '12px 18px', borderRadius: 4, fontSize: 14, fontWeight: 700,
            }}>
              <Icon name="phone" size={16} /> Appeler maintenant
            </a>
            <a className="bce-button" href={mailtoHref} style={{
              background: 'transparent', color: 'var(--ink)', border: '1px solid var(--ink)',
              padding: '12px 18px', borderRadius: 4, fontSize: 14, fontWeight: 700,
            }}>
              <Icon name="mail" size={16} /> Écrire un email
            </a>
          </div>
        </div>

        {sent ? (
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--sand)', borderRadius: 12,
            padding: '64px 48px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center',
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%', background: 'var(--leaf)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg)', marginBottom: 24,
            }}>
              <Icon name="check" size={28} />
            </div>
            <h3 style={{ margin: '0 0 12px' }}>Bien reçu, merci.</h3>
            <p style={{ color: 'var(--fg-2)', maxWidth: 420, marginBottom: 24 }}>
              Votre messagerie vient de s'ouvrir avec le message prérempli pour BCE et Xavier en copie. Il vous reste simplement à l'envoyer depuis votre application mail.
            </p>
            <button onClick={() => setSent(false)} style={{
              background: 'transparent', color: 'var(--leaf)', border: 'none', padding: 0,
              fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer',
              borderBottom: '1px solid currentColor',
            }}>Envoyer un autre message</button>
          </div>
        ) : (
          <form className="bce-contact-form" onSubmit={handleContactSubmit}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <Field label="Nom complet" name="name" placeholder="Marie Dubois" />
            <Field label="Téléphone" name="tel" type="tel" placeholder="06 12 34 56 78" />
            <Field label="Email" name="email" type="email" placeholder="marie@exemple.fr" wide />
            <FieldSelect label="Type de projet" name="project" wide
              options={['Poêle à granulés', 'Poêle à bois', 'Insert', 'Entretien / ramonage d’un appareil posé par BCE', 'Je ne sais pas encore']} />
            <FieldArea label="Votre message (optionnel)" name="message" wide
              placeholder="Surface à chauffer, conduit existant, contraintes particulières…" />
            <div className="bce-contact-actions" style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <span style={{ fontSize: 13, color: 'var(--fg-3)' }}>
                Aucune donnée n'est partagée. Voir notre <a href="politique-confidentialite.html" style={{ color: 'var(--leaf)' }}>politique de confidentialité</a>.
              </span>
              <button className="bce-button" type="submit" style={{
                background: 'var(--ink)', color: 'var(--bg)', border: 'none',
                padding: '14px 26px', borderRadius: 4, fontSize: 15, fontWeight: 600,
                fontFamily: 'var(--font-body)', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 10,
              }}>
                Envoyer le message <Icon name="arrow-right" size={16} />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({ label, name, placeholder, type = 'text', wide }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: wide ? '1 / -1' : 'auto' }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-2)' }}>{label}</span>
      <input type={type} name={name} placeholder={placeholder}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ fontFamily: 'var(--font-body)', fontSize: 16, padding: '12px 14px',
          background: 'var(--surface)',
          border: '1px solid ' + (focus ? 'var(--leaf)' : 'rgba(20,20,20,0.15)'),
          borderRadius: 4, color: 'var(--ink)', outline: 'none',
          transition: 'border-color 180ms var(--ease)' }} />
    </label>
  );
}
function FieldSelect({ label, name, options, wide }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: wide ? '1 / -1' : 'auto' }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-2)' }}>{label}</span>
      <select name={name} style={{ fontFamily: 'var(--font-body)', fontSize: 16, padding: '12px 14px',
        background: 'var(--surface)', border: '1px solid rgba(20,20,20,0.15)', borderRadius: 4, color: 'var(--ink)' }}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
function FieldArea({ label, name, placeholder, wide }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: wide ? '1 / -1' : 'auto' }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-2)' }}>{label}</span>
      <textarea rows={4} name={name} placeholder={placeholder}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ fontFamily: 'var(--font-body)', fontSize: 16, padding: '12px 14px',
          background: 'var(--surface)',
          border: '1px solid ' + (focus ? 'var(--leaf)' : 'rgba(20,20,20,0.15)'),
          borderRadius: 4, color: 'var(--ink)', resize: 'vertical', outline: 'none',
          transition: 'border-color 180ms var(--ease)' }} />
    </label>
  );
}

function Footer() {
  const footerColumns = [
    {
      title: 'Société',
      links: [
        { label: 'À propos', href: 'a-propos.html' },
        { label: 'Nos produits', href: 'nos-produits.html' },
        { label: 'Xavier Grieumard', href: 'xavier-grieumard.html' },
        { label: 'Réalisations', href: '#realisations' },
        { label: 'Mentions légales', href: 'mentions-legales.html' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { label: '06 08 35 62 76', href: 'tel:+33608356276' },
        { label: 'boisconceptenergies@gmail.com', href: 'mailto:boisconceptenergies@gmail.com?cc=grieumard.xavier82%40gmail.com' },
        { label: 'Showroom Tignol Béton · Nègrepelisse', href: 'https://www.google.com/maps/search/?api=1&query=735%20route%20des%20Combattants%20d%27Indochine%2082800%20N%C3%A8grepelisse' },
        { label: 'Lun–Ven 8h30–18h', text: true },
      ],
    },
  ];

  return (
    <footer style={{ background: 'var(--ink)', color: '#C9C2B3', padding: '64px 32px 32px' }}>
      <div className="bce-footer-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 48 }}>
        <div>
          <img src="../../assets/logo/bce-logo-final-knockout-header.png" alt="Bois Concept Énergies"
               height="80" style={{ display: 'block' }} />
          <p style={{ marginTop: 18, fontSize: 14, lineHeight: 1.7, color: '#C9C2B3', maxWidth: 320 }}>
            Vente, pose et suivi des appareils installés par BCE : poêles à granulés, poêles à bois et inserts dans tout le Tarn-et-Garonne.
          </p>
        </div>
        {footerColumns.map(col => (
          <div key={col.title}>
            <h4 style={{ color: 'var(--bg)', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 18 }}>
              {col.title}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.links.map(l => (
                <li key={l.label}>
                  {l.text ? (
                    <span style={{ color: '#C9C2B3', fontSize: 14 }}>{l.label}</span>
                  ) : (
                    <a href={l.href} style={{ color: '#C9C2B3', fontSize: 14, borderBottom: 'none' }}>{l.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="bce-footer-bottom" style={{
        maxWidth: 1200, margin: '48px auto 0', paddingTop: 24,
        borderTop: '1px solid rgba(232,226,212,0.15)', display: 'flex', justifyContent: 'space-between',
        fontSize: 12, color: '#8A8A85',
      }}>
        <span>© 2026 Bois Concept Énergies · Tous droits réservés</span>
        <span>Certifié RGE Qualibois · SIRET 534 705 348 00017</span>
      </div>
    </footer>
  );
}

window.Realisations = Realisations;
window.ProductCatalogTeaser = ProductCatalogTeaser;
window.Zone = Zone;
window.Contact = Contact;
window.Footer = Footer;

