import { useEffect, useMemo, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { supabase } from "./lib/supabase";
import "./App.css";

const defaultProducts = [
  {
    id: "default-1",
    name: "Motor Yağları",
    img: "/yag.jpg",
    description: "Gözde Motor güvencesiyle satış ve hızlı destek.",
    price: "",
    old_price: "",
    stock: "",
    category: "Yağ",
    video_url: "",
  },
  {
    id: "default-2",
    name: "Zincir Setleri",
    img: "/zincir.jpg",
    description: "Gözde Motor güvencesiyle satış ve hızlı destek.",
    price: "",
    old_price: "",
    stock: "",
    category: "Zincir",
    video_url: "",
  },
  {
    id: "default-3",
    name: "Kask ve Çanta",
    img: "/kask.jpg",
    description: "Gözde Motor güvencesiyle satış ve hızlı destek.",
    price: "",
    old_price: "",
    stock: "",
    category: "Aksesuar",
    video_url: "",
  },
  {
    id: "default-4",
    name: "Ampul ve Elektrik",
    img: "/ampul.jpg",
    description: "Gözde Motor güvencesiyle satış ve hızlı destek.",
    price: "",
    old_price: "",
    stock: "",
    category: "Elektrik",
    video_url: "",
  },
];

function Reveal({ children, delay = 0 }) {
  return (
    <div className="reveal" style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function buildWhatsappCartMessage(cartItems) {
  if (!cartItems.length) {
    return "Merhaba, sepetim hakkında bilgi almak istiyorum.";
  }

  const lines = cartItems.map((item, index) => {
    const unitPrice = Number(item.price || 0);
    const lineTotal = unitPrice * item.quantity;

    return `${index + 1}. ${item.name} - Adet: ${item.quantity}${
      unitPrice > 0
        ? ` - Birim: ${unitPrice.toLocaleString("tr-TR")} TL - Tutar: ${lineTotal.toLocaleString("tr-TR")} TL`
        : ""
    }`;
  });

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0
  );

  return `Merhaba, sepetteki ürünlerim için bilgi almak istiyorum.%0A%0A${lines
    .map((line) => line.replaceAll(" ", "%20"))
    .join("%0A")}%0A%0AToplam:%20${total
    .toLocaleString("tr-TR")
    .replaceAll(".", "%2E")
    .replaceAll(",", "%2C")}%20TL`;
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

function FloatingCart({ cartCount }) {
  return (
    <Link to="/sepet" className="floating-cart" aria-label="Sepet">
      <span className="floating-cart-icon">🛒</span>
      <span className="floating-cart-text">Sepet</span>
      {cartCount > 0 ? (
        <span className="floating-cart-count">{cartCount}</span>
      ) : null}
    </Link>
  );
}

function ProductCard({ item, index = 0, addToCart }) {
  const hasDiscount =
    Number(item.old_price || 0) > Number(item.price || 0) &&
    Number(item.price || 0) > 0;

  const discountPercent = hasDiscount
    ? Math.round(
        ((Number(item.old_price) - Number(item.price)) / Number(item.old_price)) *
          100
      )
    : 0;

  return (
    <Reveal delay={80 + index * 70}>
      <div className="product-card animated-product-card">
        {hasDiscount ? (
          <div className="discount-badge">%{discountPercent} İndirim</div>
        ) : null}

        <Link to={`/urun/${item.id}`} className="product-card-link">
          <div className="product-image-wrap">
            <img src={item.img} alt={item.name} className="product-img" />
          </div>

          <div className="product-content">
            <h3>{item.name}</h3>
            <p>
              {item.description ||
                "Gözde Motor güvencesiyle satış ve hızlı destek."}
            </p>

            {hasDiscount ? (
              <div className="product-price-stack">
                <p className="product-old-price">
                  {Number(item.old_price).toLocaleString("tr-TR")} TL
                </p>
                <p className="product-price">
                  Fiyat: {Number(item.price).toLocaleString("tr-TR")} TL
                </p>
              </div>
            ) : item.price !== undefined &&
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

            {item.video_url ? (
              <p className="product-video-inline">Video mevcut</p>
            ) : null}
          </div>
        </Link>

        <div className="product-card-actions">
          <Link to={`/urun/${item.id}`} className="product-detail-btn">
            Ürünü İncele
          </Link>

          <button
            type="button"
            className="product-cart-btn"
            onClick={() => addToCart(item)}
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </Reveal>
  );
}

function ProductsSection({
  products,
  selectedCategory,
  setSelectedCategory,
  addToCart,
}) {
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
                <ProductCard
                  key={item.id || item.name || index}
                  item={item}
                  index={index}
                  addToCart={addToCart}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage({ products, addToCart, cartCount }) {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  const features = [
    "Hızlı parça temini",
    "Esnaf işi güven",
    "Şuhut içi kolay ulaşım",
    "Türkiye geneli gönderim",
  ];

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
        addToCart={addToCart}
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

      <FloatingCart cartCount={cartCount} />

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

function ProductsPage({ products, addToCart, cartCount }) {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

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
        addToCart={addToCart}
      />

      <FloatingCart cartCount={cartCount} />

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

function ProductDetailPage({ products, addToCart, cartCount }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => String(item.id) === String(id));

  const hasDiscount =
    product &&
    Number(product.old_price || 0) > Number(product.price || 0) &&
    Number(product.price || 0) > 0;

  const isYouTubeEmbed =
    product?.video_url &&
    (product.video_url.includes("youtube.com/embed") ||
      product.video_url.includes("youtube.com") ||
      product.video_url.includes("youtu.be"));

  const convertYoutubeUrl = (url) => {
    if (!url) return "";

    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.includes("watch?v=")) {
      const videoId = url.split("watch?v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.includes("embed")) {
      return url;
    }

    return url;
  };

  const normalizedYoutubeUrl = convertYoutubeUrl(product?.video_url);

  return (
    <div className="site">
      <div className="site-ambient-glow"></div>

      <SiteHeader />

      <section className="section product-detail-page">
        <div className="container">
          {!product ? (
            <div className="product-detail-box">
              <h2>Ürün bulunamadı</h2>
              <div className="detail-actions">
                <button className="btn btn-secondary" onClick={() => navigate("/urunler")}>
                  Ürünlere Dön
                </button>
              </div>
            </div>
          ) : (
            <Reveal>
              <div className="product-detail-box">
                <div className="product-detail-grid">
                  <div className="product-detail-image-wrap">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="product-detail-image"
                    />
                  </div>

                  <div className="product-detail-content">
                    <span className="section-mini">ÜRÜN DETAYI</span>
                    <h1>{product.name}</h1>

                    {product.category ? (
                      <p className="product-detail-category">
                        Kategori: {product.category}
                      </p>
                    ) : null}

                    <p className="product-detail-description">
                      {product.description}
                    </p>

                    {hasDiscount ? (
                      <div className="product-detail-price-stack">
                        <div className="product-detail-old-price">
                          {Number(product.old_price).toLocaleString("tr-TR")} TL
                        </div>
                        <div className="product-detail-price">
                          {Number(product.price).toLocaleString("tr-TR")} TL
                        </div>
                      </div>
                    ) : product.price !== undefined &&
                      product.price !== null &&
                      product.price !== "" ? (
                      <div className="product-detail-price">
                        {Number(product.price).toLocaleString("tr-TR")} TL
                      </div>
                    ) : null}

                    {product.stock !== undefined &&
                    product.stock !== null &&
                    product.stock !== "" ? (
                      <div className="product-detail-stock">
                        Stok: {product.stock}
                      </div>
                    ) : null}

                    <div className="detail-actions">
                      <button
                        className="btn btn-primary"
                        onClick={() => addToCart(product)}
                      >
                        Sepete Ekle
                      </button>

                      <a
                        href={`https://wa.me/905437182017?text=Merhaba%20${encodeURIComponent(
                          product.name
                        )}%20ürünü%20hakkında%20bilgi%20alabilir%20miyim?`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary"
                      >
                        WhatsApp ile Sor
                      </a>

                      <button
                        className="btn btn-secondary"
                        onClick={() => navigate("/urunler")}
                      >
                        Ürünlere Dön
                      </button>
                    </div>
                  </div>
                </div>

                {product.video_url ? (
                  <div className="product-video-section">
                    <h3>Ürün Videosu</h3>

                    <div className="product-video-box">
                      {isYouTubeEmbed ? (
                        <iframe
                          src={normalizedYoutubeUrl}
                          title={product.name}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <video controls src={product.video_url}>
                          Tarayıcı video oynatmayı desteklemiyor.
                        </video>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <FloatingCart cartCount={cartCount} />

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

function CartPage({
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  cartTotal,
}) {
  const whatsappLink = `https://wa.me/905437182017?text=${buildWhatsappCartMessage(
    cartItems
  )}`;

  return (
    <div className="site">
      <div className="site-ambient-glow"></div>

      <SiteHeader />

      <section className="section cart-page">
        <div className="container">
          <Reveal>
            <div className="section-top" style={{ marginTop: "40px" }}>
              <span className="section-mini">SEPET</span>
              <h2>Sepetim</h2>
            </div>
          </Reveal>

          <div className="cart-layout">
            <div className="cart-items-box">
              {cartItems.length === 0 ? (
                <div className="cart-empty-box">
                  Sepetinde henüz ürün yok.
                </div>
              ) : (
                <div className="cart-item-list">
                  {cartItems.map((item, index) => (
                    <Reveal key={item.id} delay={index * 60}>
                      <div className="cart-item-card">
                        <div className="cart-item-image-wrap">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="cart-item-image"
                          />
                        </div>

                        <div className="cart-item-content">
                          <h3>{item.name}</h3>

                          {item.category ? (
                            <p className="cart-item-category">
                              Kategori: {item.category}
                            </p>
                          ) : null}

                          {item.price !== undefined &&
                          item.price !== null &&
                          item.price !== "" ? (
                            <p className="cart-item-price">
                              {Number(item.price).toLocaleString("tr-TR")} TL
                            </p>
                          ) : null}

                          <div className="cart-quantity-row">
                            <button
                              className="qty-btn"
                              onClick={() => decreaseQuantity(item.id)}
                            >
                              -
                            </button>

                            <span className="qty-value">{item.quantity}</span>

                            <button
                              className="qty-btn"
                              onClick={() => increaseQuantity(item.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="cart-item-side">
                          <div className="cart-line-total">
                            {(Number(item.price || 0) * item.quantity).toLocaleString(
                              "tr-TR"
                            )}{" "}
                            TL
                          </div>

                          <button
                            className="remove-cart-btn"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Sil
                          </button>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>

            <div className="cart-summary-box">
              <h3>Sepet Özeti</h3>

              <div className="cart-summary-row">
                <span>Toplam Ürün</span>
                <strong>
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </strong>
              </div>

              <div className="cart-summary-row">
                <span>Toplam Tutar</span>
                <strong>{cartTotal.toLocaleString("tr-TR")} TL</strong>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary cart-order-btn"
              >
                WhatsApp ile Sipariş Sor
              </a>

              <Link to="/urunler" className="btn btn-secondary cart-order-btn">
                Alışverişe Devam Et
              </Link>
            </div>
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
  const [products, setProducts] = useState(defaultProducts);
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("gozde-motor-cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const getProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("PRODUCTS FETCH ERROR:", error);
        return;
      }

      if (Array.isArray(data)) {
        const formattedProducts = data.map((item) => ({
          id: item.id,
          name: item.name,
          img: item.image_url || "/yag.jpg",
          description:
            item.description || "Gözde Motor güvencesiyle satış ve hızlı destek.",
          price: item.price,
          old_price: item.old_price,
          stock: item.stock,
          category: item.category,
          video_url: item.video_url || "",
        }));

        if (formattedProducts.length > 0) {
          setProducts(formattedProducts);
        } else {
          setProducts(defaultProducts);
        }
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("gozde-motor-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            products={products}
            addToCart={addToCart}
            cartCount={cartCount}
          />
        }
      />
      <Route
        path="/urunler"
        element={
          <ProductsPage
            products={products}
            addToCart={addToCart}
            cartCount={cartCount}
          />
        }
      />
      <Route
        path="/urun/:id"
        element={
          <ProductDetailPage
            products={products}
            addToCart={addToCart}
            cartCount={cartCount}
          />
        }
      />
      <Route
        path="/sepet"
        element={
          <CartPage
            cartItems={cartItems}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeFromCart={removeFromCart}
            cartTotal={cartTotal}
          />
        }
      />
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