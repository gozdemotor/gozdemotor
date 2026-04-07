export default function App() {
  return (
    <div className="site">
      {/* HEADER */}
      <header className="header">
        <div className="container header-inner">
          <img src="/logo.png" className="brand-logo" />

          <nav className="nav">
            <a href="#">Ana Sayfa</a>
            <a href="#">Ürünler</a>
            <a href="#">Neden Biz</a>
            <a href="#">İletişim</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-bg-logo"></div>

        <div className="container hero-content">
          <h1>
            Motoruna ne lazımsa <span>Gözde Motor</span>'da.
          </h1>

          <p>
            Yedek parça, aksesuar ve servis çözümlerini tek noktada sunan modern
            motosiklet mağazası.
          </p>

          <div className="buttons">
            <a
              href="https://wa.me/905437182017"
              target="_blank"
              className="btn primary"
            >
              WhatsApp'tan Yaz
            </a>

            <a href="tel:05437182017" className="btn secondary">
              Hemen Ara
            </a>
          </div>
        </div>
      </section>

      {/* FLOAT BUTTON */}
      <a
        href="https://wa.me/905437182017"
        target="_blank"
        className="whatsapp"
      >
        WhatsApp
      </a>
    </div>
  );
}