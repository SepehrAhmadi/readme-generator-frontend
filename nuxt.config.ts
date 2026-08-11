import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt"],
  shadcn: {
    prefix: "",
    componentDir: "@/components/ui",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      htmlAttrs: {
        class: "dark",
      },
    },
  },
});
