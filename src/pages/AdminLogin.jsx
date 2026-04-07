import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setMessage(error.message);
          setLoading(false);
          return;
        }

        navigate("/admin");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          setMessage(error.message);
        } else {
          setMessage(
            "Kayıt başarılı. Mail doğrulama açıksa onayla, sonra giriş yap."
          );
          setMode("login");
        }
      }
    } catch (error) {
      setMessage("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-auth-page">
      <div className="admin-auth-card">
        <div className="admin-auth-top">
          <Link to="/" className="admin-back-link">
            ← Ana sayfaya dön
          </Link>
          <div className="admin-panel-badge">GÖZDE MOTOR ADMIN</div>
        </div>

        <h1>{isLogin ? "Admin Giriş" : "Admin Kayıt"}</h1>
        <p>
          {isLogin
            ? "Yetkili hesabınla giriş yap."
            : "Önce kayıt ol, sonra seni admin olarak yetkilendirelim."}
        </p>

        <form onSubmit={handleSubmit} className="admin-auth-form">
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading} className="admin-submit-btn">
            {loading ? "Bekle..." : isLogin ? "Giriş Yap" : "Kayıt Ol"}
          </button>
        </form>

        <button
          type="button"
          className="admin-switch-btn"
          onClick={() => {
            setMode(isLogin ? "register" : "login");
            setMessage("");
          }}
        >
          {isLogin ? "Hesabın yoksa kayıt ol" : "Zaten hesabın varsa giriş yap"}
        </button>

        {message ? <div className="admin-auth-message">{message}</div> : null}
      </div>
    </div>
  );
}