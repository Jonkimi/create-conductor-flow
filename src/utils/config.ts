/**
 * Persistent Configuration Module
 *
 * Provides XDG-compliant configuration and cache directory resolution,
 * and persistent configuration storage for user preferences.
 *
 * Supports environment variable overrides for testing:
 * - CONDUCTOR_CONFIG_DIR: Override config directory path
 * - CONDUCTOR_CACHE_DIR: Override cache directory path
 */

import { join } from "path";
import { homedir, platform } from "os";
import fs from "fs-extra";

/**
 * Name of the application, used for directory naming.
 */
const APP_NAME = "create-conductor-flow";

/**
 * Filename for the configuration file.
 */
const CONFIG_FILENAME = "config.json";

/**
 * Supported git ignore methods.
 */
export type GitIgnoreMethod = "gitignore" | "exclude" | "none";

/**
 * Configuration interface for persisted user preferences.
 */
export interface Config {
	/** The repository URL (Custom or Official) */
	repo?: string;
	/** The branch name */
	branch?: string;
	/** The chosen git ignore strategy */
	gitIgnore?: GitIgnoreMethod;
}

/**
 * Gets the configuration directory path following XDG Base Directory Specification.
 *
 * Priority:
 * 1. CONDUCTOR_CONFIG_DIR environment variable (for testing)
 * 2. XDG_CONFIG_HOME/create-conductor-flow (Linux/macOS)
 * 3. Platform-specific defaults:
 *    - macOS: ~/Library/Application Support/create-conductor-flow
 *    - Linux: ~/.config/create-conductor-flow
 *    - Windows: %APPDATA%/create-conductor-flow
 *
 * @returns The configuration directory path
 */
export function getConfigDir(): string {
	// Check for test override first
	if (process.env.CONDUCTOR_CONFIG_DIR) {
		return process.env.CONDUCTOR_CONFIG_DIR;
	}

	// Check for XDG_CONFIG_HOME (cross-platform env var)
	if (process.env.XDG_CONFIG_HOME) {
		return join(process.env.XDG_CONFIG_HOME, APP_NAME);
	}

	const home = homedir();
	const os = platform();

	switch (os) {
		case "win32":
			// Windows: Use APPDATA or fallback
			return join(
				process.env.APPDATA || join(home, "AppData", "Roaming"),
				APP_NAME,
			);
		case "darwin":
			// macOS: Use Library/Application Support for better macOS integration
			// But also support ~/.config for XDG compliance
			return join(home, ".config", APP_NAME);
		default:
			// Linux and others: Use XDG default
			return join(home, ".config", APP_NAME);
	}
}

/**
 * Gets the cache directory path following XDG Base Directory Specification.
 *
 * Priority:
 * 1. CONDUCTOR_CACHE_DIR environment variable (for testing)
 * 2. XDG_CACHE_HOME/create-conductor-flow (Linux/macOS)
 * 3. Platform-specific defaults:
 *    - macOS: ~/Library/Caches/create-conductor-flow
 *    - Linux: ~/.cache/create-conductor-flow
 *    - Windows: %LOCALAPPDATA%/create-conductor-flow
 *
 * @returns The cache directory path
 */
export function getCacheDir(): string {
	// Check for test override first
	if (process.env.CONDUCTOR_CACHE_DIR) {
		return process.env.CONDUCTOR_CACHE_DIR;
	}

	// Check for XDG_CACHE_HOME (cross-platform env var)
	if (process.env.XDG_CACHE_HOME) {
		return join(process.env.XDG_CACHE_HOME, APP_NAME);
	}

	const home = homedir();
	const os = platform();

	switch (os) {
		case "win32":
			// Windows: Use LOCALAPPDATA or fallback
			return join(
				process.env.LOCALAPPDATA || join(home, "AppData", "Local"),
				APP_NAME,
			);
		case "darwin":
			// macOS: Use XDG-style path for consistency
			return join(home, ".cache", APP_NAME);
		default:
			// Linux and others: Use XDG default
			return join(home, ".cache", APP_NAME);
	}
}

/**
 * Gets the full path to the configuration file.
 *
 * @returns The config.json file path
 */
export function getConfigFilePath(): string {
	return join(getConfigDir(), CONFIG_FILENAME);
}

/**
 * Loads the configuration from disk.
 *
 * @returns The parsed configuration object, or empty object if not found or invalid
 */
export async function loadConfig(): Promise<Config> {
	try {
		const configPath = getConfigFilePath();

		if (!(await fs.pathExists(configPath))) {
			return {};
		}

		const content = await fs.readFile(configPath, "utf-8");
		const parsed = JSON.parse(content);

		// Validate it's an object
		if (
			typeof parsed !== "object" ||
			parsed === null ||
			Array.isArray(parsed)
		) {
			console.warn("[Config] Invalid config format, using defaults");
			return {};
		}

		return parsed as Config;
	} catch (error) {
		// Handle corrupted or invalid JSON
		if (error instanceof SyntaxError) {
			console.warn("[Config] Config file corrupted, using defaults");
		}
		return {};
	}
}

/**
 * Saves configuration to disk.
 *
 * Merges the provided config with existing config to preserve other settings.
 *
 * @param config - Partial configuration to save
 */
export async function saveConfig(config: Partial<Config>): Promise<void> {
	const configPath = getConfigFilePath();
	const configDir = getConfigDir();

	// Ensure directory exists
	await fs.ensureDir(configDir);

	// Load existing config and merge
	const existingConfig = await loadConfig();
	const mergedConfig: Config = {
		...existingConfig,
		...config,
	};

	// Write atomically
	await fs.writeJson(configPath, mergedConfig, { spaces: 2 });
}

/**
 * Clears (deletes) the configuration file.
 *
 * Used for the --reset flag functionality.
 */
export async function clearConfig(): Promise<void> {
	const configPath = getConfigFilePath();

	if (await fs.pathExists(configPath)) {
		await fs.remove(configPath);
	}
}
