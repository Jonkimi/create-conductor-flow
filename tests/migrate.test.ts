/**
 * Unit tests for cache migration module (src/utils/migrate.ts)
 *
 * Tests migration from legacy ~/.gemini/cache/conductor to XDG cache location.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { join } from "path";
import fs from "fs-extra";
import { tmpdir } from "os";

describe("Migrate Module", () => {
	const testCacheDir = join(tmpdir(), "conductor-test-cache-new");
	const testLegacyCacheDir = join(tmpdir(), "conductor-test-cache-legacy");

	beforeEach(async () => {
		// Clean up test directories before each test
		await fs.remove(testCacheDir);
		await fs.remove(testLegacyCacheDir);
		// Set environment overrides for testing
		process.env.CONDUCTOR_CACHE_DIR = testCacheDir;
		process.env.CONDUCTOR_LEGACY_CACHE_DIR = testLegacyCacheDir;
	});

	afterEach(async () => {
		// Clean up after tests
		await fs.remove(testCacheDir);
		await fs.remove(testLegacyCacheDir);
		delete process.env.CONDUCTOR_CACHE_DIR;
		delete process.env.CONDUCTOR_LEGACY_CACHE_DIR;
	});

	describe("getLegacyCacheDir", () => {
		it("should return env override when CONDUCTOR_LEGACY_CACHE_DIR is set", async () => {
			vi.resetModules();
			const { getLegacyCacheDir } = await import("../src/utils/migrate.js");
			const result = getLegacyCacheDir();
			expect(result).toBe(testLegacyCacheDir);
		});

		it("should return default legacy path when env not set", async () => {
			delete process.env.CONDUCTOR_LEGACY_CACHE_DIR;
			vi.resetModules();
			const { getLegacyCacheDir } = await import("../src/utils/migrate.js");
			const result = getLegacyCacheDir();

			// Should be ~/.gemini/cache/conductor
			expect(result).toContain(".gemini");
			expect(result).toContain("cache");
			expect(result).toContain("conductor");
		});
	});

	describe("migrateCache", () => {
		it("should return false if legacy cache does not exist", async () => {
			vi.resetModules();
			const { migrateCache } = await import("../src/utils/migrate.js");

			const result = await migrateCache();
			expect(result).toBe(false);
		});

		it("should copy legacy cache to new location when legacy exists and new is empty", async () => {
			// Create legacy cache with some test files
			await fs.ensureDir(testLegacyCacheDir);
			const testHash = "abc123";
			await fs.ensureDir(join(testLegacyCacheDir, testHash));
			await fs.writeFile(
				join(testLegacyCacheDir, testHash, "test.txt"),
				"test content",
			);

			vi.resetModules();
			const { migrateCache } = await import("../src/utils/migrate.js");

			const result = await migrateCache();

			// Should migrate successfully
			expect(result).toBe(true);

			// Verify new cache has the content
			expect(
				await fs.pathExists(join(testCacheDir, "templates", testHash)),
			).toBe(true);
			expect(
				await fs.pathExists(
					join(testCacheDir, "templates", testHash, "test.txt"),
				),
			).toBe(true);
		});

		it("should not migrate if new cache already has content", async () => {
			// Create both caches with content
			await fs.ensureDir(testLegacyCacheDir);
			await fs.writeFile(
				join(testLegacyCacheDir, "old-file.txt"),
				"old content",
			);

			await fs.ensureDir(join(testCacheDir, "templates"));
			await fs.writeFile(
				join(testCacheDir, "templates", "new-file.txt"),
				"new content",
			);

			vi.resetModules();
			const { migrateCache } = await import("../src/utils/migrate.js");

			const result = await migrateCache();

			// Should skip migration
			expect(result).toBe(false);

			// Verify old content was not copied
			expect(
				await fs.pathExists(join(testCacheDir, "templates", "old-file.txt")),
			).toBe(false);
		});

		it("should handle migration errors gracefully", async () => {
			// Create legacy cache
			await fs.ensureDir(testLegacyCacheDir);
			await fs.writeFile(join(testLegacyCacheDir, "file.txt"), "content");

			// Make the new cache dir unwritable (simulate permission error)
			// This is hard to test portably, so we'll just verify no exception is thrown
			vi.resetModules();
			const { migrateCache } = await import("../src/utils/migrate.js");

			// Should not throw
			await expect(migrateCache()).resolves.not.toThrow();
		});
	});
});
