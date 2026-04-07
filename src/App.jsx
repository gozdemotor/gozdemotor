export default function App() {
  const products = [
    { name: "Motor Yağları", img: "/yag.jpg" },
    { name: "Zincir Setleri", img: "/zincir.jpg" },
    { name: "Kask ve Çanta", img: "/kask.jpg" },
    { name: "Ampul ve Elektrik", img: "/ampul.jpg" },
  ];

  return (
    <div className="site">

      <header className="header">
        <div className="container header-inner">
          <h1 className="logo">GÖZDE MOTOR</h1>
          <nav>
            <a href="#anasayfa">Ana Sayfa</a>
            <a href="#urunler">Ürünler</a>
            <a href="#iletisim">İletişim</a>
          </nav>
        </div>
      </header>

      <section className="hero" id="anasayfa">
        <div className="container">
          <h2>Motoruna ne lazımsa burada 🔥</h2>
          <p>Yedek Parça • Aksesuar • Servis</p>

          <div className="hero-buttons">
            <a href="https://wa.me/905437182017?text=Merhaba%20Gözde%20Motor%2C%20parça%20sormak%20istiyorum" className="btn">WhatsApp</a>
            <a href="tel:05437182017" className="btn btn-outline">Ara</a>
          </div>
        </div>
      </section>

      <section className="section" id="urunler">
        <div className="container">
          <h2>Ürünler</h2>

          <div className="grid">
            {products.map((item) => (
              <div className="card" key={item.name}>
                <img src={item.img} className="product-img"/>
                <h3>{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="container">
          <h2>Bize Ulaş</h2>
          <p>📍 Şuhut / Afyon</p>
          <p>📞 0543 718 20 17</p>

          <iframe
            src="https://www.google.com/maps?q=Şuhut%20Afyon&output=embed"
            width="100%"
            height="200"
            style={{ border: 0, borderRadius: "10px", marginTop: "15px" }}
          ></iframe>

          <a href="https://instagram.com/gozdemotor" target="_blank" className="btn" style={{marginTop:"15px"}}>
            Instagram'a Git
          </a>
        </div>
      </section>

      <a href="https://wa.me/905437182017" className="whatsapp">
        WhatsApp
      </a>

    </div>
  );
}