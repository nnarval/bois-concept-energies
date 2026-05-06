// Hero — full-bleed real photography, dark overlay, copy left.
function Hero({ onCta }) {
  return (
    <section id="accueil" data-screen-label="01 Hero" style={{ position: 'relative', minHeight: 760, color: 'var(--bg)', overflow: 'hidden' }}>
      <img src="../../assets/photography/hero-poele-flamme.png" alt=""
           fetchPriority="high"
           style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(105deg, rgba(20,20,20,0.78) 0%, rgba(20,20,20,0.55) 45%, rgba(20,20,20,0.15) 100%)',
      }} />
      <div aria-hidden style={{
        position: 'absolute', inset: 'auto 0 0 0', height: 200,
        background: 'linear-gradient(180deg, transparent, rgba(20,20,20,0.6))',
      }} />
      <HeroEmbers />
      <div className="bce-hero-layout" style={{
        position: 'relative', maxWidth: 1440, margin: '0 auto',
        padding: '180px 32px 140px', display: 'grid',
        gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'end', minHeight: 760,
      }}>
        <div>
          <span className="eyebrow" style={{ color: 'var(--leaf-3)' }}>Artisan installateur · Nègrepelisse · Tarn-et-Garonne</span>
          <h1 style={{ color: 'var(--bg)', marginTop: 18, marginBottom: 24, maxWidth: 18 + 'ch' }}>
            La chaleur d'un vrai foyer,<br/> installée avec soin chez vous.
          </h1>
          <p className="lead" style={{ color: '#E8E2D4', maxWidth: 540 }}>
            Bois Concept Énergies vend, pose et assure le suivi des appareils installés par BCE :
            poêles à granulés, poêles à bois et inserts dans tout le Tarn-et-Garonne.
          </p>
          <div className="bce-hero-actions" style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap' }}>
            <button className="bce-button" onClick={() => onCta?.('contact')} style={{
              background: 'var(--bg)', color: 'var(--ink)', border: 'none',
              padding: '14px 24px',
              boxShadow: '0 10px 24px rgba(20,20,20,0.18)',
            }}>
              Nous contacter <Icon name="arrow-right" size={16} />
            </button>
            <button className="bce-button" onClick={() => onCta?.('realisations')} style={{
              background: 'transparent', color: 'var(--bg)',
              border: '1px solid rgba(245,241,234,0.48)', padding: '14px 24px',
              backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            }}>
              Voir nos réalisations
            </button>
          </div>
        </div>
        <div className="bce-hero-cert" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', transform: 'translate(18px, 28px)' }}>
          <div className="bce-hero-cert-card" style={{
            background: 'rgba(20,20,20,0.45)', border: '1px solid rgba(232,226,212,0.18)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            padding: '18px 18px 20px', borderRadius: 8, width: 266,
          }}>
            <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'flex-start' }}>
              <img src="../../assets/certifications/logo-rge-officiel.png"
                   alt="RGE - Reconnu Garant Environnement"
                   className="bce-hero-rge-logo"
                   style={{
                     width: 196,
                     display: 'block',
                   }} />
            </div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#E8E2D4', maxWidth: 226 }}>
              Vos travaux peuvent être éligibles à MaPrimeRénov' et aux aides de l'État.
            </p>
          </div>
        </div>
      </div>
      <ScrollCue />
    </section>
  );
}

window.Hero = Hero;
