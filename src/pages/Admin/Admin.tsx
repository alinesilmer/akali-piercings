import { Navigate, Route, Routes } from "react-router-dom";

import { AdminLayout } from "../../components/admin/AdminLayout";
import { AuthProvider } from "../../components/admin/AuthProvider";
import { CategoryForm, CategoryList } from "./Categories";
import { Dashboard } from "./Dashboard";
import { Login } from "./Login";
import { ProductForm, ProductList } from "./Products";
import { ServiceForm, ServiceList } from "./Services";

export default function Admin() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categorias" element={<CategoryList />} />
          <Route path="categorias/nueva" element={<CategoryForm />} />
          <Route path="categorias/:id/editar" element={<CategoryForm />} />
          <Route path="productos" element={<ProductList />} />
          <Route path="productos/nuevo" element={<ProductForm />} />
          <Route path="productos/:id/editar" element={<ProductForm />} />
          <Route path="servicios" element={<ServiceList />} />
          <Route path="servicios/nuevo" element={<ServiceForm />} />
          <Route path="servicios/:id/editar" element={<ServiceForm />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
