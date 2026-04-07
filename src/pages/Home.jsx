import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h1 style={styles.title}>Gözde Motor</h1>
          <p style={styles.subtitle}>Yedek parça ve aksesuar</p>

          <div style={styles.actions}>
            <Link to="/admin/login" style={styles.button}>
              Admin Girişi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 40%, #2a0000 100%)",
    color: "#ffffff",
  },
  overlay: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    boxSizing: "border-box",
  },
  card: {
    width: "100%",
    maxWidth: "520px",
    background: "rgba(20,20,20,0.92)",
    border: "1px solid #2f2f2f",
    borderRadius: "20px",
    padding: "32px",
    textAlign: "center",
    boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
  },
  title: {
    margin: 0,
    fontSize: "42px",
    fontWeight: 800,
    color: "#ffffff",
  },
  subtitle: {
    marginTop: "10px",
    marginBottom: "24px",
    color: "#d1d1d1",
    fontSize: "16px",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    display: "inline-block",
    textDecoration: "none",
    background: "#d00000",
    color: "#ffffff",
    padding: "12px 20px",
    borderRadius: "12px",
    fontWeight: 700,
  },
};