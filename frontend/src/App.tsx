import { Route, Routes } from "react-router-dom";

import { AdminLayout } from "./components/admin/AdminLayout";
import { RequireAdmin } from "./components/admin/RequireAdmin";
import { Layout } from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";
import { AdminCategoriesPage } from "./pages/admin/AdminCategoriesPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminProductsPage } from "./pages/admin/AdminProductsPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ShopPage } from "./pages/ShopPage";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin: the login page is open, everything else needs a signed-in admin */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<RequireAdmin />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="products" element={<AdminProductsPage />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}
