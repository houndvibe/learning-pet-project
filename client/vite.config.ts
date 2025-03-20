import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      checker({
        typescript: true,
      }),
    ],
    server: {
      port: 3000,
    },
    define: {
      __API__: JSON.stringify(
        mode === "development" ? "http://localhost:7000/api" : "/api"
      ),
    },
  };
});
