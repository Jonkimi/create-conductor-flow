import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { execSync } from "child_process";
import { mkdtempSync, mkdirSync, rmSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import {
	isGitAvailable,
	isGitRepository,
	resetGitAvailableCache,
} from "../../src/utils/gitDetect.js";

vi.mock("child_process", () => ({
	execSync: vi.fn(),
}));

describe("gitDetect", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		resetGitAvailableCache();
	});

	describe("isGitRepository", () => {
		let tempDir: string;

		beforeEach(() => {
			tempDir = mkdtempSync(join(tmpdir(), "git-detect-test-"));
		});

		afterEach(() => {
			rmSync(tempDir, { recursive: true, force: true });
		});

		it("should return true when .git directory exists", () => {
			mkdirSync(join(tempDir, ".git"));
			expect(isGitRepository(tempDir)).toBe(true);
		});

		it("should return false when .git directory does not exist", () => {
			expect(isGitRepository(tempDir)).toBe(false);
		});

		it("should return false for a non-existent path", () => {
			expect(isGitRepository(join(tempDir, "does-not-exist"))).toBe(false);
		});
	});

	describe("isGitAvailable", () => {
		it("should return true when git --version succeeds", () => {
			vi.mocked(execSync).mockReturnValue(Buffer.from("git version 2.40.0"));

			expect(isGitAvailable()).toBe(true);
			expect(execSync).toHaveBeenCalledWith("git --version", {
				stdio: "ignore",
			});
		});

		it("should return false when git --version throws", () => {
			vi.mocked(execSync).mockImplementation(() => {
				throw new Error("command not found: git");
			});

			expect(isGitAvailable()).toBe(false);
			expect(execSync).toHaveBeenCalledWith("git --version", {
				stdio: "ignore",
			});
		});

		it("should cache the result and not re-execute", () => {
			vi.mocked(execSync).mockReturnValue(Buffer.from("git version 2.40.0"));

			const first = isGitAvailable();
			const second = isGitAvailable();

			expect(first).toBe(true);
			expect(second).toBe(true);
			expect(execSync).toHaveBeenCalledTimes(1);
		});

		it("should cache false result as well", () => {
			vi.mocked(execSync).mockImplementation(() => {
				throw new Error("command not found: git");
			});

			const first = isGitAvailable();
			const second = isGitAvailable();

			expect(first).toBe(false);
			expect(second).toBe(false);
			expect(execSync).toHaveBeenCalledTimes(1);
		});
	});

	describe("resetGitAvailableCache", () => {
		it("should allow re-execution after reset", () => {
			vi.mocked(execSync).mockReturnValue(Buffer.from("git version 2.40.0"));

			isGitAvailable();
			expect(execSync).toHaveBeenCalledTimes(1);

			resetGitAvailableCache();

			vi.mocked(execSync).mockImplementation(() => {
				throw new Error("command not found: git");
			});

			expect(isGitAvailable()).toBe(false);
			expect(execSync).toHaveBeenCalledTimes(2);
		});
	});
});
