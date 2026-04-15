import { lazy, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Public layout
import Navbar from "./components/molecules/ui/Navbar/Navbar";
import Footer from "./components/molecules/ui/Footer/Footer";

// Public pages — eager loaded (needed immediately)
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Contact from "./pages/Contact/Contact";

// Admin — lazy loaded so they are excluded from the public bundle
const AdminRoute    = lazy(() => import("./components/admin/AdminRoute").then(m => ({ default: m.AdminRoute })));
const AdminLayout   = lazy(() => import("./components/admin/AdminLayout").then(m => ({ default: m.AdminLayout })));
const AdminLogin    = lazy(() => import("./pages/Admin/Login/AdminLogin").then(m => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() => import("./pages/Admin/Dashboard/AdminDashboard").then(m => ({ default: m.AdminDashboard })));
const CategoryList  = lazy(() => import("./pages/Admin/Categories/CategoryList").then(m => ({ default: m.CategoryList })));
const CategoryForm  = lazy(() => import("./pages/Admin/Categories/CategoryForm").then(m => ({ default: m.CategoryForm })));
const ProductList   = lazy(() => import("./pages/Admin/Products/ProductList").then(m => ({ default: m.ProductList })));
const ProductForm   = lazy(() => import("./pages/Admin/Products/ProductForm").then(m => ({ default: m.ProductForm })));
const ServiceList   = lazy(() => import("./pages/Admin/Services/ServiceList").then(m => ({ default: m.ServiceList })));
const ServiceForm   = lazy(() => import("./pages/Admin/Services/ServiceForm").then(m => ({ default: m.ServiceForm })));

// Minimal fallback shown while admin chunks download (spinner matches brand)
function AdminFallback() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#0e0e0e" }}>
      <div style={{ width: 40, height: 40, border: "3px solid rgba(194,180,138,0.2)", borderTopColor: "#c2b48a", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* ── Admin routes ─────────────────────────────────────────────────
          No Navbar / Footer. Login is public; everything else is guarded.
          Wrapped in Suspense so lazy chunks load with a branded spinner. */}
      <Route path="/admin/login" element={<Suspense fallback={<AdminFallback />}><AdminLogin /></Suspense>} />

      <Route path="/admin" element={<Suspense fallback={<AdminFallback />}><AdminRoute /></Suspense>}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="categorias" element={<CategoryList />} />
          <Route path="categorias/nueva" element={<CategoryForm />} />
          <Route path="categorias/:id/editar" element={<CategoryForm />} />
          <Route path="productos" element={<ProductList />} />
          <Route path="productos/nuevo" element={<ProductForm />} />
          <Route path="productos/:id/editar" element={<ProductForm />} />
          <Route path="servicios" element={<ServiceList />} />
          <Route path="servicios/nuevo" element={<ServiceForm />} />
          <Route path="servicios/:id/editar" element={<ServiceForm />} />
        </Route>
      </Route>

      {/* ── Public routes ─────────────────────────────────────────────────
          Wrapped in the shared Navbar + Footer layout. */}
      <Route
        path="/*"
        element={
          <div className="app">
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/nosotros" element={<About />} />
                <Route path="/servicios" element={<Services />} />
                <Route path="/contacto" element={<Contact />} />
              </Routes>
            </AnimatePresence>
            <Footer />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
