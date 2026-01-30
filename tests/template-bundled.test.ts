import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
	getBundledTemplateRoot,
	getTemplateRoot,
	loadTemplate,
} from "../src/utils/template";
import * as path from "path";
import fs from "fs-extra";
import * as fsPromises from "fs/promises";

// Mock fs/promises
vi.mock("fs/promises", () => {
	return {
		readFile: vi.fn(),
		stat: vi.fn(),
	};
});

// Mock fs-extra
vi.mock("fs-extra", () => {
	return {
		default: {
			pathExists: vi.fn(),
			readFile: vi.fn(), // fs-extra also has readFile
			existsSync: vi.fn(),
			ensureDir: vi.fn(),
			remove: vi.fn(),
		},
	};
});

// Mock child_process to avoid git commands in tests
vi.mock("child_process", () => {
	return {
		execSync: vi.fn(),
	};
});

// Mock console.log
const originalLog = console.log;
const consoleSpy = vi.fn();

describe("Bundled Templates", () => {
	beforeEach(() => {
		vi.resetAllMocks();
		console.log = consoleSpy;
	});

	afterEach(() => {
		console.log = originalLog;
	});

	it("should return the correct path for bundled templates", () => {
		const bundledRoot = getBundledTemplateRoot();
		expect(bundledRoot).toContain("conductor");
		expect(path.isAbsolute(bundledRoot)).toBe(true);
	});

	describe("getTemplateRoot", () => {
		it("should return bundled root if no repo args and bundled exists", async () => {
			vi.mocked(fs.pathExists).mockResolvedValue(true);
			const root = await getTemplateRoot();
			expect(root).toContain("conductor");
		});

		it("should return cache dir if repo provided", async () => {
			const root = await getTemplateRoot("https://repo.com", "dev");
			expect(root).toContain(".gemini/cache/conductor");
		});
	});

	describe("loadTemplate", () => {
		it("should load from bundled if exists", async () => {
			vi.mocked(fs.pathExists).mockResolvedValue(true);
			vi.mocked(fsPromises.readFile).mockResolvedValue("content" as any);

			const content = await loadTemplate("commands/foo.toml");
			expect(content).toBe("content");
		});

		it("should fallback to remote if bundled missing and no repo args", async () => {
			vi.mocked(fs.pathExists).mockResolvedValue(false); // bundled missing
			vi.mocked(fsPromises.readFile).mockResolvedValue("remote-content" as any);

			const content = await loadTemplate("commands/foo.toml");

			expect(consoleSpy).toHaveBeenCalledWith(
				expect.stringContaining("falling back"),
			);
			expect(content).toBe("remote-content");
		});
	});
});
