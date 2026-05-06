function ServiceCard({ icon, title, body }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article className="bce-card"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--surface)', border: '1px solid var(--sand)',
        borderRadius: 8, padding: 32,
        boxShadow: hover ? 'var(--shadow-2)' : 'var(--shadow-1)',
        display: 'flex', flexDirection: 'column',
      }}>
      <div style={{ color: 'var(--ink)', marginBottom: 24 }}>
        <Icon name={icon} size={28} />
      </div>
      <h3 style={{ marginBottom: 12 }}>{title}</h3>
      <p style={{ margin: 0, color: 'var(--fg-2)', fontSize: 16 }}>{body}</p>
    </article>
  );
}

function Services() {
  return (
    <section id="services" data-screen-label="02 Services" style={{ background: 'var(--bg)', padding: '128px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ maxWidth: 720, marginBottom: 64 }}>
          <span className="eyebrow">Nos services</span>
          <h2 style={{ marginTop: 14 }}>Un accompagnement complet, de la première visite au suivi de votre installation BCE.</h2>
        </div>
        <div className="bce-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          <ServiceCard icon="flame" title="Vente & conseil"
            body="Nous étudions votre habitation, votre usage et votre budget pour vous orienter vers l'appareil qui convient — sans pression commerciale." />
          <ServiceCard icon="hammer" title="Pose & installation"
            body="Visite préalable, raccordement aux normes, mise en service. Travail propre, garanti, et réalisé par notre équipe." />
          <ServiceCard icon="wrench" title="Entretien & ramonage"
            body="Service réservé aux appareils installés par BCE. Contrat annuel ou intervention ponctuelle avec certificat exigé par votre assurance." />
        </div>
      </div>
    </section>
  );
}

window.Services = Services;
window.ServiceCard = ServiceCard;
