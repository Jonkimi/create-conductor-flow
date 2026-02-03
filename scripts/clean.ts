import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, "..");
const distPath = path.resolve(rootDir, "dist");

async function clean() {
	if (await fs.pathExists(distPath)) {
		console.log(`Cleaning ${distPath}...`);
		await fs.remove(distPath);
		console.log("Clean completed.");
	} else {
		console.log(
			"Detailed check: dist directory does not exist, nothing to clean.",
		);
	}
}

clean().catch((err) => {
	console.error("Error while cleaning:", err);
	process.exit(1);
});
