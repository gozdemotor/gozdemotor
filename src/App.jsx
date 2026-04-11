.nav-admin-link {
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 59, 59, 0.22);
  background: rgba(255, 0, 0, 0.08);
}

.nav-admin-link:hover {
  color: #ffffff;
  border-color: rgba(255, 59, 59, 0.45);
  background: rgba(255, 0, 0, 0.14);
}

.admin-auth-page,
.admin-dashboard-page {
  min-height: 100vh;
  background:
    linear-gradient(rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.9)),
    url("/bg.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 32px 20px;
}

.admin-auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-auth-card {
  width: 100%;
  max-width: 460px;
  background: rgba(14, 14, 14, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.34);
}

.admin-auth-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.admin-back-link {
  color: rgba(255, 255, 255, 0.78);
  font-weight: 600;
}

.admin-back-link:hover {
  color: #ff4a4a;
}

.admin-panel-badge {
  display: inline-block;
  padding: 9px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 59, 59, 0.35);
  background: rgba(255, 0, 0, 0.08);
  color: #ffb3b3;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 700;
}

.admin-auth-card h1,
.admin-dashboard-header h1 {
  font-size: 34px;
  font-weight: 900;
}

.admin-auth-card p,
.admin-dashboard-header p {
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.74);
  line-height: 1.7;
}

.admin-auth-form {
  display: grid;
  gap: 12px;
  margin-top: 22px;
}

.admin-auth-form input {
  width: 100%;
  min-height: 54px;
  padding: 0 16px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.04);
  color: #ffffff;
  font-size: 15px;
  outline: none;
}

.admin-auth-form input::placeholder {
  color: rgba(255, 255, 255, 0.42);
}

.admin-auth-form input:focus {
  border-color: rgba(255, 59, 59, 0.55);
  box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.12);
}

.admin-submit-btn,
.admin-primary-btn,
.admin-secondary-btn,
.admin-switch-btn {
  min-height: 52px;
  border-radius: 14px;
  font-weight: 800;
  font-size: 15px;
  cursor: pointer;
  transition: 0.25s;
}

.admin-submit-btn,
.admin-primary-btn {
  border: none;
  background: linear-gradient(135deg, #ff2a2a, #b80000);
  color: #ffffff;
  box-shadow: 0 10px 25px rgba(255, 0, 0, 0.2);
}

.admin-submit-btn:hover,
.admin-primary-btn:hover,
.admin-secondary-btn:hover,
.admin-switch-btn:hover {
  transform: translateY(-2px);
}

.admin-submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.admin-switch-btn,
.admin-secondary-btn {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: #ffffff;
}

.admin-switch-btn {
  width: 100%;
  margin-top: 12px;
}

.admin-auth-message {
  margin-top: 16px;
  padding: 14px 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.6;
}

.admin-dashboard-wrap {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
}

.admin-dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.admin-dashboard-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.admin-primary-btn,
.admin-secondary-btn {
  padding: 0 20px;
}

.admin-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.admin-box {
  background: rgba(14, 14, 14, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 22px;
  padding: 24px;
}

.admin-box h2 {
  font-size: 22px;
  margin-bottom: 10px;
}

.admin-box p {
  color: rgba(255, 255, 255, 0.74);
  line-height: 1.7;
}

@media (max-width: 900px) {
  .admin-grid {
    grid-template-columns: 1fr;
  }
}

.admin-panel-layout {
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 20px;
  align-items: start;
}

.admin-form-box,
.admin-list-box {
  background: rgba(14, 14, 14, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 22px;
  padding: 24px;
}

.admin-form-box h2,
.admin-list-box h2 {
  font-size: 24px;
  margin-bottom: 18px;
}

.admin-alert {
  margin-bottom: 18px;
  padding: 14px 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.86);
}

.product-form {
  display: grid;
  gap: 14px;
}

.product-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.product-field {
  display: grid;
  gap: 8px;
}

.product-field label {
  font-size: 14px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.86);
}

.product-field input,
.product-field textarea {
  width: 100%;
  min-height: 52px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.04);
  color: #ffffff;
  font-size: 15px;
  outline: none;
}

.product-field textarea {
  min-height: 110px;
  resize: vertical;
}

.product-field input:focus,
.product-field textarea:focus,
.admin-search-input:focus {
  border-color: rgba(255, 59, 59, 0.55);
  box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.12);
}

.admin-form-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.admin-list-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.admin-search-input {
  width: 280px;
  max-width: 100%;
  min-height: 50px;
  padding: 0 14px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.04);
  color: #ffffff;
  outline: none;
}

.admin-product-list {
  display: grid;
  gap: 16px;
}

.admin-product-card {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 18px;
  padding: 14px;
}

.admin-product-image-wrap {
  width: 140px;
  height: 140px;
  border-radius: 14px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
}

.admin-product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.admin-no-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  text-align: center;
  padding: 10px;
}

.admin-product-content h3 {
  font-size: 22px;
  margin-bottom: 4px;
}

.admin-product-top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: start;
  flex-wrap: wrap;
}

.admin-product-category {
  color: #ff8c8c;
  font-size: 14px;
  margin: 0;
}

.admin-stock-badge {
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 0, 0, 0.10);
  border: 1px solid rgba(255, 59, 59, 0.25);
  color: #ffd0d0;
  font-size: 13px;
  font-weight: 700;
}

.admin-product-desc {
  margin-top: 12px;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.65;
}

.admin-product-meta {
  margin-top: 12px;
  font-size: 18px;
  font-weight: 800;
  color: #ffffff;
}

.admin-card-actions {
  display: flex;
  gap: 10px;
  margin-top: 14px;
  flex-wrap: wrap;
}

.admin-danger-btn {
  min-height: 52px;
  padding: 0 20px;
  border-radius: 14px;
  font-weight: 800;
  font-size: 15px;
  cursor: pointer;
  transition: 0.25s;
  border: none;
  background: linear-gradient(135deg, #641111, #a30000);
  color: #ffffff;
}

.admin-danger-btn:hover {
  transform: translateY(-2px);
}

.admin-empty-box {
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.66);
  text-align: center;
  padding: 20px;
}

@media (max-width: 1100px) {
  .admin-panel-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .product-form-grid {
    grid-template-columns: 1fr;
  }

  .admin-product-card {
    grid-template-columns: 1fr;
  }

  .admin-product-image-wrap {
    width: 100%;
    height: 220px;
  }
}

.products-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 20px;
  align-items: start;
}

.category-sidebar {
  position: sticky;
  top: 120px;
  background: rgba(14, 14, 14, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 20px;
}

.category-sidebar h3 {
  margin-bottom: 16px;
  font-size: 22px;
  font-weight: 800;
}

.category-list {
  display: grid;
  gap: 10px;
}

.category-btn {
  width: 100%;
  min-height: 48px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  transition: 0.25s;
  padding: 0 14px;
  text-align: left;
}

.category-btn:hover {
  transform: translateY(-1px);
  border-color: rgba(255, 0, 0, 0.35);
}

.category-btn.active {
  background: linear-gradient(135deg, #ff2a2a, #b80000);
  border-color: transparent;
  color: #ffffff;
  box-shadow: 0 10px 24px rgba(255, 0, 0, 0.2);
}

.products-content {
  min-width: 0;
}

@media (max-width: 1024px) {
  .products-layout {
    grid-template-columns: 1fr;
  }

  .category-sidebar {
    position: static;
  }
}