import { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { supabase } from "./lib/supabase";
import "./App.css";

function Reveal({ children, delay = 0 }) {
  return (
    <div
      className="reveal"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          <img src="/logo.png" alt="Gözde Motor Logo" className="brand-logo" />
        </Link>

        <nav className="nav">
          <Link to="/">Ana Sayfa</Link>
          <Link to="/urunler">Ürünler</Link>
          <a href="/#avantajlar">Neden Biz</a>
          <a href="/#iletisim">İletişim</a>
          <Link to="/admin/login" className="nav-admin-link">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}

function ProductsSection({ products, selectedCategory, setSelectedCategory }) {
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
    <section className="section" id="urunler">
      <div className="container">
        <Reveal>
          <div className="section-top">
            <span className="section-mini">ÜRÜN VİTRİNİ</span>
            <h2>En çok sorulan ürün grupları</h2>
          </div>
        </Reveal>

        <div className="products-layout">
          <Reveal delay={100}>
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
          </Reveal>

          <div className="products-content">
            <div className="product-grid">
              {filteredProducts.map((item, index) => (
                <Reveal key={item.id || item.name || index} delay={80 + index * 70}>
                  <div className="product-card animated-product-card">
                    <div className="product-image-wrap">
                      <img src={item.img} alt={item.name} className="product-img" />
                    </div>

                    <div className="product-content">
                      <h3>{item.name}</h3>
                      <p>
                        {item.description ||
                          "Gözde Motor güvencesiyle satış ve hızlı destek."}
                      </p>

                      {item.price !== undefined &&
                      item.price !== null &&
                      item.price !== "" ? (
                        <p className="product-price">
                          Fiyat: {Number(item.price).toLocaleString("tr-TR")} TL
                        </p>
                      ) : null}

                      {item.stock !== undefined &&
                      item.stock !== null &&
                      item.stock !== "" ? (
                        <p className="product-stock">Stok: {item.stock}</p>
                      ) : null}

                      {item.category ? (
                        <p className="product-category-inline">
                          Kategori: {item.category}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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

  return (
    <div className="site">
      <div className="site-ambient-glow"></div>

      <SiteHeader />

      <section className="hero" id="anasayfa">
        <div className="hero-overlay"></div>
        <div className="hero-bg-logo"></div>

        <div className="container hero-grid">
          <div className="hero-left">
            <Reveal delay={0}>
              <div className="hero-badge">Şuhut / Afyon</div>
            </Reveal>

            <Reveal delay={120}>
              <h1>
                Motoruna ne lazımsa <span>Gözde Motor</span>'da.
              </h1>
            </Reveal>

            <Reveal delay={240}>
              <p>
                Yedek parça, aksesuar ve servis çözümlerini tek noktada sunan modern
                motosiklet mağazası. Güçlü vitrin, hızlı iletişim ve güven veren hizmet.
              </p>
            </Reveal>

            <Reveal delay={360}>
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
            </Reveal>

            <Reveal delay={480}>
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
            </Reveal>
          </div>

          <Reveal delay={260}>
            <div className="hero-card hero-card-animated">
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
          </Reveal>
        </div>
      </section>

      <ProductsSection
        products={products}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <section className="section section-dark" id="avantajlar">
        <div className="container split-grid">
          <Reveal delay={60}>
            <div className="info-box animated-box">
              <span className="section-mini">NEDEN BİZ?</span>
              <h2>Müşterinin işini uzatmayan dükkan</h2>

              <div className="feature-list">
                {features.map((item, index) => (
                  <div
                    className="feature-item feature-animated"
                    key={item}
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="contact-box animated-box">
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
          </Reveal>
        </div>
      </section>

      <section className="section" id="iletisim">
        <div className="container contact-main">
          <Reveal delay={60}>
            <div className="contact-left animated-box">
              <span className="section-mini">İLETİŞİM</span>
              <h2>Gözde Motor</h2>

              <div className="contact-lines">
                <p>📍 Şuhut / Afyon</p>
                <p>📞 0543 718 20 17</p>
                <p>📷 @gozdemotortr</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="contact-right map-animated">
              <iframe
                src="https://www.google.com/maps?q=Şuhut%20Afyon&output=embed"
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: "18px" }}
                loading="lazy"
                title="Gözde Motor Konum"
              ></iframe>
            </div>
          </Reveal>
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

function ProductsPage() {
  const [products, setProducts] = useState([
    { name: "Motor Yağları", img: "/yag.jpg" },
    { name: "Zincir Setleri", img: "/zincir.jpg" },
    { name: "Kask ve Çanta", img: "/kask.jpg" },
    { name: "Ampul ve Elektrik", img: "/ampul.jpg" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

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

  return (
    <div className="site">
      <div className="site-ambient-glow"></div>

      <SiteHeader />

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-top" style={{ marginTop: "40px" }}>
              <span className="section-mini">AYRI SAYFA GÖRÜNÜMÜ</span>
              <h2>Tüm Ürünler</h2>
            </div>
          </Reveal>
        </div>
      </section>

      <ProductsSection
        products={products}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

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
      <Route path="/urunler" element={<ProductsPage />} />
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