import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-wrap">
        <div className="admin-dashboard-header">
          <div>
            <div className="admin-panel-badge">GÖZDE MOTOR ADMIN</div>
            <h1>Admin Panel</h1>
            <p>Giriş başarılı. Şimdi buraya ürün yönetimi bağlayacağız.</p>
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

        <div className="admin-grid">
          <div className="admin-box">
            <h2>Durum</h2>
            <p>Admin girişi aktif. Yetkili kullanıcılar buraya erişebilir.</p>
          </div>

          <div className="admin-box">
            <h2>Sıradaki Adım</h2>
            <p>Ürün ekleme, silme ve güncelleme ekranını bu panelin içine bağlayacağız.</p>
          </div>

          <div className="admin-box">
            <h2>Supabase</h2>
            <p>admins tablosunda olan kullanıcılar paneli açabilecek.</p>
          </div>
        </div>
      </div>
    </div>
  );
}