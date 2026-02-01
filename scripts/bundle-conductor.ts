import { execSync } from "child_process";
import fs from "fs-extra";
import { join } from "path";
import { fileURLToPath } from "url";
import { DEFAULT_REPO, DEFAULT_BRANCH } from "../src/utils/template.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const TEMPLATES_DIR = join(ROOT, "src/conductor");

async function main() {
	console.log("Bundling templates...");

	// Ensure parent dir exists
	await fs.ensureDir(ROOT);

	// Check if src/templates exists
	if (fs.existsSync(TEMPLATES_DIR)) {
		console.log("Cleaning existing templates...");
		await fs.remove(TEMPLATES_DIR);
	}
	await fs.ensureDir(TEMPLATES_DIR);

	// Clone
	console.log(`Cloning ${DEFAULT_REPO}...`);
	try {
		execSync(`git clone ${DEFAULT_REPO} --depth 1 -b ${DEFAULT_BRANCH} .`, {
			cwd: TEMPLATES_DIR,
			stdio: "inherit",
		});
	} catch (e) {
		console.error("Failed to clone templates:", e);
		process.exit(1);
	}

	// Cleanup git
	await fs.remove(join(TEMPLATES_DIR, ".git"));
	await fs.remove(join(TEMPLATES_DIR, ".github"));

	console.log("Templates bundled successfully from remote.");
}

main().catch(console.error);
