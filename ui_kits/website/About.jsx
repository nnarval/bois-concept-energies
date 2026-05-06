function About() {
  return (
    <section id="about" data-screen-label="04 About" style={{ background: 'var(--anthracite)', color: 'var(--bg)', padding: '128px 32px', position: 'relative', overflow: 'hidden' }}>
      {/* watermark monogram */}
      <span aria-hidden style={{
        position: 'absolute', top: '-40px', right: '-40px',
        fontFamily: 'var(--font-display)', fontSize: 480, lineHeight: 1,
        color: '#1a1a1a', userSelect: 'none', pointerEvents: 'none',
      }}>BCE</span>
      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 96, alignItems: 'center' }}>
        <div>
          <span className="eyebrow" style={{ color: 'var(--leaf-3)' }}>À propos</span>
          <h2 style={{ color: 'var(--bg)', marginTop: 14 }}>Un atelier, une équipe, un métier.</h2>
          <p style={{ color: '#C9C2B3', fontSize: 17, lineHeight: 1.7, maxWidth: 520 }}>
            Bois Concept Énergies est implantée à Nègrepelisse et accompagne les particuliers dans tout le Tarn-et-Garonne.
          </p>
          <p style={{ color: '#C9C2B3', fontSize: 17, lineHeight: 1.7, maxWidth: 520 }}>
            Nous vous proposons un service complet : conseil personnalisé, vente, installation et suivi de vos équipements. Notre objectif est de vous offrir des solutions fiables, performantes et parfaitement adaptées à vos besoins.
          </p>
          <p style={{ color: '#C9C2B3', fontSize: 17, lineHeight: 1.7, maxWidth: 520 }}>
            Plutôt que de proposer l'ensemble des marques du marché, nous avons fait le choix de travailler avec une sélection rigoureuse de fabricants. Nous privilégions des équipements que nous maîtrisons parfaitement, afin de garantir une installation de qualité, un entretien efficace et une intervention rapide en cas de besoin.
          </p>
          <p style={{ color: '#C9C2B3', fontSize: 17, lineHeight: 1.7, maxWidth: 520 }}>
            Avec Bois Concept Énergies, vous bénéficiez d'un interlocuteur de confiance, engagé à vos côtés sur le long terme.
          </p>
          <p style={{ color: '#C9C2B3', fontSize: 17, lineHeight: 1.7, maxWidth: 520 }}>
            Nous prenons en charge votre projet de A à Z : visite sur place, conseils sur le choix de l'appareil, installation certifiée et entretien régulier pour que votre chauffage reste performant année après année.
          </p>
          <div className="about-tignol-card" style={{
            marginTop: 30,
            maxWidth: 520,
            border: '1px solid rgba(245,241,234,0.16)',
            background: 'rgba(245,241,234,0.06)',
            padding: 22,
            display: 'grid',
            gridTemplateColumns: '138px 1fr',
            gap: 22,
            alignItems: 'center',
          }}>
            <a href="https://www.tignol.fr/" target="_blank" rel="noreferrer" aria-label="Visiter le site Tignol Bétons Matériaux" style={{
              background: 'var(--bg)',
              borderRadius: 4,
              minHeight: 74,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 14,
              borderBottom: 'none',
            }}>
              <img src="../../assets/brands/tignol-betons.png" alt="Tignol Bétons Matériaux" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </a>
            <div>
              <p style={{ color: 'var(--bg)', fontSize: 15, lineHeight: 1.55, margin: 0 }}>
                BCE est associée à Tignol Béton depuis 6 ans dans le secteur du chauffage bois et granulés.
              </p>
              <p style={{ color: '#C9C2B3', fontSize: 13, lineHeight: 1.55, margin: '8px 0 0' }}>
                Showroom chez Tignol Béton, 735 route des Combattants d'Indochine, 82800 Nègrepelisse.
              </p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 48, marginTop: 48, justifyContent: 'start' }}>
            {[
              { v: 15, suffix: '', label: "années d'expérience" },
              { v: 800, suffix: '+', label: 'poses réalisées' },
              { v: 0, suffix: '', label: 'sous-traitance', custom: '0' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, lineHeight: 1, color: 'var(--bg)' }}>
                  {s.custom ? s.custom : <Counter end={s.v} suffix={s.suffix} />}
                </div>
                <div style={{ fontSize: 13, color: '#C9C2B3', marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <figure style={{ margin: 0 }}>
          <Icon name="quote" size={36} style={{ color: 'var(--leaf-3)' }} />
          <blockquote className="quote" style={{
            color: 'var(--bg)', margin: '20px 0 24px', fontSize: 30, lineHeight: 1.35,
            fontFamily: 'var(--font-display)', fontWeight: 400,
          }}>
            « Un travail propre, un installateur qui prend le temps d'expliquer comment ça marche.
            On les a rappelés trois ans plus tard pour l'entretien de leur installation posée par BCE — toujours la même équipe. »
          </blockquote>
          <figcaption style={{ color: '#C9C2B3', fontSize: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{
              width: 44, height: 44, borderRadius: '50%', background: 'var(--leaf)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--bg)', fontFamily: 'var(--font-display)', fontSize: 18,
            }}>SM</span>
            <span><strong style={{ color: 'var(--bg)', fontWeight: 600 }}>Sophie M.</strong> · cliente, Montauban</span>
            <span style={{ marginLeft: 'auto', display: 'flex', gap: 2, color: '#F5C76A' }}>
              {Array.from({length:5}).map((_,i)=> <Icon key={i} name="star" size={14} />)}
            </span>
          </figcaption>
        </figure>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .about-tignol-card {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .about-tignol-card > div:first-child {
            max-width: 180px;
          }
        }
      `}</style>
    </section>
  );
}

window.About = About;
