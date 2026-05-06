function Equipment() {
  const tabs = [
    { k: 'granules', tag: '01 · Granulés', label: 'Poêle à granulés',
      photo: '../../assets/photography/catalogue-poele-granules.png',
      body: "Programmable, autonome, économique sur la durée. Un bon choix pour un chauffage principal ou pour changer de mode d’énergie par un combustible économique et durable.",
      bullets: [
        { i: 'clock', t: 'Programmable', d: 'Démarre tout seul le matin.' },
        { i: 'leaf', t: 'Rendement >90%', d: 'Faible consommation, peu de cendres.' },
        { i: 'shield', t: 'Sécurité', d: 'Coupure auto en cas d\'incident.' },
      ] },
    { k: 'bois', tag: '02 · Bois', label: 'Poêle à bois',
      photo: '../../assets/photography/catalogue-poele-bois.png',
      body: "L'authenticité de la flamme, la simplicité de la bûche. Idéal pour les maisons disposant d'un espace de stockage et d'une bonne isolation.",
      bullets: [
        { i: 'flame', t: 'Vraie flamme', d: 'Crépitement et chaleur radiante.' },
        { i: 'home', t: 'Indépendant', d: 'Aucune électricité requise.' },
        { i: 'hand', t: 'Geste simple', d: 'Une charge de bûches matin et soir.' },
      ] },
    { k: 'insert-bois', tag: '03 · Insert bois', label: 'Insert bois',
      photo: '../../assets/photography/catalogue-insert-bois.png',
      body: "Transformer une cheminée ouverte en foyer fermé performant, avec la chaleur naturelle de la bûche. Une solution idéale pour conserver le charme de l'existant tout en gagnant en rendement.",
      bullets: [
        { i: 'eye', t: 'Habillage sur-mesure', d: 'Pierre, métal, plâtre — au choix.' },
        { i: 'wrench', t: 'Conduit existant', d: 'Tubage et raccordement aux normes.' },
        { i: 'flame', t: 'Flamme bois', d: 'Chaleur radiante et vraie bûche.' },
      ] },
    { k: 'insert-granules', tag: '04 · Insert granulés', label: 'Insert granulés',
      photo: '../../assets/photography/catalogue-insert-granules.png',
      body: "Moderniser une cheminée existante avec un insert programmable, plus autonome et plus régulier. Un bon compromis pour profiter d'une flamme maîtrisée sans chargement fréquent.",
      bullets: [
        { i: 'clock', t: 'Programmable', d: 'Plages horaires selon vos habitudes.' },
        { i: 'leaf', t: 'Combustible économique', d: 'Granulés réguliers et rendement élevé.' },
        { i: 'sparkle', t: 'Cheminée modernisée', d: 'Confort actuel, foyer existant valorisé.' },
      ] },
  ];
  const [active, setActive] = React.useState('granules');
  const cur = tabs.find(t => t.k === active);

  return (
    <section id="equipements" data-screen-label="03 Equipements" style={{ background: 'var(--surface)', padding: '128px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow">Nos équipements</span>
            <h2 style={{ marginTop: 14, marginBottom: 0 }}>Quatre familles, chacune avec ses usages.</h2>
          </div>
          <div className="bce-equipment-tabs" role="tablist" aria-label="Familles d'équipements"
            style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--bg)', borderRadius: 999, border: '1px solid var(--sand)' }}>
            {tabs.map(t => (
              <button key={t.k} role="tab" aria-selected={active === t.k}
                onClick={() => setActive(t.k)} style={{
                padding: '10px 18px', borderRadius: 999, fontSize: 14, fontWeight: 600,
                fontFamily: 'var(--font-body)', cursor: 'pointer', border: 'none',
                background: active === t.k ? 'var(--ink)' : 'transparent',
                color: active === t.k ? 'var(--bg)' : 'var(--fg-2)',
                whiteSpace: 'nowrap', minWidth: 92,
                transition: 'all 200ms var(--ease)',
              }}>{t.label}</button>
            ))}
          </div>
        </div>

        <article key={cur.k} style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center',
          animation: 'eqFade 380ms var(--ease)',
        }}>
          <div style={{ aspectRatio: '4/5', borderRadius: 12, overflow: 'hidden' }}>
            <img src={cur.photo} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div>
            <span className="eyebrow">{cur.tag}</span>
            <h3 style={{ marginTop: 14, marginBottom: 18, fontFamily: 'var(--font-display)', fontSize: 40, lineHeight: 1.15 }}>{cur.label}</h3>
            <p style={{ color: 'var(--fg-2)', fontSize: 17, lineHeight: 1.7, marginBottom: 28 }}>{cur.body}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 16 }}>
              {cur.bullets.map((b, i) => (
                <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{
                    width: 36, height: 36, borderRadius: 8, background: 'var(--bg)',
                    border: '1px solid var(--sand)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--leaf)', flexShrink: 0,
                  }}><Icon name={b.i} size={18} /></span>
                  <span>
                    <strong style={{ color: 'var(--ink)', fontWeight: 600, display: 'block', fontSize: 15 }}>{b.t}</strong>
                    <span style={{ color: 'var(--fg-3)', fontSize: 14 }}>{b.d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <div style={{ marginTop: 96 }}>
          <SizingTool />
        </div>
      </div>
      <style>{`@keyframes eqFade { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }`}</style>
    </section>
  );
}

window.Equipment = Equipment;
