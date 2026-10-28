import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: "./lib/index.ts",
			name: "jposta",
			fileName: "index",
			formats: ["es", "cjs"],
		},
	},
});
