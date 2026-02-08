import { execSync } from "child_process";

let cachedResult: boolean | undefined;

/**
 * Checks whether `git` is available on the system PATH.
 * The result is cached for the lifetime of the process.
 *
 * @returns true if `git --version` succeeds, false otherwise
 */
export function isGitAvailable(): boolean {
	if (cachedResult !== undefined) {
		return cachedResult;
	}

	try {
		execSync("git --version", { stdio: "ignore" });
		cachedResult = true;
	} catch {
		cachedResult = false;
	}

	return cachedResult;
}

/**
 * Resets the cached git-availability result.
 * Intended for testing only.
 */
export function resetGitAvailableCache(): void {
	cachedResult = undefined;
}

import { existsSync } from "fs";
import { join } from "path";

/**
 * Checks if the given directory path is a git repository by looking for a .git directory.
 * This is a synchronous check.
 *
 * @param targetPath The directory path to check
 * @returns true if .git exists in the target path
 */
export function isGitRepository(targetPath: string): boolean {
	const gitDir = join(targetPath, ".git");
	return existsSync(gitDir);
}
