import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

const manifest = {
  theme_color: "#2dac5c",
  background_color: "#2dac5c",
  display: "standalone",
  scope: "/",
  start_url: "/",
  short_name: "Ganatech",
  description: "Ganatech pwa Demo",
  name: "Ganatech Pwa",
  icons: [
    {
      src: "/icon-512x512.png",
      sizes: "497x497",
      type: "image/png",
    },
  ],
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/www\.ganatech\.me\//,
            handler: "CacheFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
        ],
      },
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
