import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const basePath: string = "/semillero-patrimonio";

// https://vite.dev/config/
export default defineConfig({ plugins: [react()], base: basePath });
