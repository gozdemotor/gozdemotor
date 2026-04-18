import { useEffect, useMemo, useState } from "react";
import { ADMIN_EMAIL, supabase } from "./lib/supabase";

export default function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [adminOpen, setAdminOpen] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [loginBusy, setLoginBusy] = useState(false);

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    category: "",
    stock: "",
    purchase_price: "",
    price: "",
    image_url: "",
  });

  const [saveBusy, setSaveBusy] = useState(false);
  const [saveError, setSaveError] = useState("");

  const isAdmin = session?.user?.email === ADMIN_EMAIL;

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setProducts(data || []);
  }

  useEffect(() => {
    loadProducts();

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;

    return products.filter((product) => {
      return (
        (product.name || "").toLowerCase().includes(q) ||
        (product.category || "").toLowerCase().includes(q) ||
        (product.description || "").toLowerCase().includes(q)
      );
    });
  }, [products, search]);

  function handleLoginChange(e) {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoginBusy(true);
    setLoginError("");

    const { error } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    });

    setLoginBusy(false);

    if (error) {
      setLoginError("Giriş başarısız. Mail veya şifre yanlış olabilir.");
      return;
    }

    if (loginForm.email !== ADMIN_EMAIL) {
      await supabase.auth.signOut();
      setLoginError("Bu hesap admin yetkili değil.");
      return;
    }

    setLoginForm({ email: "", password: "" });
    setAdminOpen(true);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setAdminOpen(false);
  }

  function handleProductChange(e) {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleAddProduct(e) {
    e.preventDefault();
    setSaveBusy(true);
    setSaveError("");

    try {
      const payload = {
        name: productForm.name.trim(),
        description: productForm.description.trim(),
        category: productForm.category.trim() || "Genel",
        stock: Number(productForm.stock || 0),
        purchase_price: Number(productForm.purchase_price || 0),
        price: Number(productForm.price || 0),
        image_url: productForm.image_url.trim(),
      };

      const { error } = await supabase.from("products").insert(payload);
      if (error) throw error;

      setProductForm({
        name: "",
        description: "",
        category: "",
        stock: "",
        purchase_price: "",
        price: "",
        image_url: "",
      });

      await loadProducts();
    } catch (err) {
      console.error(err);
      setSaveError("Ürün eklenemedi.");
    } finally {
      setSaveBusy(false);
    }
  }

  async function handleDeleteProduct(id) {
    const ok = window.confirm("Bu ürün silinsin mi?");
    if (!ok) return;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      alert("Ürün silinemedi.");
      return;
    }

    await loadProducts();
  }

  async function handleStockChange(product, diff) {
    const currentStock = Number(product.stock || 0);
    const newStock = Math.max(0, currentStock + diff);

    const { error } = await supabase
      .from("products")
      .update({ stock: newStock })
      .eq("id", product.id);

    if (error) {
      alert("Stok güncellenemedi.");
      return;
    }

    await supabase.from("stock_movements").insert({
      product_id: product.id,
      movement_type: diff >= 0 ? "GIRIS" : "CIKIS",
      quantity: Math.abs(diff),
      note: "Site admin paneli",
    });

    await loadProducts();
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
                href="https://wa.me/905437182017?text=Merhaba%20G%C3%B6zde%20Motor%2C%20%C3%BCr%C3%BCn%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
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
                    src={product.image_url || "/yag.jpg"}
                    className="product-img"
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.src = "/yag.jpg";
                    }}
                  />

                  <div className="product-body">
                    <div className="product-category">{product.category || "Genel"}</div>
                    <h3>{product.name}</h3>

                    {product.description ? (
                      <p className="product-description">{product.description}</p>
                    ) : null}

                    {!isAdmin ? (
                      <a
                        href={`https://wa.me/905437182017?text=${encodeURIComponent(
                          `Merhaba Gözde Motor, ${product.name} ürünü hakkında bilgi almak istiyorum.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mini-btn"
                      >
                        Bilgi Al
                      </a>
                    ) : (
                      <div className="admin-product-box">
                        <div className="admin-product-line">
                          <span>Stok:</span>
                          <strong>{product.stock ?? 0}</strong>
                        </div>
                        <div className="admin-product-line">
                          <span>Alış:</span>
                          <strong>{product.purchase_price ?? 0} TL</strong>
                        </div>
                        <div className="admin-product-line">
                          <span>Satış:</span>
                          <strong>{product.price ?? 0} TL</strong>
                        </div>

                        <div className="stock-actions">
                          <button
                            type="button"
                            className="mini-admin-btn"
                            onClick={() => handleStockChange(product, 1)}
                          >
                            +1
                          </button>
                          <button
                            type="button"
                            className="mini-admin-btn"
                            onClick={() => handleStockChange(product, -1)}
                          >
                            -1
                          </button>
                          <button
                            type="button"
                            className="mini-delete-btn"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            Sil
                          </button>
                        </div>
                      </div>
                    )}
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
              <h2>Ürün Yönetimi</h2>
            </div>

            {isAdmin ? (
              <div className="admin-top-buttons">
                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => setAdminOpen((prev) => !prev)}
                >
                  {adminOpen ? "Paneli Kapat" : "Paneli Aç"}
                </button>

                <button
                  type="button"
                  className="btn secondary"
                  onClick={handleLogout}
                >
                  Çıkış Yap
                </button>
              </div>
            ) : null}
          </div>

          {!authLoading && !isAdmin ? (
            <form className="admin-login-card" onSubmit={handleLogin}>
              <h3>Admin Girişi</h3>
              <p>Sadece yetkili hesap giriş yapabilir.</p>

              <input
                type="email"
                name="email"
                placeholder="Admin e-posta"
                value={loginForm.email}
                onChange={handleLoginChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Şifre"
                value={loginForm.password}
                onChange={handleLoginChange}
              />

              {loginError ? <div className="login-error">{loginError}</div> : null}

              <button type="submit" className="btn primary" disabled={loginBusy}>
                {loginBusy ? "Giriş yapılıyor..." : "Giriş Yap"}
              </button>
            </form>
          ) : null}

          {isAdmin && adminOpen ? (
            <div className="admin-grid">
              <form className="admin-card" onSubmit={handleAddProduct}>
                <h3>Yeni Ürün Ekle</h3>

                <label>
                  Ürün Adı
                  <input
                    type="text"
                    name="name"
                    value={productForm.name}
                    onChange={handleProductChange}
                    placeholder="Örn: Fren Balata"
                    required
                  />
                </label>

                <label>
                  Açıklama
                  <input
                    type="text"
                    name="description"
                    value={productForm.description}
                    onChange={handleProductChange}
                    placeholder="Örn: Cup arka fren takımı"
                  />
                </label>

                <label>
                  Kategori
                  <input
                    type="text"
                    name="category"
                    value={productForm.category}
                    onChange={handleProductChange}
                    placeholder="Örn: Fren"
                  />
                </label>

                <label>
                  Stok
                  <input
                    type="number"
                    name="stock"
                    value={productForm.stock}
                    onChange={handleProductChange}
                    placeholder="Örn: 12"
                  />
                </label>

                <label>
                  Alış Fiyatı
                  <input
                    type="number"
                    step="0.01"
                    name="purchase_price"
                    value={productForm.purchase_price}
                    onChange={handleProductChange}
                    placeholder="Örn: 120"
                  />
                </label>

                <label>
                  Satış Fiyatı
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={productForm.price}
                    onChange={handleProductChange}
                    placeholder="Örn: 180"
                  />
                </label>

                <label>
                  Görsel URL
                  <input
                    type="text"
                    name="image_url"
                    value={productForm.image_url}
                    onChange={handleProductChange}
                    placeholder="/yag.jpg veya resim linki"
                  />
                </label>

                {saveError ? <div className="login-error">{saveError}</div> : null}

                <div className="admin-actions">
                  <button type="submit" className="btn primary" disabled={saveBusy}>
                    {saveBusy ? "Kaydediliyor..." : "Ürünü Ekle"}
                  </button>
                </div>
              </form>

              <div className="admin-card">
                <h3>Yönetim Bilgisi</h3>
                <p className="admin-note">
                  Müşteri sadece ürün adı, kategori, görsel ve bilgi al butonunu görür.
                  Stok ve fiyat bilgileri sadece admin girişinde görünür.
                </p>
              </div>
            </div>
          ) : null}
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