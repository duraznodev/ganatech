import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
const manifest = {
  theme_color: "#f69435",
  background_color: "#f69435",
  display: "standalone",
  scope: "/",
  start_url: "/",
  short_name: "Vite PWA",
  description: "Vite PWA Demo",
  name: "Vite PWA",
  icons: [
    {
      src: "/icon-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "/icon-256x256.png",
      sizes: "256x256",
      type: "image/png",
    },
    {
      src: "/icon-384x384.png",
      sizes: "384x384",
      type: "image/png",
    },
    {
      src: "/icon-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // devOptions: { enabled: true },
      // add this to cache all the imports
      workbox: {
        globPatterns: ["**/*"],
      },
      // add this to cache all the
      // static assets in the public folder
      includeAssets: ["**/*"],
      manifest,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
