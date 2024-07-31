import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import Unfonts from "unplugin-fonts/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Unfonts({
      custom: {
        families: [
          {
            name: "Geist",
            src: "./src/assets/fonts/geist-sans/*.woff2",
          },
          {
            name: "GeistMono",
            src: "./src/assets/fonts/geist-mono/*.woff2",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
