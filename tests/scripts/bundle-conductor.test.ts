import { describe, it, expect, beforeEach, vi, type Mock } from "vitest";
import { join } from "path";

// Mock fs-extra before importing the module under test
vi.mock("fs-extra", () => {
	return {
		default: {
			readdir: vi.fn(),
			stat: vi.fn(),
			move: vi.fn(),
			readFile: vi.fn(),
			writeFile: vi.fn(),
			ensureDir: vi.fn(),
			remove: vi.fn(),
			existsSync: vi.fn(),
		},
	};
});

vi.mock("child_process", () => {
	return {
		execSync: vi.fn(),
	};
});

import fs from "fs-extra";
// @ts-ignore
import { processConductorFiles } from "../../scripts/bundle-conductor";

describe("Bundle Script Modification Logic", () => {
	const testDir = "/mock/test/dir";

	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("should rename files containing colon to hyphen", async () => {
		// Setup mock for readdir to return one file with colon
		(fs.readdir as unknown as Mock).mockResolvedValueOnce([
			"conductor:setup.md",
		]);

		// Setup mock for stat to say it is a file
		(fs.stat as unknown as Mock).mockResolvedValue({
			isDirectory: () => false,
			isFile: () => true,
		});

		await processConductorFiles(testDir);

		// Expect move to be called with replaced name
		const oldPath = join(testDir, "conductor:setup.md");
		const newPath = join(testDir, "conductor-setup.md");

		expect(fs.move).toHaveBeenCalledWith(oldPath, newPath);
	});

	it("should handle recursive directories", async () => {
		const subDirName = "subdir";
		const subFile = "conductor:nested.md";

		// First call to readdir returns subdir
		(fs.readdir as unknown as Mock)
			.mockResolvedValueOnce([subDirName]) // for testDir
			.mockResolvedValueOnce([subFile]); // for subDir

		// Setup stat responses
		(fs.stat as unknown as Mock).mockImplementation(async (path: string) => {
			if (path === join(testDir, subDirName)) {
				return { isDirectory: () => true, isFile: () => false };
			}
			if (path === join(testDir, subDirName, subFile)) {
				return { isDirectory: () => false, isFile: () => true };
			}
			return { isDirectory: () => false, isFile: () => false };
		});

		await processConductorFiles(testDir);

		const subDirPath = join(testDir, subDirName);
		expect(processConductorFiles).toBeDefined();

		// Verify recursive call happened implicitly by checking if the file inside was moved
		const oldPath = join(subDirPath, subFile);
		const newPath = join(subDirPath, "conductor-nested.md");

		expect(fs.move).toHaveBeenCalledWith(oldPath, newPath);
	});
});
