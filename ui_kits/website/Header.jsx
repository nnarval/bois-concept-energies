// Header — sticky, transparent on hero, cream-blur after scroll.
function Header({ active = 'accueil', onNavigate }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'produits', label: 'Produits', href: 'nos-produits.html' },
    { id: 'services', label: 'Services' },
    { id: 'equipements', label: 'Équipements' },
    { id: 'about', label: 'À propos' },
    { id: 'realisations', label: 'Réalisations' },
    { id: 'zone', label: 'Zone d\u2019intervention' },
  ];

  const onLight = scrolled;
  const txt = onLight ? 'var(--ink)' : 'var(--bg)';
  const logoSrc = onLight
    ? '../../assets/logo/bce-logo-final-header.png'
    : '../../assets/logo/bce-logo-final-knockout-header.png';
  const navigate = (id) => {
    setMobileOpen(false);
    onNavigate?.(id);
  };

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(245,241,234,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--sand)' : '1px solid transparent',
      transition: 'all 240ms var(--ease)',
    }}>
      <div style={{
        maxWidth: 1440, margin: '0 auto',
        padding: scrolled ? '12px 32px' : '20px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'padding 240ms var(--ease)',
      }}>
        <a href="#accueil" aria-label="Retour à l'accueil" title="Retour à l'accueil"
           onClick={(e) => { e.preventDefault(); navigate('accueil'); }}
           style={{ display: 'flex', alignItems: 'center', borderBottom: 'none', cursor: 'pointer' }}>
          <img src={logoSrc} alt="Bois Concept Énergies"
               height={scrolled ? 89 : 107}
               width={scrolled ? 135 : 153}
               style={{ display: 'block', objectFit: 'contain', objectPosition: 'left center', transition: 'all 240ms var(--ease)' }} />
        </a>
        <nav className="primary-nav" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {items.map(it => (
            <a key={it.id} href={it.href || `#${it.id}`}
               onClick={(e) => {
                 if (it.href) return;
                 e.preventDefault();
                 navigate(it.id);
               }}
               style={{
                 color: txt, fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500,
                 borderBottom: active === it.id ? '1px solid currentColor' : '1px solid transparent',
                 paddingBottom: 2, letterSpacing: '0.01em',
               }}>
              {it.label}
            </a>
          ))}
          <a href="#contact" onClick={(e) => { e.preventDefault(); navigate('contact'); }}
             style={{
               background: onLight ? 'var(--ink)' : 'var(--bg)',
               color: onLight ? 'var(--bg)' : 'var(--ink)',
               padding: '10px 18px', borderRadius: 4, fontWeight: 600, fontSize: 14,
               border: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
             }}>
            <Icon name="phone" size={16} /> Nous contacter
          </a>
        </nav>
        <button className="bce-mobile-toggle" type="button" aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(open => !open)}
          style={{
            background: scrolled ? 'var(--ink)' : 'rgba(20,20,20,0.35)',
            color: 'var(--bg)',
            border: scrolled ? '1px solid var(--ink)' : '1px solid rgba(245,241,234,0.4)',
          }}>
          <Icon name={mobileOpen ? 'x' : 'menu'} size={20} />
        </button>
      </div>
      {mobileOpen && (
        <nav className="bce-mobile-panel" aria-label="Navigation mobile">
          {items.map(it => (
            <a key={it.id} href={it.href || `#${it.id}`}
              aria-current={active === it.id ? 'page' : undefined}
              onClick={(e) => {
                if (it.href) return;
                e.preventDefault();
                navigate(it.id);
              }}>
              {it.label}
            </a>
          ))}
          <a href="#contact"
            aria-current={active === 'contact' ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault();
              navigate('contact');
            }}>
            Nous contacter
          </a>
        </nav>
      )}
    </header>
  );
}

window.Header = Header;

