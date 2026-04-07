export default function App() {
  const services = [
    "Yedek Parça",
    "Aksesuar",
    "Servis & Tamir",
  ];

  const products = [
    "Motor Yağları",
    "Zincir Dişli Setleri",
    "Fren Balata",
    "Ampul ve Elektrik",
    "Kask ve Çanta",
    "Bakım Ürünleri",
  ];

  const reasons = [
    "Hızlı parça temini",
    "Esnaf işi güven",
    "Şuhut içi kolay ulaşım",
    "Türkiye geneli gönderim",
  ];

  return (
    <div className="site pro-site">
      <header className="header">
        <div className="container header-inner">
          <div>
            <h1 className="logo">GÖZDE MOTOR</h1>
            <div className="logo-sub">Yedek Parça • Aksesuar • Servis</div>
          </div>

          <nav>
            <a href="#anasayfa">Ana Sayfa</a>
            <a href="#hizmetler">Hizmetler</a>
            <a href="#urunler">Ürünler</a>
            <a href="#iletisim">İletişim</a>
          </nav>
        </div>
      </header>

      <section className="hero pro-hero" id="anasayfa">
        <div className="container hero-grid">
          <div>
            <div className="hero-badge">ŞUHUT / AFYON</div>
            <h2>Motoruna ne lazımsa <span>Gözde Motor</span>'da.</h2>
            <p>
              Yedek parça, aksesuar ve servis çözümlerini tek noktada sunan modern motosiklet mağazası.
              Güvenilir ürün, hızlı destek ve samimi esnaf anlayışı.
            </p>

            <div className="hero-actions">
              <a href="https://wa.me/905437182017" target="_blank" rel="noreferrer" className="btn">WhatsApp'tan Yaz</a>
              <a href="tel:05437182017" className="btn btn-outline">Hemen Ara</a>
            </div>

            <div className="hero-stats">
              <div className="stat-box">
                <strong>Parça</strong>
                <span>Geniş ürün grubu</span>
              </div>
              <div className="stat-box">
                <strong>Servis</strong>
                <span>Pratik çözüm</span>
              </div>
              <div className="stat-box">
                <strong>Kargo</strong>
                <span>Türkiye geneli</span>
              </div>
            </div>
          </div>

          <div className="hero-panel-pro">
            <div className="panel-tag">GM • PRO VİTRİN</div>
            <h3>Yedek Parça ve Aksesuar Merkezi</h3>
            <p>Instagram, WhatsApp ve mağaza satışını tek çatı altında toplayan güçlü vitrin sitesi.</p>
            <ul>
              <li>Motor yedek parça satışı</li>
              <li>Aksesuar ve ekipman ürünleri</li>
              <li>Servis ve tamir desteği</li>
              <li>Hızlı iletişim ve kolay yönlendirme</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="hizmetler">
        <div className="container">
          <div className="section-head">
            <span>HİZMETLERİMİZ</span>
            <h2>Güçlü, sade ve güven veren hizmet yapısı</h2>
          </div>

          <div className="grid services-grid">
            {services.map((item) => (
              <div className="card pro-card" key={item}>
                <div className="card-top-line"></div>
                <h3>{item}</h3>
                <p>Gözde Motor güvencesiyle hızlı destek ve doğru ürün yönlendirmesi.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark" id="urunler">
        <div className="container">
          <div className="section-head">
            <span>ÜRÜN VİTRİNİ</span>
            <h2>En çok sorulan ürün grupları</h2>
          </div>

          <div className="grid products-grid-pro">
            {products.map((item) => (
              <div className="card product-pro-card" key={item}>
                <div className="product-dot"></div>
                <h3>{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-wrap">
          <div className="info-panel">
            <span>NEDEN BİZ?</span>
            <h2>Müşterinin işini uzatmayan dükkan</h2>
            <div className="reason-list">
              {reasons.map((item) => (
                <div className="reason-item" key={item}>{item}</div>
              ))}
            </div>
          </div>

          <div className="contact-panel-pro">
            <span>HIZLI İLETİŞİM</span>
            <h2>Bir mesaj kadar yakınız</h2>
            <p>Parça sor, fiyat al, ürün fotoğrafı iste. Hızlıca cevap verelim.</p>
            <div className="contact-actions-pro">
              <a href="https://wa.me/905437182017?text=Merhaba%20G%C3%B6zde%20Motor%2C%20bilgi%20almak%20istiyorum." target="_blank" rel="noreferrer" className="btn">WhatsApp</a>
              <a href="https://instagram.com/gozdemotortr" target="_blank" rel="noreferrer" className="btn btn-outline">Instagram</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-contact" id="iletisim">
        <div className="container contact-box-pro">
          <div>
            <span>İLETİŞİM</span>
            <h2>Gözde Motor</h2>
            <p>Şuhut / Afyon</p>
            <p>0543 718 20 17</p>
            <p>@gozdemotor</p>
          </div>
          <div className="contact-right-pro">
            <div className="mini-note">Motoruna ne lazımsa burada.</div>
            <a href="tel:05437182017" className="btn">Şimdi Ara</a>
          </div>
        </div>
      </section>

      <a href="https://wa.me/905437182017?text=Merhaba%20G%C3%B6zde%20Motor%2C%20bilgi%20almak%20istiyorum." className="whatsapp" target="_blank" rel="noreferrer">
        WhatsApp
      </a>
    </div>
  );
}
