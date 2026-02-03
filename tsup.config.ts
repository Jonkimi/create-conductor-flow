import { defineConfig } from "tsup";
import fs from "fs-extra";
import { join } from "path";

export default defineConfig({
	entry: ["src/index.ts"],
	outDir: "dist",
	format: "esm",
	dts: false,
	clean: true,
	sourcemap: false,
	external: [
		"fs-extra",
		"inquirer",
		"smol-toml",
		"yargs",
		"path",
		"url",
		"fs/promises",
	],
	bundle: true,
	splitting: false,
	minify: false,
	shims: true,
	target: "node18",
	platform: "node",
	async onSuccess() {
		// Copy templates to dist after successful build
		const srcTemplates = join(process.cwd(), "src/conductor");
		const distTemplates = join(process.cwd(), "dist/conductor");
		if (fs.existsSync(srcTemplates)) {
			await fs.copy(srcTemplates, distTemplates);
			console.log("✓ Templates copied to dist/conductor");
		}
	},
});
