import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import { imagePickerPlugin } from "./scripts/image-picker-server";

export default defineConfig({
  plugins: [react(), tailwind(), imagePickerPlugin()],
  server: { host: true },
});
