import { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { supabase } from "./lib/supabase";
import "./App.css";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        const formatted = data.map((item) => ({
          id: item.id,
          name: item.name,
          img: item.image_url || "/yag.jpg",
          description: item.description,
          price: item.price,
          stock: item.stock,
          category: item.category,
        }));

        setProducts(formatted);
      }
    };

    getProducts();
  }, []);

  const categories = useMemo(() => {
    const dynamic = products
      .map((p) => p.category)
      .filter((c) => c && c.trim() !== "");

    return ["Tümü", ...new Set(dynamic)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const categoryMatch =
        selectedCategory === "Tümü" || item.category === selectedCategory;

      const searchMatch =
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [products, selectedCategory, search]);

  return (
    <div className="site">
      <section className="section" id="urunler">
        <div className="container">
          <div className="section-top">
            <span className="section-mini">ÜRÜN VİTRİNİ</span>
            <h2>Ürünler</h2>
          </div>

          {/* 🔍 ARAMA */}
          <input
            className="search-input"
            placeholder="Ürün ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="products-layout">
            {/* KATEGORİ */}
            <aside className="category-sidebar">
              <h3>Kategoriler</h3>
              <div className="category-list">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={
                      selectedCategory === cat
                        ? "category-btn active"
                        : "category-btn"
                    }
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </aside>

            {/* ÜRÜNLER */}
            <div className="product-grid">
              {filteredProducts.map((item) => (
                <div className="product-card" key={item.id}>
                  <img src={item.img} className="product-img" />

                  <div className="product-content">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>

                    <p className="price">
                      {Number(item.price || 0).toLocaleString("tr-TR")} TL
                    </p>

                    <p className="stock">Stok: {item.stock}</p>

                    {/* 💬 WHATSAPP */}
                    <a
                      href={`https://wa.me/905437182017?text=Merhaba ${item.name} hakkında bilgi alabilir miyim?`}
                      target="_blank"
                      className="whatsapp-btn"
                    >
                      WhatsApp Sor
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
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