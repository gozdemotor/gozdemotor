export default function App() {
  const featuredCategories = [
    {
      title: "Motor Yedek Parça",
      desc: "CG, cup, scooter ve birçok model için günlük ihtiyaç duyulan parçalar.",
    },
    {
      title: "Aksesuar Ürünleri",
      desc: "Kask, elcik, çanta, telefon tutucu, bakım ürünleri ve daha fazlası.",
    },
    {
      title: "Servis & Tamir",
      desc: "Bakım, arıza tespiti, parça değişimi ve pratik esnaf çözümü.",
    },
  ];

  const productGroups = [
    "Yağlar ve bakım ürünleri",
    "Zincir - dişli setleri",
    "Fren balata ve diskler",
    "Far, sinyal, ampul",
    "Debriyaj ve gaz telleri",
    "Karbüratör ve motor parçaları",
    "Akü ve elektrik ekipmanları",
    "Kask, çanta ve aksesuar",
  ];

  const advantages = [
    "Yerel esnaf güveni",
    "Hızlı parça temini",
    "Servis ve parça tek noktada",
    "Türkiye geneli gönderim imkanı",
  ];

  const brands = ["Motul", "Castrol", "Ngk", "RK", "Did", "Monero", "Ncr", "Osram"];

  return (
    <div className="site">
      <header className="header">
        <div className="container header-inner">
          <div>
            <div className="logo-text">GÖZDE MOTOR</div>
            <div className="logo-sub">Yedek Parça • Aksesuar • Servis</div>
          </div>

          <nav className="nav">
            <a href="#anasayfa">Ana Sayfa</a>
            <a href="#hizmetler">Hizmetler</a>
            <a href="#urunler">Ürünler</a>
            <a href="#iletisim">İletişim</a>
          </nav>
        </div>
      </header>

      <section id="anasayfa" className="hero">
        <div className="container hero-grid">
          <div>
            <div className="badge">Şuhut / Afyon</div>
            <h1>
              Motoruna ne lazımsa <span>Gözde Motor</span>'da.
            </h1>
            <p className="hero-text">
              Yedek parça, aksesuar, servis ve tamir hizmetlerini tek noktada bul.
              Yerel esnaf sıcaklığıyla, hızlı çözüm ve güven veren hizmet anlayışı.
            </p>

            <div className="hero-buttons">
              <a className="btn btn-primary" href="tel:05437182017">
                Hemen Ara
              </a>
              <a className="btn btn-secondary" href="#iletisim">
                İletişime Geç
              </a>
            </div>

            <div className="stats">
              <div className="stat-card">
                <strong>Parça</strong>
                <span>Geniş ürün grubu</span>
              </div>
              <div className="stat-card">
                <strong>Servis</strong>
                <span>Pratik çözüm</span>
              </div>
              <div className="stat-card">
                <strong>Kargo</strong>
                <span>Türkiye geneli</span>
              </div>
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-box">
              <div className="hero-box-top">
                <div>
                  <div className="muted">Marka Kimliği</div>
                  <div className="gm">GM</div>
                </div>
                <div className="chip">Yedek Parça</div>
              </div>

              <div className="card-list">
                {featuredCategories.map((item) => (
                  <div key={item.title} className="feature-card">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="hizmetler" className="section">
        <div className="container">
          <div className="section-top">
            <div className="section-label">Hizmetlerimiz</div>
            <h2>Dükkanında ne varsa sitede de o hissi verelim.</h2>
          </div>

          <div className="grid-3">
            <div className="info-card">
              <div className="mini-badge">Gözde Motor</div>
              <h3>Yedek Parça Satışı</h3>
              <p>
                En çok ihtiyaç duyulan parçalardan günlük tamir ürünlerine kadar
                güvenilir satış.
              </p>
            </div>

            <div className="info-card">
              <div className="mini-badge">Gözde Motor</div>
              <h3>Aksesuar ve Ekipman</h3>
              <p>
                Kask, çanta, bakım ürünleri ve sürüş konforunu artıran yardımcı
                ekipmanlar.
              </p>
            </div>

            <div className="info-card">
              <div className="mini-badge">Gözde Motor</div>
              <h3>Servis & Tamir</h3>
              <p>
                Uygun çözüm, hızlı işlem ve esnaf işi güven. İhtiyaca göre bakım ve
                değişim desteği.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="urunler" className="section section-dark">
        <div className="container">
          <div className="section-top">
            <div className="section-label">Ürün Grupları</div>
            <h2>En çok sorulan ve en çok satılan ürünler</h2>
            <p className="section-desc">
              Siteye zamanla yeni ürünler, kampanyalar ve stokta bulunan markalar da eklenebilir.
            </p>
          </div>

          <div className="products-grid">
            {productGroups.map((item) => (
              <div key={item} className="product-card">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div className="panel">
            <div className="section-label">Neden Biz?</div>
            <h2>Müşterinin işini uzatmayan dükkan</h2>

            <div className="small-grid">
              {advantages.map((item) => (
                <div key={item} className="small-card">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="panel panel-red">
            <div className="section-label light">Markalar</div>
            <h2>Çalışılan ve talep gören ürünler</h2>

            <div className="brand-list">
              {brands.map((brand) => (
                <div key={brand} className="brand-pill">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section about-wrap">
        <div className="container two-col about-grid">
          <div className="panel">
            <div className="section-label">Hakkımızda</div>
            <h2>Gözde Motor</h2>
            <p className="about-text">
              Şuhut’ta yedek parça, aksesuar ve servis hizmetini bir arada sunan
              Gözde Motor; güvenilir ürün, hızlı çözüm ve samimi esnaf anlayışıyla
              hizmet verir. Amacımız müşterinin ihtiyacını doğru parça, doğru
              yönlendirme ve temiz hizmetle karşılamak.
            </p>
          </div>

          <div className="panel panel-red">
            <div className="section-label light">Hızlı Ulaşım</div>
            <h2>WhatsApp Destek</h2>
            <p className="about-text">
              Parça sormak, fiyat almak veya ürün fotoğrafı istemek için direkt
              WhatsApp’tan ulaşabilirsiniz.
            </p>

            <a
              className="btn btn-primary"
              href="https://wa.me/905437182017?text=Merhaba%20G%C3%B6zde%20Motor%2C%20yedek%20par%C3%A7a%20bilgisi%20almak%20istiyorum."
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp'tan Yaz
            </a>
          </div>
        </div>
      </section>

      <section id="iletisim" className="section">
        <div className="container two-col">
          <div className="panel">
            <div className="section-label">İletişim</div>
            <h2>Bize kolayca ulaş</h2>

            <div className="contact-list">
              <div>
                <div className="contact-label">Çalışma Şekli</div>
                <div className="contact-value">Mağaza satış • Servis • Kargo</div>
              </div>

              <div>
                <div className="contact-label">Telefon</div>
                <div className="contact-value">0543 718 20 17</div>
              </div>

              <div>
                <div className="contact-label">Konum</div>
                <div className="contact-value">Şuhut / Afyon</div>
              </div>

              <div>
                <div className="contact-label">Instagram</div>
                <div className="contact-value">@gozdemotor</div>
              </div>
            </div>
          </div>

          <div className="panel panel-red">
            <div className="section-label light">Hazır Metin</div>
            <h2>WhatsApp için kısa mesaj</h2>

            <div className="message-box">
              Merhaba, Gözde Motor’dan bilgi almak istiyorum. Yedek parça /
              aksesuar / servis konusunda yardımcı olabilir misiniz?
            </div>

            <div className="contact-buttons">
              <a
                className="btn btn-white"
                href="https://instagram.com/gozdemotor"
                target="_blank"
                rel="noreferrer"
              >
                Instagram’a Git
              </a>

              <a
                className="btn btn-primary"
                href="https://wa.me/905437182017?text=Merhaba%20G%C3%B6zde%20Motor%2C%20bilgi%20almak%20istiyorum."
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp'a Git
              </a>

              <a className="btn btn-secondary" href="tel:05437182017">
                Telefonla Ara
              </a>
            </div>
          </div>
        </div>
      </section>

      <a
        className="floating-btn"
        href="https://wa.me/905437182017?text=Merhaba%20G%C3%B6zde%20Motor%2C%20bilgi%20almak%20istiyorum."
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>

      <footer className="footer">
        <div className="container footer-inner">
          <div>© 2026 Gözde Motor • Yedek Parça • Aksesuar • Servis</div>
          <div>Şuhut / Afyon</div>
        </div>
      </footer>
    </div>
  );
}