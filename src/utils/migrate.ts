/**
 * Cache Migration Module
 *
 * Handles migration of cached templates from the legacy location
 * (~/.gemini/cache/conductor) to the new XDG-compliant location.
 */

import { join } from "path";
import { homedir } from "os";
import fs from "fs-extra";
import { getCacheDir } from "./config.js";

/**
 * Legacy cache directory path (old location).
 */
const LEGACY_CACHE_PATH = ".gemini/cache/conductor";

/**
 * Subdirectory in the new cache for templates.
 */
export const TEMPLATES_SUBDIR = "templates";

/**
 * Gets the legacy cache directory path.
 *
 * Supports CONDUCTOR_LEGACY_CACHE_DIR env override for testing.
 *
 * @returns The legacy cache directory path
 */
export function getLegacyCacheDir(): string {
	if (process.env.CONDUCTOR_LEGACY_CACHE_DIR) {
		return process.env.CONDUCTOR_LEGACY_CACHE_DIR;
	}
	return join(homedir(), LEGACY_CACHE_PATH);
}

/**
 * Gets the new templates cache directory path.
 *
 * @returns The new templates cache directory path
 */
export function getTemplatesCacheDir(): string {
	return join(getCacheDir(), TEMPLATES_SUBDIR);
}

/**
 * Checks if a directory is empty or doesn't exist.
 *
 * @param dirPath - Directory path to check
 * @returns true if directory is empty or doesn't exist
 */
async function isDirectoryEmpty(dirPath: string): Promise<boolean> {
	if (!(await fs.pathExists(dirPath))) {
		return true;
	}

	const contents = await fs.readdir(dirPath);
	return contents.length === 0;
}

/**
 * Migrates cached templates from the legacy location to the new XDG location.
 *
 * Migration only occurs if:
 * 1. The legacy cache directory exists
 * 2. The new cache directory is empty or doesn't exist
 *
 * After successful migration, the legacy cache is NOT automatically deleted
 * to be safe. Users can manually remove ~/.gemini/cache/conductor if desired.
 *
 * @returns true if migration was performed, false otherwise
 */
export async function migrateCache(): Promise<boolean> {
	const legacyDir = getLegacyCacheDir();
	const newDir = getTemplatesCacheDir();

	try {
		// Check if legacy cache exists
		if (!(await fs.pathExists(legacyDir))) {
			return false;
		}

		// Check if new cache already has content (don't overwrite)
		if (!(await isDirectoryEmpty(newDir))) {
			console.log("[Migration] New cache already exists, skipping migration");
			console.log(
				`[Migration] You can safely remove the old cache at: ${legacyDir}`,
			);
			return false;
		}

		// Perform migration
		console.log(
			`[Migration] Migrating cache from ${legacyDir} to ${newDir}...`,
		);

		// Ensure parent directory exists
		await fs.ensureDir(newDir);

		// Copy all contents from legacy to new location
		await fs.copy(legacyDir, newDir, { overwrite: false });

		console.log("[Migration] Cache migration completed successfully");
		console.log(
			`[Migration] You can safely remove the old cache at: ${legacyDir}`,
		);

		return true;
	} catch (error) {
		// Log error but don't fail - migration is not critical
		console.warn(
			"[Migration] Failed to migrate cache:",
			error instanceof Error ? error.message : error,
		);
		return false;
	}
}
