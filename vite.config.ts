import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Vite's defaults, plus the local secrets folder: the dev server must never serve it.
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "**/.secrets/**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
  @use "@/styles/mixins.scss"   as m;
`,
      },
    },
  },
})
