// ============================================================
// Hero — adds: ambient ember particles, scroll cue, live counter
// ============================================================
function HeroEmbers() {
  // Lightweight ember particle field rising on the right of the hero.
  return (
    <div aria-hidden style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
      maskImage: 'linear-gradient(180deg, transparent, black 20%, black 70%, transparent)',
      WebkitMaskImage: 'linear-gradient(180deg, transparent, black 20%, black 70%, transparent)',
    }}>
      {Array.from({ length: 22 }).map((_, i) => {
        const left = 55 + Math.random() * 40;
        const dur = 6 + Math.random() * 7;
        const delay = -Math.random() * dur;
        const size = 2 + Math.random() * 3;
        const drift = (Math.random() - 0.5) * 60;
        const hue = Math.random() < 0.7 ? '#D9531E' : '#F5C76A';
        return (
          <span key={i} style={{
            position: 'absolute', left: left + '%', bottom: '-10px',
            width: size, height: size, borderRadius: '50%',
            background: hue, boxShadow: `0 0 ${size*3}px ${hue}99`,
            animation: `embRise ${dur}s linear ${delay}s infinite`,
            ['--drift']: drift + 'px',
          }} />
        );
      })}
      <style>{`
        @keyframes embRise {
          0%   { transform: translate(0, 0) scale(0.6);   opacity: 0; }
          15%  { opacity: 0.9; }
          85%  { opacity: 0.6; }
          100% { transform: translate(var(--drift), -110vh) scale(1); opacity: 0; }
        }
        @keyframes scrollCue { 0%,100%{transform:translateY(0);opacity:.4} 50%{transform:translateY(8px);opacity:1} }
        .scroll-cue { animation: scrollCue 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

function ScrollCue() {
  return (
    <div className="scroll-cue" style={{
      position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      color: 'rgba(245,241,234,.7)', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase',
    }}>
      <span>Découvrir</span>
      <Icon name="arrow_down" size={16} />
    </div>
  );
}

// ============================================================
// Process band — 4 numbered steps under Services
// ============================================================
function ProcessBand() {
  const steps = [
    { n: '01', t: 'Visite à domicile', b: 'Gratuite, sans engagement. On regarde le conduit, le volume, l\'usage.' },
    { n: '02', t: 'Devis détaillé', b: 'Appareil, pose, fumisterie, aides. Rien de caché, rien d\'optionnel oublié.' },
    { n: '03', t: 'Pose & mise en service', b: 'Notre équipe, pas un sous-traitant. On déballe, on pose, on nettoie.' },
    { n: '04', t: 'Suivi & entretien', b: 'Pour les appareils installés par BCE, on vous rappelle dans l\'année pour le ramonage. Vous gardez votre certificat.' },
  ];
  return (
    <section data-screen-label="Process" style={{ background: 'var(--anthracite)', color: 'var(--bg)', padding: '96px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 56 }}>
          <div>
            <span className="eyebrow" style={{ color: 'var(--leaf-3)' }}>Comment on travaille</span>
            <h2 style={{ color: 'var(--bg)', marginTop: 14, marginBottom: 0 }}>Quatre étapes, une seule équipe.</h2>
          </div>
          <p style={{ color: '#C9C2B3', maxWidth: 360, margin: 0 }}>
            De la première visite au certificat de ramonage de votre installation BCE, vous avez les mêmes interlocuteurs.
          </p>
        </div>
        <div className="bce-process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative' }}>
          <div aria-hidden style={{ position: 'absolute', top: 24, left: '12.5%', right: '12.5%', height: 1, background: 'rgba(232,226,212,0.18)' }} />
          {steps.map((s, i) => (
            <div key={s.n} style={{ position: 'relative', padding: '0 16px' }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', background: 'var(--anthracite)',
                border: '1px solid var(--leaf-3)', color: 'var(--leaf-3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontSize: 16, marginBottom: 24,
              }}>{s.n}</div>
              <h4 style={{ color: 'var(--bg)', marginBottom: 8 }}>{s.t}</h4>
              <p style={{ color: '#C9C2B3', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SizingTool — interactive heating power picker
// ============================================================
function SizingTool() {
  const [surface, setSurface] = React.useState(80);
  const [insul, setInsul] = React.useState('moyenne'); // bonne / moyenne / faible
  const [type, setType] = React.useState('granules');
  const factor = insul === 'bonne' ? 0.04 : insul === 'moyenne' ? 0.06 : 0.09;
  const kw = Math.round(surface * factor * 10) / 10;
  const reco = type === 'granules'
    ? `Un poêle à granulés de ~${kw} kW, programmable, conviendra à un usage principal.`
    : type === 'bois'
      ? `Un poêle à bois de ~${kw} kW, charges 2–3× par jour. Stockage de bûches à prévoir.`
      : `Un insert d'environ ${kw} kW, à intégrer dans votre cheminée existante.`;

  return (
    <div className="bce-card" style={{
      background: 'var(--surface)', border: '1px solid var(--sand)', borderRadius: 12,
      padding: 32, boxShadow: 'var(--shadow-1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <Icon name="sparkle" size={18} style={{ color: 'var(--leaf)' }} />
        <span className="eyebrow" style={{ color: 'var(--leaf)', margin: 0 }}>Quel poêle pour vous</span>
      </div>
      <h3 style={{ marginBottom: 24 }}>Estimez votre besoin en 30 secondes.</h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-2)' }}>
            Surface à chauffer · <strong style={{ color: 'var(--ink)' }}>{surface} m²</strong>
          </label>
          <input type="range" min={20} max={200} step={5} value={surface}
            onChange={(e) => setSurface(+e.target.value)}
            style={{ width: '100%', accentColor: 'var(--leaf)', marginTop: 12 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--fg-3)' }}>
            <span>20 m²</span><span>200 m²</span>
          </div>
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-2)', display: 'block', marginBottom: 8 }}>
            Isolation
          </label>
          <div style={{ display: 'flex', gap: 6 }}>
            {['bonne', 'moyenne', 'faible'].map(k => (
              <button key={k} onClick={() => setInsul(k)} style={{
                flex: 1, padding: '10px 8px', borderRadius: 4, fontSize: 13, fontWeight: 600,
                fontFamily: 'var(--font-body)', cursor: 'pointer',
                background: insul === k ? 'var(--ink)' : 'transparent',
                color: insul === k ? 'var(--bg)' : 'var(--fg-2)',
                border: insul === k ? '1px solid var(--ink)' : '1px solid var(--sand)',
                textTransform: 'capitalize', transition: 'all 200ms var(--ease)',
              }}>{k}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-2)', display: 'block', marginBottom: 8 }}>
          Type d'appareil envisagé
        </label>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { k: 'granules', l: 'Granulés' },
            { k: 'bois', l: 'Bois' },
            { k: 'insert', l: 'Insert' },
          ].map(o => (
            <button key={o.k} onClick={() => setType(o.k)} style={{
              flex: 1, padding: '10px 8px', borderRadius: 4, fontSize: 13, fontWeight: 600,
              fontFamily: 'var(--font-body)', cursor: 'pointer',
              background: type === o.k ? 'var(--leaf)' : 'transparent',
              color: type === o.k ? 'var(--bg)' : 'var(--fg-2)',
              border: type === o.k ? '1px solid var(--leaf)' : '1px solid var(--sand)',
              transition: 'all 200ms var(--ease)',
            }}>{o.l}</button>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: 28, padding: '20px 24px', background: 'var(--bg)', border: '1px solid var(--sand)',
        borderLeft: '3px solid var(--leaf)', borderRadius: 4,
        display: 'flex', alignItems: 'flex-start', gap: 14,
      }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 36, lineHeight: 1, color: 'var(--ink)',
          minWidth: 90,
        }}>
          {kw}<span style={{ fontSize: 18, color: 'var(--fg-3)', marginLeft: 4 }}>kW</span>
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '.12em', fontWeight: 600 }}>Recommandation indicative</div>
          <p style={{ margin: '4px 0 0', fontSize: 15, color: 'var(--fg-1)', lineHeight: 1.5 }}>{reco}</p>
        </div>
      </div>
      <p style={{ fontSize: 12, color: 'var(--fg-3)', margin: '12px 0 0' }}>
        Estimation rapide. Le dimensionnement final dépend de votre conduit, de votre exposition et de votre usage.
      </p>
    </div>
  );
}

// ============================================================
// Counter — animated count up when scrolled into view
// ============================================================
function Counter({ end, suffix = '', duration = 1400, format = (n) => n }) {
  const [val, setVal] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    let raf;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(end * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => { obs.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [end, duration]);
  return <span ref={ref}>{format(val)}{suffix}</span>;
}

// ============================================================
// BeforeAfter — drag-to-reveal slider
// ============================================================
function BeforeAfter({ before, after, labelBefore = 'Avant', labelAfter = 'Après' }) {
  const [pct, setPct] = React.useState(50);
  const ref = React.useRef(null);
  const dragging = React.useRef(false);

  const move = (clientX) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
    setPct(p);
  };

  React.useEffect(() => {
    const up = () => dragging.current = false;
    const mv = (e) => { if (dragging.current) move(e.clientX); };
    const tmv = (e) => { if (dragging.current && e.touches[0]) move(e.touches[0].clientX); };
    window.addEventListener('mouseup', up);
    window.addEventListener('mousemove', mv);
    window.addEventListener('touchend', up);
    window.addEventListener('touchmove', tmv);
    return () => {
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mousemove', mv);
      window.removeEventListener('touchend', up);
      window.removeEventListener('touchmove', tmv);
    };
  }, []);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPct(p => Math.max(0, p - 5));
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPct(p => Math.min(100, p + 5));
    }
    if (e.key === 'Home') {
      e.preventDefault();
      setPct(0);
    }
    if (e.key === 'End') {
      e.preventDefault();
      setPct(100);
    }
  };

  return (
    <div ref={ref} className="bce-before-after"
      role="slider" tabIndex={0} aria-label="Comparateur avant après"
      aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)}
      onKeyDown={onKeyDown}
      onMouseDown={(e) => { dragging.current = true; move(e.clientX); }}
      onTouchStart={(e) => { dragging.current = true; if (e.touches[0]) move(e.touches[0].clientX); }}
      style={{
        position: 'relative', aspectRatio: '16/10', borderRadius: 8, overflow: 'hidden',
        cursor: 'ew-resize', userSelect: 'none', touchAction: 'none',
        background: 'var(--anthracite)',
      }}>
      <img src={after} alt={labelAfter} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
      <img src={before} alt={labelBefore} loading="lazy"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', clipPath: `inset(0 ${100 - pct}% 0 0)` }} />
      {/* labels */}
      <span style={{ position: 'absolute', top: 16, left: 16, padding: '6px 12px', background: 'rgba(20,20,20,.65)', color: 'var(--bg)', fontSize: 11, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', borderRadius: 999 }}>{labelBefore}</span>
      <span style={{ position: 'absolute', top: 16, right: 16, padding: '6px 12px', background: 'rgba(70,130,27,.85)', color: 'var(--bg)', fontSize: 11, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', borderRadius: 999 }}>{labelAfter}</span>
      {/* divider */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: pct + '%', width: 2, background: 'var(--bg)', boxShadow: '0 0 0 1px rgba(20,20,20,.3)', transform: 'translateX(-1px)' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 44, height: 44, borderRadius: '50%', background: 'var(--bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,.4)', color: 'var(--ink)',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="13 18 19 12 13 6"/><polyline points="11 6 5 12 11 18"/></svg>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// DeptMap — Tarn-et-Garonne SVG with clickable communes
// ============================================================
function DeptMap() {
  // Approximate positions of key communes inside a more map-like Tarn-et-Garonne outline.
  const communes = [
    { id: 'neg', name: 'Nègrepelisse', x: 61, y: 55, base: true, drive: 'Atelier', align: 'start' },
    { id: 'mtb', name: 'Montauban', x: 49, y: 61, drive: '15 min', align: 'end' },
    { id: 'cau', name: 'Caussade', x: 61, y: 39, drive: '20 min', align: 'start' },
    { id: 'mss', name: 'Moissac', x: 28, y: 51, drive: '35 min', align: 'end' },
    { id: 'cst', name: 'Castelsarrasin', x: 29, y: 61, drive: '40 min', align: 'end' },
    { id: 'laf', name: 'Lafrançaise', x: 41, y: 51, drive: '20 min', align: 'end' },
    { id: 'vst', name: 'Villemur-sur-Tarn', x: 58, y: 68, drive: '35 min', align: 'start' },
    { id: 'san', name: 'St-Antonin', x: 79, y: 31, drive: '35 min', align: 'start' },
    { id: 'bru', name: 'Bruniquel', x: 73, y: 48, drive: '25 min', align: 'start' },
    { id: 'cay', name: 'Caylus', x: 73, y: 22, drive: '40 min', align: 'start' },
  ];
  const [hover, setHover] = React.useState('neg');
  const cur = communes.find(c => c.id === hover) || communes[0];
  const labelX = (c) => c.align === 'end' ? c.x - 2.2 : c.x + 2.2;
  const anchor = (c) => c.align === 'end' ? 'end' : 'start';

  return (
    <div className="bce-map-card" style={{
      background: 'var(--bg)', border: '1px solid var(--sand)', borderRadius: 12,
      overflow: 'hidden', boxShadow: 'var(--shadow-1)',
    }}>
      <div style={{ position: 'relative', aspectRatio: '4/3', background: '#EFE8DA' }}>
        <svg viewBox="0 0 100 75" style={{ width: '100%', height: '100%', display: 'block' }}>
          <defs>
            <pattern id="dept-grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(20,20,20,0.045)" strokeWidth="0.35" />
            </pattern>
            <filter id="soft-map-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1.2" stdDeviation="1.4" floodColor="#141414" floodOpacity="0.12" />
            </filter>
          </defs>

          <rect width="100" height="75" fill="#F5F1EA" />
          <rect width="100" height="75" fill="url(#dept-grid)" />

          <path d="M 11 38 L 14 28 L 23 21 L 36 17 L 49 18 L 57 12 L 70 13 L 81 19 L 89 30 L 87 42 L 91 51 L 84 63 L 70 68 L 55 66 L 44 70 L 29 66 L 17 58 L 10 48 Z"
            fill="#E6DDCC" stroke="var(--stone)" strokeWidth="0.7" filter="url(#soft-map-shadow)" />

          <path d="M 18 23 L 28 31 L 38 33 L 49 30 L 62 31 L 76 24 L 86 31" fill="none" stroke="#D5C7B2" strokeWidth="0.6" strokeDasharray="1.8 1.4" />
          <path d="M 13 48 C 24 45 32 47 40 51 C 48 55 60 57 75 50 C 81 47 86 47 90 50" fill="none" stroke="#A9C6C8" strokeWidth="1.6" opacity="0.85" />
          <path d="M 18 58 C 32 55 44 57 54 61 C 64 65 76 62 84 55" fill="none" stroke="#BBD2D0" strokeWidth="0.75" opacity="0.8" />

          <path d="M 29 61 L 49 61 L 61 55 L 73 48" fill="none" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.95" />
          <path d="M 28 51 L 41 51 L 49 61 L 61 39 L 73 22" fill="none" stroke="#FFFFFF" strokeWidth="1.1" opacity="0.9" />
          <path d="M 61 55 L 61 39 L 79 31" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.85" />

          <path d="M 29 61 L 49 61 L 61 55 L 73 48" fill="none" stroke="var(--leaf)" strokeWidth="0.28" opacity="0.5" />
          <path d="M 28 51 L 41 51 L 49 61 L 61 39 L 73 22" fill="none" stroke="var(--ash)" strokeWidth="0.24" opacity="0.45" />

          <g opacity="0.55" fontFamily="var(--font-body)" fontSize="2.2" fontWeight="700" fill="var(--stone)">
            <text x="18" y="18">LOT</text>
            <text x="83" y="17">AVEYRON</text>
            <text x="8" y="66">GERS</text>
            <text x="68" y="72">HAUTE-GARONNE</text>
          </g>

          {communes.map(c => {
            const active = c.id === hover;
            return (
              <g key={c.id}
                onMouseEnter={() => setHover(c.id)}
                style={{ cursor: 'pointer' }}>
                {c.base && <circle cx={c.x} cy={c.y} r="3.4" fill="rgba(70,130,27,0.12)" stroke="var(--leaf)" strokeWidth="0.45">
                  <animate attributeName="r" values="3.4;6.4;3.4" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0.15;0.9" dur="2.4s" repeatCount="indefinite" />
                </circle>}
                <line x1={c.x} y1={c.y} x2={labelX(c)} y2={c.y - 1.8}
                  stroke={active ? 'var(--ink)' : 'rgba(20,20,20,0.28)'} strokeWidth="0.22" />
                <circle cx={c.x} cy={c.y} r={active ? 1.75 : 1.25}
                  fill={c.base ? 'var(--leaf)' : (active ? 'var(--ink)' : 'var(--ash)')}
                  stroke="var(--bg)" strokeWidth="0.5"
                  style={{ transition: 'all 200ms var(--ease)' }} />
                <text x={labelX(c)} y={c.y - 2.6} textAnchor={anchor(c)}
                  fontSize={active || c.base ? '2.35' : '2.05'} fontWeight={active || c.base ? 700 : 600}
                  fill={active || c.base ? 'var(--ink)' : 'var(--fg-2)'}
                  style={{ fontFamily: 'var(--font-body)', transition: 'all 200ms var(--ease)' }}>
                  {c.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="bce-map-meta" style={{
        background: 'var(--surface)', borderTop: '1px solid var(--sand)',
        padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
      }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--fg-3)', letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 600 }}>
            {cur.base ? 'Atelier BCE' : 'Depuis Nègrepelisse'}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ink)', marginTop: 2 }}>{cur.name}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--leaf)', fontSize: 14, fontWeight: 600 }}>
          <Icon name="truck" size={18} /> {cur.drive}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FAQ — accordion
// ============================================================
function FAQ() {
  const items = [
    { q: 'Combien coûte une installation complète ?',
      a: 'Très variable selon l\'appareil et la fumisterie. Comptez 4 000–9 000 € posé pour un poêle à granulés, 3 500–7 500 € pour un poêle à bois. Le devis est gratuit et détaille chaque poste.' },
    { q: 'Suis-je éligible à MaPrimeRénov\' ?',
      a: 'La plupart de nos clients le sont. Étant certifiés RGE Qualibois, nous vous accompagnons dans le montage du dossier — sans surfacturer ce service.' },
    { q: 'Quel délai entre le devis et la pose ?',
      a: 'En moyenne 4 à 8 semaines, selon la saison et la disponibilité de l\'appareil choisi. Hors période de chauffe, c\'est plus rapide.' },
    { q: 'Vous occupez-vous du conduit de fumée ?',
      a: 'Oui — création, tubage, sortie de toit. Nous traitons l\'ensemble de la fumisterie aux normes DTU 24.1.' },
    { q: 'Et l\'entretien après la pose ?',
      a: 'Un ramonage par an minimum est obligatoire. Les contrats annuels et les rappels de rendez-vous concernent uniquement les appareils installés par BCE.' },
  ];
  const [open, setOpen] = React.useState(0);

  return (
    <section data-screen-label="FAQ" style={{ background: 'var(--bg)', padding: '128px 32px', borderTop: '1px solid var(--sand)' }}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <span className="eyebrow">Questions fréquentes</span>
          <h2 style={{ marginTop: 14 }}>Les questions qu'on nous pose souvent.</h2>
        </div>
        <div style={{ borderTop: '1px solid var(--sand)' }}>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ borderBottom: '1px solid var(--sand)' }}>
                <button aria-expanded={isOpen} aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)} style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '24px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                  fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--ink)', fontWeight: 400,
                }}>
                  <span style={{ paddingRight: 16 }}>{it.q}</span>
                  <span style={{
                    width: 32, height: 32, borderRadius: '50%',
                    border: '1px solid var(--sand)', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isOpen ? 'var(--ink)' : 'transparent',
                    color: isOpen ? 'var(--bg)' : 'var(--ink)',
                    transition: 'all 200ms var(--ease)',
                  }}>
                    <Icon name={isOpen ? 'minus' : 'plus'} size={16} />
                  </span>
                </button>
                <div id={`faq-panel-${i}`} style={{
                  maxHeight: isOpen ? 200 : 0, overflow: 'hidden',
                  transition: 'max-height 320ms var(--ease)',
                }}>
                  <p style={{ paddingBottom: 24, margin: 0, color: 'var(--fg-2)', fontSize: 16, lineHeight: 1.7, maxWidth: 680 }}>
                    {it.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Marquee strip - partner brands
function PartnersStrip() {
  const brands = [
    { name: 'Lasian', src: '../../assets/brands/lasian.png' },
    { name: 'Fondis', src: '../../assets/brands/fondis.png' },
    { name: 'Kunst', src: '../../assets/brands/kunst.png' },
    { name: 'TermaTech', src: '../../assets/brands/termatech.png' },
    { name: 'CMG Fire Attitude', src: '../../assets/brands/cmg.png' },
  ];

  return (
    <div style={{
      background: 'var(--surface)',
      borderTop: '1px solid var(--sand)',
      borderBottom: '1px solid var(--sand)',
      padding: '22px 0',
      overflow: 'hidden',
    }}>
      <div className="brand-marquee">
        {[...brands, ...brands, ...brands].map((b, i) => (
          <span className="brand-marquee__item" key={`${b.name}-${i}`}>
            <img src={b.src} alt={b.name} loading="lazy" />
          </span>
        ))}
      </div>
      <style>{`
        .brand-marquee {
          display: flex;
          align-items: center;
          gap: 54px;
          width: max-content;
          white-space: nowrap;
          animation: marq 34s linear infinite;
        }
        .brand-marquee__item {
          width: 190px;
          height: 62px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }
        .brand-marquee__item img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }
        @media (max-width: 700px) {
          .brand-marquee {
            gap: 34px;
          }
          .brand-marquee__item {
            width: 150px;
            height: 54px;
          }
        }
        @keyframes marq { 0%{transform:translateX(0)} 100%{transform:translateX(-33.33%)} }
      `}</style>
    </div>
  );
}

function PromoMarquee() {
  const promos = [
    'Grosses promos à venir',
    'Modèles en déstockage bientôt disponibles',
    'Offres limitées sur appareils sélectionnés',
    'Demandez votre devis personnalisé',
  ];

  return (
    <section aria-label="Promotions en cours" className="bce-promo-marquee-wrap">
      <div className="bce-promo-marquee-shell">
        <div className="bce-promo-marquee">
          {[...promos, ...promos, ...promos].map((promo, i) => (
            <span className="bce-promo-marquee__item" key={`${promo}-${i}`}>
              <strong>{promo}</strong>
              <em>Voir avec BCE</em>
            </span>
          ))}
        </div>
      </div>
      <style>{`
        .bce-promo-marquee-wrap {
          position: relative;
          background: var(--bg);
          padding: 18px var(--gutter) 24px;
          overflow: hidden;
        }
        .bce-promo-marquee-shell {
          position: relative;
          overflow: hidden;
          max-width: var(--container-wide);
          margin: 0 auto;
          background: var(--ink);
          border: 1px solid rgba(20,20,20,0.2);
          border-radius: var(--radius-md);
          padding: 14px 0;
          box-shadow: 0 18px 38px -30px rgba(20,20,20,0.45);
        }
        .bce-promo-marquee-shell::before,
        .bce-promo-marquee-shell::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 110px;
          z-index: 2;
          pointer-events: none;
        }
        .bce-promo-marquee-shell::before {
          left: 0;
          background: linear-gradient(90deg, var(--ink), rgba(20,20,20,0));
        }
        .bce-promo-marquee-shell::after {
          right: 0;
          background: linear-gradient(270deg, var(--ink), rgba(20,20,20,0));
        }
        .bce-promo-marquee {
          display: flex;
          align-items: center;
          gap: 18px;
          width: max-content;
          white-space: nowrap;
          animation: promoMarq 26s linear infinite;
        }
        .bce-promo-marquee__item {
          min-height: 58px;
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 0 24px;
          border: 1px solid rgba(245,241,234,0.18);
          border-radius: var(--radius-sm);
          background:
            linear-gradient(135deg, rgba(70,130,27,0.95), rgba(53,100,22,0.88)),
            var(--leaf);
          color: var(--bg);
          box-shadow: 0 14px 32px -24px rgba(127,181,57,0.8);
        }
        .bce-promo-marquee__item strong {
          font-family: var(--font-display);
          font-size: 25px;
          font-weight: 400;
          line-height: 1;
          letter-spacing: 0;
        }
        .bce-promo-marquee__item em {
          display: inline-flex;
          align-items: center;
          min-height: 30px;
          padding: 0 10px;
          border-radius: var(--radius-pill);
          background: rgba(20,20,20,0.26);
          color: var(--bg);
          font-style: normal;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
        }
        @media (max-width: 700px) {
          .bce-promo-marquee-wrap {
            padding: 14px 16px 20px;
          }
          .bce-promo-marquee-shell {
            border-radius: var(--radius-sm);
            padding: 12px 0;
          }
          .bce-promo-marquee {
            gap: 12px;
          }
          .bce-promo-marquee__item {
            min-height: 50px;
            padding: 0 18px;
            gap: 12px;
          }
          .bce-promo-marquee__item strong {
            font-size: 20px;
          }
          .bce-promo-marquee__item em {
            display: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .bce-promo-marquee {
            animation: none;
          }
        }
        @keyframes promoMarq { 0%{transform:translateX(0)} 100%{transform:translateX(-33.33%)} }
      `}</style>
    </section>
  );
}

window.HeroEmbers = HeroEmbers;
window.ScrollCue = ScrollCue;
window.ProcessBand = ProcessBand;
window.SizingTool = SizingTool;
window.Counter = Counter;
window.BeforeAfter = BeforeAfter;
window.DeptMap = DeptMap;
window.FAQ = FAQ;
window.PartnersStrip = PartnersStrip;
window.PromoMarquee = PromoMarquee;
