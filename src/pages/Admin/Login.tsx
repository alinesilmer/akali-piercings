import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Eye, EyeOff } from "lucide-react";

import { useAuth } from "../../components/admin/auth";
import { Button } from "../../components/ui/Button";
import { RingMark } from "../../components/deco";
import { loginSchema } from "../../schemas/auth";
import { fieldErrors } from "../../schemas/shared";
import s from "./Login.module.scss";

const AUTH_ERRORS: Record<string, string> = {
  "auth/user-not-found": "Email o contraseña incorrectos.",
  "auth/wrong-password": "Email o contraseña incorrectos.",
  "auth/invalid-credential": "Email o contraseña incorrectos.",
  "auth/invalid-email": "El email no es válido.",
  "auth/too-many-requests": "Demasiados intentos. Probá de nuevo más tarde.",
};

export function Login() {
  const { login, logout, user, isAdmin, loading } = useAuth();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [failure, setFailure] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!loading && isAdmin) return <Navigate to="/admin/dashboard" replace />;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFailure(null);

    const data = new FormData(event.currentTarget);
    const result = loginSchema.safeParse({ email: data.get("email"), password: data.get("password") });
    if (!result.success) {
      setErrors(fieldErrors(result.error));
      return;
    }
    setErrors({});

    setSubmitting(true);
    try {
      await login(result.data.email, result.data.password);
    } catch (error) {
      const code = error instanceof FirebaseError ? error.code : "";
      setFailure(AUTH_ERRORS[code] ?? "No se pudo iniciar sesión. Intentá de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const notAdmin = !loading && user && !isAdmin;

  return (
    <main className={s.login}>
      <form className={s.form} onSubmit={submit} noValidate>
        <div className={s.brand}>
          <h1>
            <RingMark size={22} />
            Akali
          </h1>
          <span className={s.mono}>Panel de administración</span>
        </div>

        {failure && (
          <span className={s.error} role="alert">
            {failure}
          </span>
        )}
        {notAdmin && (
          <span className={s.error} role="alert">
            Esta cuenta no tiene acceso al panel.{" "}
            <Button variant="link" onClick={logout}>
              Cerrar sesión
            </Button>
          </span>
        )}

        <label className={`${s.field} ${errors.email ? s.invalid : ""}`}>
          <span>Email</span>
          <input name="email" type="email" autoComplete="username" autoFocus />
          {errors.email && <span className={s.error}>{errors.email}</span>}
        </label>

        <label className={`${s.field} ${errors.password ? s.invalid : ""}`}>
          <span>Contraseña</span>
          <div className={s.password}>
            <input name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" />
            <Button
              variant="icon"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((value) => !value)}
            >
              {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
            </Button>
          </div>
          {errors.password && <span className={s.error}>{errors.password}</span>}
        </label>

        <Button type="submit" variant="solid" className={s.submit} disabled={submitting || loading}>
          {submitting ? "Ingresando…" : "Ingresar"}
        </Button>
        <Button variant="link" to="/" className={s.back}>
          Volver al sitio
        </Button>
      </form>
    </main>
  );
}
