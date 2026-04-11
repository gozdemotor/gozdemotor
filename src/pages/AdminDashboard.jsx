import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const initialForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  category: "",
  image_url: "",
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return products;

    return products.filter((item) => {
      return (
        item.name?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q)
      );
    });
  }, [products, search]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setPageLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage("Ürünler alınırken hata oluştu.");
      setProducts([]);
    } else {
      setProducts(data || []);
    }

    setPageLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setSelectedFile(null);
    setEditingId(null);
  };

  const uploadImageIfNeeded = async () => {
    if (!selectedFile) {
      return form.image_url.trim();
    }

    const fileExt = selectedFile.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${fileExt}`;

    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(filePath, selectedFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error("Fotoğraf yüklenemedi.");
    }

    const { data } = supabase.storage.from("products").getPublicUrl(filePath);

    return data?.publicUrl || "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const finalImageUrl = await uploadImageIfNeeded();

      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price) || 0,
        stock: Number(form.stock) || 0,
        category: form.category.trim(),
        image_url: finalImageUrl,
      };

      if (!payload.name) {
        throw new Error("Ürün adı zorunlu.");
      }

      if (editingId) {
        const { error } = await supabase
          .from("products")
          .update(payload)
          .eq("id", editingId);

        if (error) throw error;

        setMessage("Ürün başarıyla güncellendi.");
      } else {
        const { error } = await supabase.from("products").insert([payload]);

        if (error) throw error;

        setMessage("Ürün başarıyla eklendi.");
      }

      resetForm();
      await getProducts();
    } catch (error) {
      setMessage(error.message || "İşlem sırasında hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setSelectedFile(null);
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price ?? "",
      stock: product.stock ?? "",
      category: product.category || "",
      image_url: product.image_url || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Bu ürünü silmek istediğine emin misin?");
    if (!ok) return;

    setMessage("");

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      setMessage("Ürün silinirken hata oluştu.");
      return;
    }

    setMessage("Ürün silindi.");
    await getProducts();
  };

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-wrap">
        <div className="admin-dashboard-header">
          <div>
            <div className="admin-panel-badge">GÖZDE MOTOR ADMIN</div>
            <h1>Admin Panel</h1>
            <p>Buradan ürün ekleyebilir, düzenleyebilir, silebilir ve stok yönetebilirsin.</p>
          </div>

          <div className="admin-dashboard-actions">
            <button className="admin-secondary-btn" onClick={() => navigate("/")}>
              Siteye Dön
            </button>
            <button className="admin-primary-btn" onClick={handleLogout}>
              Çıkış Yap
            </button>
          </div>
        </div>

        {message ? <div className="admin-alert">{message}</div> : null}

        <div className="admin-panel-layout">
          <div className="admin-form-box">
            <h2>{editingId ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}</h2>

            <form onSubmit={handleSubmit} className="product-form">
              <div className="product-form-grid">
                <div className="product-field">
                  <label>Ürün Adı</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Örnek: Castrol 10W40"
                    required
                  />
                </div>

                <div className="product-field">
                  <label>Kategori</label>
                  <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Örnek: Motor Yağı"
                  />
                </div>

                <div className="product-field">
                  <label>Fiyat</label>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>

                <div className="product-field">
                  <label>Stok</label>
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="product-field">
                <label>Açıklama</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Ürün açıklaması"
                  rows={4}
                />
              </div>

              <div className="product-form-grid">
                <div className="product-field">
                  <label>Fotoğraf URL</label>
                  <input
                    name="image_url"
                    value={form.image_url}
                    onChange={handleChange}
                    placeholder="İstersen direkt görsel linki gir"
                  />
                </div>

                <div className="product-field">
                  <label>Bilgisayardan Fotoğraf Yükle</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>

              <div className="admin-form-actions">
                <button type="submit" className="admin-primary-btn" disabled={loading}>
                  {loading
                    ? "Kaydediliyor..."
                    : editingId
                    ? "Ürünü Güncelle"
                    : "Ürün Ekle"}
                </button>

                <button
                  type="button"
                  className="admin-secondary-btn"
                  onClick={resetForm}
                >
                  Temizle
                </button>
              </div>
            </form>
          </div>

          <div className="admin-list-box">
            <div className="admin-list-top">
              <h2>Ürünler</h2>

              <input
                className="admin-search-input"
                type="text"
                placeholder="Ürün ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {pageLoading ? (
              <div className="admin-empty-box">Ürünler yükleniyor...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="admin-empty-box">Henüz ürün yok.</div>
            ) : (
              <div className="admin-product-list">
                {filteredProducts.map((product) => (
                  <div className="admin-product-card" key={product.id}>
                    <div className="admin-product-image-wrap">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="admin-product-image"
                        />
                      ) : (
                        <div className="admin-no-image">Fotoğraf Yok</div>
                      )}
                    </div>

                    <div className="admin-product-content">
                      <div className="admin-product-top">
                        <div>
                          <h3>{product.name}</h3>
                          <p className="admin-product-category">
                            {product.category || "Kategori yok"}
                          </p>
                        </div>

                        <div className="admin-stock-badge">
                          Stok: {product.stock ?? 0}
                        </div>
                      </div>

                      <p className="admin-product-desc">
                        {product.description || "Açıklama yok"}
                      </p>

                      <div className="admin-product-meta">
                        <span>{Number(product.price || 0).toLocaleString("tr-TR")} TL</span>
                      </div>

                      <div className="admin-card-actions">
                        <button
                          className="admin-secondary-btn"
                          onClick={() => handleEdit(product)}
                        >
                          Düzenle
                        </button>

                        <button
                          className="admin-danger-btn"
                          onClick={() => handleDelete(product.id)}
                        >
                          Sil
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}