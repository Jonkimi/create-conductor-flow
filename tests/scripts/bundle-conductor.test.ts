import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs-extra";
import { join } from "path";
import { fileURLToPath } from "url";
import { tmpdir } from "os";
import { mkdtemp, rm } from "fs/promises";
// @ts-ignore
import { processConductorFiles } from "../../scripts/bundle-conductor";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

describe("Bundle Script Modification Logic", () => {
	let testDir: string;

	beforeEach(async () => {
		testDir = await mkdtemp(join(tmpdir(), "conductor-bundle-test-"));
	});

	afterEach(async () => {
		await rm(testDir, { recursive: true, force: true });
	});

	it.skip("should replace /conductor: with /conductor- in file content", async () => {
		const filePath = join(testDir, "test-content.md");
		const originalContent =
			"Run `/conductor:setup` to start. check `/conductor:newTrack`.";
		await fs.writeFile(filePath, originalContent);

		if (typeof processConductorFiles !== "function") {
			throw new Error("processConductorFiles is not defined");
		}
		await processConductorFiles(testDir);

		const newContent = await fs.readFile(filePath, "utf-8");
		expect(newContent).toContain("/conductor-setup");
		expect(newContent).toContain("/conductor-newTrack");
		expect(newContent).not.toContain("/conductor:");
	});

	it("should rename files containing colon to hyphen", async () => {
		const oldPath = join(testDir, "conductor:setup.md");
		await fs.writeFile(oldPath, "content");

		if (typeof processConductorFiles !== "function") {
			throw new Error("processConductorFiles is not defined");
		}
		await processConductorFiles(testDir);

		expect(fs.existsSync(join(testDir, "conductor-setup.md"))).toBe(true);
		expect(fs.existsSync(oldPath)).toBe(false);
	});

	it("should handle recursive directories", async () => {
		const subDir = join(testDir, "subdir");
		await fs.ensureDir(subDir);
		const oldPath = join(subDir, "conductor:nested.md");
		await fs.writeFile(oldPath, "Call /conductor:nested");

		if (typeof processConductorFiles !== "function") {
			throw new Error("processConductorFiles is not defined");
		}
		await processConductorFiles(testDir);

		const newPath = join(subDir, "conductor-nested.md");
		expect(fs.existsSync(newPath)).toBe(true);
		expect(fs.existsSync(oldPath)).toBe(false);

		// Content replacement is disabled
		const content = await fs.readFile(newPath, "utf-8");
		expect(content).toContain("/conductor:nested");
	});
});
