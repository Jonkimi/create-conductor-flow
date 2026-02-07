import { readFile } from "fs/promises";
import { join, resolve } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import { createHash } from "crypto";
import fs from "fs-extra";
import { getTemplatesCacheDir } from "./migrate.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export const DEFAULT_REPO =
	"https://github.com/gemini-cli-extensions/conductor";
export const DEFAULT_BRANCH = "main";

/**
 * Gets the cache directory for a specific repo/branch combination.
 * Uses XDG-compliant base path from config module.
 *
 * @param repo - Git repository URL
 * @param branch - Branch name
 * @returns Cache directory path for this repo/branch
 */
export function getRepoCacheDir(
	repo: string = DEFAULT_REPO,
	branch: string = DEFAULT_BRANCH,
): string {
	const hash = createHash("md5").update(`${repo}#${branch}`).digest("hex");
	return join(getTemplatesCacheDir(), hash);
}

/**
 * @deprecated Use getRepoCacheDir instead. This is kept for backward compatibility.
 */
export function getCacheDir(
	repo: string = DEFAULT_REPO,
	branch: string = DEFAULT_BRANCH,
): string {
	return getRepoCacheDir(repo, branch);
}

export async function ensureTemplates(
	repo: string = DEFAULT_REPO,
	branch: string = DEFAULT_BRANCH,
): Promise<void> {
	const cacheDir = getCacheDir(repo, branch);

	if (!fs.existsSync(cacheDir)) {
		await fs.ensureDir(cacheDir);
		console.log(`Downloading templates from ${repo} [${branch}]...`);
		try {
			execSync(`git clone ${repo} --branch ${branch} --depth 1 .`, {
				cwd: cacheDir,
				stdio: ["ignore", "ignore", "pipe"],
			});
		} catch (e) {
			await fs.remove(cacheDir);
			throw new Error(
				`Failed to clone templates: ${e instanceof Error ? e.message : String(e)}`,
			);
		}
	} else {
		// Cache exists, try to update
		try {
			console.log(`Updating templates from ${repo} [${branch}]...`);
			execSync("git pull --rebase", {
				cwd: cacheDir,
				stdio: ["ignore", "ignore", "pipe"],
			});
		} catch (e) {
			console.warn(
				`Failed to update templates (using cached version): ${e instanceof Error ? e.message : String(e)}`,
			);
		}
	}
}

export function substituteVariables(
	template: string,
	variables: Record<string, string>,
): string {
	return template.replace(/\{(\w+)\}/g, (match, key) => {
		if (Object.prototype.hasOwnProperty.call(variables, key)) {
			return variables[key];
		}
		return match;
	});
}

export function getBundledTemplateRoot(): string {
	// Check for templates in ./templates (production bundle structure)
	const prodDest = resolve(__dirname, "conductor");
	if (fs.existsSync(prodDest)) {
		return prodDest;
	}

	// Fallback to ../templates (development source structure)
	return resolve(__dirname, "../conductor");
}

export async function getTemplateRoot(
	repo?: string,
	branch?: string,
): Promise<string> {
	// If no remote repo provided, use bundled logic
	if (!repo) {
		const bundledRoot = getBundledTemplateRoot();
		if (await fs.pathExists(bundledRoot)) {
			console.log("use bundled Conductor templates");
			return bundledRoot;
		}
	}

	await ensureTemplates(repo, branch);
	return getCacheDir(repo, branch);
}

export async function loadTemplate(
	templatePath: string,
	rootDir: string,
): Promise<string> {
	const fullPath = join(rootDir, templatePath);
	return readFile(fullPath, "utf-8");
}
