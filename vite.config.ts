import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import { imagePickerPlugin } from "./scripts/image-picker-server";

export default defineConfig(({ mode }) => {
  // Load .env / .env.local — PICKER_PASSWORD gates the image-picker API.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tailwind(), imagePickerPlugin(env.PICKER_PASSWORD)],
    server: { host: true },
  };
});
