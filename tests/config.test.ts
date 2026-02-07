/**
 * Unit tests for persistent configuration module (src/utils/config.ts)
 *
 * Tests XDG-compliant path resolution and configuration persistence.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { join } from "path";
import fs from "fs-extra";
import { tmpdir } from "os";

// We'll import these after the module is created
// import { getConfigDir, getCacheDir, loadConfig, saveConfig, Config } from "../src/utils/config.js";

describe("Config Module", () => {
	const testConfigDir = join(tmpdir(), "conductor-test-config");
	const testCacheDir = join(tmpdir(), "conductor-test-cache");

	beforeEach(async () => {
		// Clean up test directories before each test
		await fs.remove(testConfigDir);
		await fs.remove(testCacheDir);
		// Set environment overrides for testing
		process.env.CONDUCTOR_CONFIG_DIR = testConfigDir;
		process.env.CONDUCTOR_CACHE_DIR = testCacheDir;
	});

	afterEach(async () => {
		// Clean up after tests
		await fs.remove(testConfigDir);
		await fs.remove(testCacheDir);
		delete process.env.CONDUCTOR_CONFIG_DIR;
		delete process.env.CONDUCTOR_CACHE_DIR;
	});

	describe("getConfigDir", () => {
		it("should return CONDUCTOR_CONFIG_DIR when set", async () => {
			const { getConfigDir } = await import("../src/utils/config.js");
			const result = getConfigDir();
			expect(result).toBe(testConfigDir);
		});

		it("should return XDG-compliant path on macOS/Linux when env not set", async () => {
			delete process.env.CONDUCTOR_CONFIG_DIR;
			// Reset module to pick up new env
			vi.resetModules();
			const { getConfigDir } = await import("../src/utils/config.js");
			const result = getConfigDir();

			// Should be in ~/.config/create-conductor-flow on macOS/Linux
			// or %APPDATA%/create-conductor-flow on Windows
			expect(result).toContain("create-conductor-flow");
		});
	});

	describe("getCacheDir", () => {
		it("should return CONDUCTOR_CACHE_DIR when set", async () => {
			const { getCacheDir: getNewCacheDir } = await import(
				"../src/utils/config.js"
			);
			const result = getNewCacheDir();
			expect(result).toBe(testCacheDir);
		});

		it("should return XDG-compliant path when env not set", async () => {
			delete process.env.CONDUCTOR_CACHE_DIR;
			vi.resetModules();
			const { getCacheDir: getNewCacheDir } = await import(
				"../src/utils/config.js"
			);
			const result = getNewCacheDir();

			// Should be in ~/.cache/create-conductor-flow on macOS/Linux
			// or %LOCALAPPDATA%/create-conductor-flow on Windows
			expect(result).toContain("create-conductor-flow");
		});
	});

	describe("loadConfig", () => {
		it("should return empty config when config file does not exist", async () => {
			const { loadConfig } = await import("../src/utils/config.js");
			const config = await loadConfig();
			expect(config).toEqual({});
		});

		it("should load and parse existing config file", async () => {
			// Create a test config file
			await fs.ensureDir(testConfigDir);
			const testConfig = {
				agent: "claude-code",
				repo: "https://github.com/test/repo",
				branch: "main",
				gitIgnore: "gitignore",
			};
			await fs.writeJson(join(testConfigDir, "config.json"), testConfig);

			vi.resetModules();
			const { loadConfig } = await import("../src/utils/config.js");
			const config = await loadConfig();

			expect(config).toEqual(testConfig);
		});

		it("should return empty config when config file is corrupted", async () => {
			await fs.ensureDir(testConfigDir);
			await fs.writeFile(join(testConfigDir, "config.json"), "not valid json{");

			vi.resetModules();
			const { loadConfig } = await import("../src/utils/config.js");
			const config = await loadConfig();

			expect(config).toEqual({});
		});
	});

	describe("saveConfig", () => {
		it("should create config directory and save config file", async () => {
			const { saveConfig, loadConfig } = await import("../src/utils/config.js");

			const testConfig = {
				agent: "opencode",
				gitIgnore: "exclude" as const,
			};

			await saveConfig(testConfig);

			// Verify file was created
			const configPath = join(testConfigDir, "config.json");
			expect(await fs.pathExists(configPath)).toBe(true);

			// Verify content
			const savedConfig = await loadConfig();
			expect(savedConfig.agent).toBe("opencode");
			expect(savedConfig.gitIgnore).toBe("exclude");
		});

		it("should merge with existing config when updating", async () => {
			const { saveConfig, loadConfig } = await import("../src/utils/config.js");

			// Save initial config
			await saveConfig({ agent: "cursor", branch: "dev" });

			// Update with partial config
			await saveConfig({ agent: "claude-code" });

			// Verify merge
			const config = await loadConfig();
			expect(config.agent).toBe("claude-code");
			expect(config.branch).toBe("dev"); // Should be preserved
		});
	});

	describe("clearConfig", () => {
		it("should delete the config file", async () => {
			const { saveConfig, clearConfig, loadConfig } = await import(
				"../src/utils/config.js"
			);

			// Create config
			await saveConfig({ agent: "test-agent" });

			// Clear it
			await clearConfig();

			// Verify empty
			const config = await loadConfig();
			expect(config).toEqual({});
		});
	});
});
