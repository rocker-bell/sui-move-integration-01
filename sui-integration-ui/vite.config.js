import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/sui-move-integration-01/",
  optimizeDeps: {
    include: ["@mysten/sui.js", "poseidon-lite"], // 🔥 pre-bundle Sui.js for the browser
  },
  resolve: {
    dedupe: ["@mysten/sui.js", "poseidon-lite"],
  },
});