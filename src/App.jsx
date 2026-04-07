import { useEffect, useMemo, useState } from "react";

const defaultProducts = [
  {
    id: 1,
    name: "Motor Yağları",
    image: "/yag.jpg",
    price: "Fiyat Sorunuz",
    category: "Bakım",
  },
  {
    id: 2,
    name: "Zincir Setleri",
    image: "/zincir.jpg",
    price: "Fiyat Sorunuz",
    category: "Aktarma",
  },
  {
    id: 3,
    name: "Kask ve Çanta",
    image: "/kask.jpg",
    price: "Fiyat Sorunuz",
    category: "Aksesuar",
  },
  {
    id: 4,
    name: "Ampul ve Elektrik",
    image: "/ampul.jpg",
    price: "Fiyat Sorunuz",
    category: "Elektrik",
  },
];

const STORAGE_KEY = "gozde_motor_products_v1";

export default function App() {
  const [products, setProducts] = useState(defaultProducts);
  const [adminOpen, setAdminOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }
    } catch (error) {
      console.error("Ürünler okunamadı:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error("Ürünler kaydedilemedi:", error);
    }
  }, [products]);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.price.toLowerCase().includes(q)
      );
    });
  }, [products, search]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddProduct(event) {
    event.preventDefault();

    if (!form.name.trim()) return;

    const newProduct = {
      id: Date.now(),
      name: form.name.trim(),
      image: form.image.trim() || "/yag.jpg",
      price: form.price.trim() || "Fiyat Sorunuz",
      category: form.category.trim() || "Genel",
    };

    setProducts((prev) => [newProduct, ...prev]);
    setForm({
      name: "",
      image: "",
      price: "",
      category: "",
    });
  }

  function handleDeleteProduct(id) {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  }

  function handleResetProducts() {
    const ok = window.confirm("Tüm ürünleri varsayılan hale döndürmek istiyor musun?");
    if (!ok) return;
    setProducts(defaultProducts);
  }

  return (
    <div className="site">
      <header className="header fade-in-down">
        <div className="container header-inner">
          <img src="/logo.png" className="brand-logo" alt="Gözde Motor Logo" />

          <nav className="nav">
            <a href="#anasayfa">Ana Sayfa</a>
            <a href="#urunler">Ürünler</a>
            <a href="#admin">Admin</a>
            <a href="#iletisim">İletişim</a>
          </nav>
        </div>
      </header>

      <section className="hero" id="anasayfa">
        <div className="hero-overlay"></div>
        <div className="hero-bg-logo"></div>

        <div className="container hero-content">
          <div className="hero-animate">
            <h1>
              Motoruna ne lazımsa <span>Gözde Motor</span>'da.
            </h1>

            <p>
              Yedek parça, aksesuar ve servis çözümlerini tek noktada sunan modern
              motosiklet mağazası.
            </p>

            <div className="buttons">
              <a
                href="https://wa.me/905437182017?text=Merhaba%20G%C3%B6zde%20Motor%2C%20par%C3%A7a%20sormak%20istiyorum."
                target="_blank"
                rel="noreferrer"
                className="btn primary"
              >
                WhatsApp'tan Yaz
              </a>

              <a href="tel:05437182017" className="btn secondary">
                Hemen Ara
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section fade-in-up" id="urunler">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-kicker">ÜRÜNLER</span>
              <h2>Ürün Vitrini</h2>
            </div>

            <div className="search-box">
              <input
                type="text"
                placeholder="Ürün ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.length === 0 ? (
              <div className="empty-state">Aramana uygun ürün bulunamadı.</div>
            ) : (
              filteredProducts.map((product) => (
                <div className="product-card card-animate" key={product.id}>
                  <img
                    src={product.image}
                    className="product-img"
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.src = "/yag.jpg";
                    }}
                  />
                  <div className="product-body">
                    <div className="product-category">{product.category}</div>
                    <h3>{product.name}</h3>
                    <div className="product-price">{product.price}</div>
                    <a
                      href="https://wa.me/905437182017?text=Merhaba%20G%C3%B6zde%20Motor%2C%20bu%20%C3%BCr%C3%BCn%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
                      target="_blank"
                      rel="noreferrer"
                      className="mini-btn"
                    >
                      Bilgi Al
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="section section-dark fade-in-up" id="admin">
        <div className="container">
          <div className="admin-top">
            <div>
              <span className="section-kicker">ADMİN PANEL</span>
              <h2>Ürün Ekleme Sistemi</h2>
            </div>

            <button
              type="button"
              className="btn secondary admin-toggle"
              onClick={() => setAdminOpen((prev) => !prev)}
            >
              {adminOpen ? "Paneli Kapat" : "Paneli Aç"}
            </button>
          </div>

          {adminOpen && (
            <div className="admin-grid">
              <form className="admin-card" onSubmit={handleAddProduct}>
                <h3>Yeni Ürün Ekle</h3>

                <label>
                  Ürün Adı
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Örn: Fren Balata"
                  />
                </label>

                <label>
                  Görsel Yolu
                  <input
                    type="text"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="/yag.jpg veya görsel linki"
                  />
                </label>

                <label>
                  Fiyat
                  <input
                    type="text"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Örn: 350 TL"
                  />
                </label>

                <label>
                  Kategori
                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Örn: Fren"
                  />
                </label>

                <div className="admin-actions">
                  <button type="submit" className="btn primary">
                    Ürünü Ekle
                  </button>
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={handleResetProducts}
                  >
                    Varsayılan Ürünler
                  </button>
                </div>
              </form>

              <div className="admin-card">
                <h3>Eklenen Ürünler</h3>

                <div className="admin-list">
                  {products.map((item) => (
                    <div className="admin-list-item" key={item.id}>
                      <div>
                        <strong>{item.name}</strong>
                        <span>
                          {item.category} • {item.price}
                        </span>
                      </div>

                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => handleDeleteProduct(item.id)}
                      >
                        Sil
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section fade-in-up" id="iletisim">
        <div className="container contact-box">
          <div>
            <span className="section-kicker">İLETİŞİM</span>
            <h2>Gözde Motor</h2>
            <p>Şuhut / Afyon</p>
            <p>0543 718 20 17</p>
            <p>@gozdemotortr</p>
          </div>

          <div className="contact-buttons">
            <a
              href="https://instagram.com/gozdemotortr"
              target="_blank"
              rel="noreferrer"
              className="btn secondary"
            >
              Instagram
            </a>

            <a
              href="https://wa.me/905437182017"
              target="_blank"
              rel="noreferrer"
              className="btn primary"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <a
        href="https://wa.me/905437182017"
        target="_blank"
        rel="noreferrer"
        className="whatsapp"
      >
        WhatsApp
      </a>
    </div>
  );
}