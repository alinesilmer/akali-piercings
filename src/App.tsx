import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { SiteLayout } from "./components/layout/SiteLayout";
import Home from "./pages/Home/Home";

const About = lazy(() => import("./pages/About/About"));
const Services = lazy(() => import("./pages/Services/Services"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Admin = lazy(() => import("./pages/Admin/Admin"));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="nosotros" element={<About />} />
          <Route path="servicios" element={<Services />} />
          <Route path="contacto" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
