import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()] as any, // Explicit cast
  test: {
    setupFiles: "./setupTests.ts",
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.{js,ts,jsx,tsx}", "src/**/*.spec.{js,ts,jsx,tsx}"],
  },
});
