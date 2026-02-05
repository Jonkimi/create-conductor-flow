import { execSync } from "child_process";
import fs from "fs-extra";
import { join } from "path";
import { fileURLToPath } from "url";
import { DEFAULT_REPO, DEFAULT_BRANCH } from "../src/utils/template.js";
import { CONDUCTOR_FILE_PREFIX } from "../src/generators/constants.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const TEMPLATES_DIR = join(ROOT, "src/conductor");

async function main() {
	console.log("Bundling templates...");

	// Ensure parent dir exists
	await fs.ensureDir(ROOT);

	// Check if src/templates exists
	if (fs.existsSync(TEMPLATES_DIR)) {
		// console.log("Cleaning existing templates...");
		// await fs.remove(TEMPLATES_DIR);
		console.log("dir src/conductor already exists, skip cloning.");
		return;
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

	// Cleanup unused files
	await fs.remove(join(TEMPLATES_DIR, "README.md"));
	await fs.remove(join(TEMPLATES_DIR, "LICENSE"));
	await fs.remove(join(TEMPLATES_DIR, "CONTRIBUTING.md"));
	await fs.remove(join(TEMPLATES_DIR, "CHANGELOG.md"));
	await fs.remove(join(TEMPLATES_DIR, ".gitignore"));
	await fs.remove(join(TEMPLATES_DIR, ".release-please-manifest.json"));
	await fs.remove(join(TEMPLATES_DIR, "gemini-extension.json"));
	await fs.remove(join(TEMPLATES_DIR, "release-please-config.json"));

	console.log("Processing templates (renaming and replacing content)...");
	await processConductorFiles(TEMPLATES_DIR);

	console.log("Templates bundled successfully from remote.");
}

export async function processConductorFiles(dir: string) {
	const items = await fs.readdir(dir);

	for (const item of items) {
		const fullPath = join(dir, item);
		const stat = await fs.stat(fullPath);

		if (stat.isDirectory()) {
			await processConductorFiles(fullPath);
		} else if (stat.isFile()) {
			// 1. Rename file if it contains colon
			let currentPath = fullPath;
			if (item.includes("conductor:")) {
				const newItem = item.replace(/conductor:/g, CONDUCTOR_FILE_PREFIX);
				const newPath = join(dir, newItem);
				await fs.move(currentPath, newPath);
				currentPath = newPath;
			}

			// 2. Replace content
			// Skip binary files if necessary, but for now assume text or acceptable files
			try {
				const content = await fs.readFile(currentPath, "utf-8");
				if (content.includes("/conductor:")) {
					const newContent = content.replace(
						/\/conductor:/g,
						`/${CONDUCTOR_FILE_PREFIX}`,
					);
					await fs.writeFile(currentPath, newContent, "utf-8");
				}
			} catch (error) {
				// Ignore errors for non-text files or read errors
				// console.warn(`Could not process content of ${currentPath}:`, error);
			}
		}
	}
}

main().catch(console.error);
