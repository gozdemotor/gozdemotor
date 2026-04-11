import { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { supabase } from "./lib/supabase";
import "./App.css";

function HomePage() {
  const [products, setProducts] = useState([
    { name: "Motor Yağları", img: "/yag.jpg" },
    { name: "Zincir Setleri", img: "/zincir.jpg" },
    { name: "Kask ve Çanta", img: "/kask.jpg" },
    { name: "Ampul ve Elektrik", img: "/ampul.jpg" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  const features = [
    "Hızlı parça temini",
    "Esnaf işi güven",
    "Şuhut içi kolay ulaşım",
    "Türkiye geneli gönderim",
  ];

  useEffect(() => {
    const getProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const formattedProducts = data.map((item) => ({
          id: item.id,
          name: item.name,
          img: item.image_url || "/yag.jpg",
          description:
            item.description || "Gözde Motor güvencesiyle satış ve hızlı destek.",
          price: item.price,
          stock: item.stock,
          category: item.category,
        }));

        setProducts(formattedProducts);
      }
    };

    getProducts();
  }, []);

  const categories = useMemo(() => {
    const dynamicCategories = products
      .map((item) => item.category)
      .filter((item) => item && item.trim() !== "");

    return ["Tümü", ...new Set(dynamicCategories)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "Tümü") return products;
    return products.filter((item) => item.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="site">
      <header className="header">
        <div className="container header-inner">
          <a href="#anasayfa" className="brand">
            <img src="/logo.png" alt="Gözde Motor Logo" className="brand-logo" />
          </a>

          <nav className="nav">
            <a href="#anasayfa">Ana Sayfa</a>
            <a href="#urunler">Ürünler</a>
            <a href="#avantajlar">Neden Biz</a>
            <a href="#iletisim">İletişim</a>
            <Link to="/admin/login" className="nav-admin-link">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <section className="hero" id="anasayfa">
        <div className="hero-overlay"></div>
        <div className="hero-bg-logo"></div>

        <div className="container hero-grid">
          <div className="hero-left">
            <div className="hero-badge">Şuhut / Afyon</div>

            <h1>
              Motoruna ne lazımsa <span>Gözde Motor</span>'da.
            </h1>

            <p>
              Yedek parça, aksesuar ve servis çözümlerini tek noktada sunan modern
              motosiklet mağazası. Güçlü vitrin, hızlı iletişim ve güven veren hizmet.
            </p>

            <div className="hero-actions">
              <a
                href="https://wa.me/905437182017?text=Merhaba%20G%C3%B6zde%20Motor%2C%20par%C3%A7a%20sormak%20istiyorum."
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                WhatsApp'tan Yaz
              </a>

              <a href="tel:05437182017" className="btn btn-secondary">
                Hemen Ara
              </a>

              <Link to="/admin/login" className="btn btn-secondary">
                Admin Girişi
              </Link>
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

          <div className="hero-card">
            <div className="panel-label">GÖZDE MOTOR</div>
            <h2>Motor & Yedek Parça Merkezi</h2>
            <p>
              WhatsApp, Instagram ve mağaza satışını bir araya getiren modern vitrin
              sitesi. Siyah-kırmızı güçlü görünüm, net ürün yapısı ve kolay iletişim.
            </p>

            <ul className="hero-list">
              <li>Motor yedek parça satışı</li>
              <li>Aksesuar ve ekipman ürünleri</li>
              <li>Servis ve tamir desteği</li>
              <li>Hızlı müşteri iletişimi</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="urunler">
        <div className="container">
          <div className="section-top">
            <span className="section-mini">ÜRÜN VİTRİNİ</span>
            <h2>En çok sorulan ürün grupları</h2>
          </div>

          <div className="products-layout">
            <aside className="category-sidebar">
              <h3>Kategoriler</h3>

              <div className="category-list">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={
                      selectedCategory === category
                        ? "category-btn active"
                        : "category-btn"
                    }
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </aside>

            <div className="products-content">
              <div className="product-grid">
                {filteredProducts.map((item, index) => (
                  <div className="product-card" key={item.id || item.name || index}>
                    <img src={item.img} alt={item.name} className="product-img" />
                    <div className="product-content">
                      <h3>{item.name}</h3>
                      <p>
                        {item.description ||
                          "Gözde Motor güvencesiyle satış ve hızlı destek."}
                      </p>

                      {item.price !== undefined &&
                      item.price !== null &&
                      item.price !== "" ? (
                        <p
                          style={{
                            marginTop: "10px",
                            fontWeight: "800",
                            color: "#ffffff",
                          }}
                        >
                          Fiyat: {Number(item.price).toLocaleString("tr-TR")} TL
                        </p>
                      ) : null}

                      {item.stock !== undefined &&
                      item.stock !== null &&
                      item.stock !== "" ? (
                        <p
                          style={{
                            marginTop: "6px",
                            color: "rgba(255,255,255,0.78)",
                          }}
                        >
                          Stok: {item.stock}
                        </p>
                      ) : null}

                      {item.category ? (
                        <p
                          style={{
                            marginTop: "6px",
                            color: "#ff8a8a",
                            fontSize: "13px",
                            fontWeight: "700",
                          }}
                        >
                          Kategori: {item.category}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="avantajlar">
        <div className="container split-grid">
          <div className="info-box">
            <span className="section-mini">NEDEN BİZ?</span>
            <h2>Müşterinin işini uzatmayan dükkan</h2>

            <div className="feature-list">
              {features.map((item) => (
                <div className="feature-item" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="contact-box">
            <span className="section-mini">HIZLI İLETİŞİM</span>
            <h2>Bir mesaj kadar yakınız</h2>
            <p>
              Parça sor, fiyat al, ürün fotoğrafı iste. Hızlıca dönüş yapalım.
            </p>

            <div className="contact-buttons">
              <a
                href="https://wa.me/905437182017?text=Merhaba%20G%C3%B6zde%20Motor%2C%20bilgi%20almak%20istiyorum."
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                WhatsApp
              </a>

              <a
                href="https://instagram.com/gozdemotortr"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="iletisim">
        <div className="container contact-main">
          <div className="contact-left">
            <span className="section-mini">İLETİŞİM</span>
            <h2>Gözde Motor</h2>

            <div className="contact-lines">
              <p>📍 Şuhut / Afyon</p>
              <p>📞 0543 718 20 17</p>
              <p>📷 @gozdemotortr</p>
            </div>
          </div>

          <div className="contact-right">
            <iframe
              src="https://www.google.com/maps?q=Şuhut%20Afyon&output=embed"
              width="100%"
              height="250"
              style={{ border: 0, borderRadius: "18px" }}
              loading="lazy"
              title="Gözde Motor Konum"
            ></iframe>
          </div>
        </div>
      </section>

      <a
        href="https://wa.me/905437182017?text=Merhaba%20G%C3%B6zde%20Motor%2C%20bilgi%20almak%20istiyorum."
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp"
      >
        WhatsApp
      </a>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}