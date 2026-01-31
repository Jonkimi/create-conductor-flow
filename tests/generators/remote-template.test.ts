import { describe, it, expect, vi, beforeEach } from "vitest";
import * as fsPromises from "fs/promises";
import { loadTemplate } from "../../src/utils/template";
import fs from "fs-extra";

// Mock fs/promises
vi.mock("fs/promises", async () => {
	const actual = await vi.importActual<{ [key: string]: unknown }>(
		"fs/promises",
	);
	return {
		...actual,
		readFile: vi.fn(),
	};
});

// Mock fs-extra
vi.mock("fs-extra", () => {
	return {
		default: {
			existsSync: vi.fn(),
			ensureDir: vi.fn(),
			remove: vi.fn(),
			pathExists: vi.fn(),
		},
	};
});

// Mock child_process to avoid actual git commands
vi.mock("child_process", () => ({
	execSync: vi.fn(),
}));

describe("Remote Template Loading", () => {
	const bundledContent = 'description = "Bundled Content"';
	const remoteContent = 'description = "Remote Content"';
	const templatePath = "commands/test.toml";
	const repo = "https://github.com/test/repo";
	const branch = "main";

	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("should prioritize remote content when repo is specified, even if bundled exists", async () => {
		// Setup scenarios:
		// 1. Bundled template exists
		vi.mocked(fs.pathExists).mockImplementation(async (filePath) => {
			if (typeof filePath === "string" && filePath.includes("conductor")) {
				// Simulate bundled path exists
				return true;
			}
			// Simulate remote cache path also exists (we might need to check the path structure)
			if (typeof filePath === "string" && filePath.includes(".gemini/cache")) {
				return true;
			}
			return false;
		});

		// 2. readFile returns different content based on path
		vi.mocked(fsPromises.readFile).mockImplementation(async (filePath) => {
			if (
				typeof filePath === "string" &&
				filePath.includes("conductor") &&
				!filePath.includes(".gemini")
			) {
				return bundledContent;
			}
			return remoteContent;
		});

		// Act
		const content = await loadTemplate(templatePath, repo, branch);

		// Assert
		expect(content).toBe(remoteContent);
		expect(content).not.toBe(bundledContent);
	});
});
