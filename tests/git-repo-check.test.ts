import { describe, it, expect, vi, beforeEach } from "vitest";
import { installHandler } from "../src/commands/install.js";
import * as promptModule from "../src/cli/prompt.js";
import * as generatorFactory from "../src/generators/index.js";
import { isGitAvailable, isGitRepository } from "../src/utils/gitDetect.js";

vi.mock("../src/cli/prompt.js");
vi.mock("../src/generators/index.js", () => ({
	getGenerator: vi.fn(),
}));
vi.mock("../src/utils/gitDetect.js", () => ({
	isGitAvailable: vi.fn().mockReturnValue(true),
	isGitRepository: vi.fn().mockReturnValue(true),
}));

describe("Install Command - Git Repository Check for Git Ignore", () => {
	const mockGenerator = {
		validate: vi.fn(),
		generate: vi.fn(),
	};

	beforeEach(() => {
		vi.resetAllMocks();
		vi.spyOn(process, "exit").mockImplementation((() => {}) as any);
		vi.spyOn(console, "log").mockImplementation(() => {});
		vi.spyOn(console, "warn").mockImplementation(() => {});
		vi.spyOn(console, "error").mockImplementation(() => {});
		(generatorFactory.getGenerator as any).mockReturnValue(mockGenerator);
		mockGenerator.validate.mockResolvedValue("/abs/path");
		// Default: git is available (for repo fetching) and target is a git repo
		vi.mocked(isGitAvailable).mockReturnValue(true);
		vi.mocked(isGitRepository).mockReturnValue(true);
	});

	describe("when target directory is NOT a git repository", () => {
		beforeEach(() => {
			vi.mocked(isGitRepository).mockReturnValue(false);
		});

		it("should skip git ignore when --git-ignore flag is provided but no .git dir", async () => {
			vi.mocked(promptModule.promptForInstallScope).mockResolvedValue(
				"project",
			);

			const mockArgv = {
				path: ".",
				agent: "opencode",
				gitIgnore: "gitignore" as any,
				_: [],
				$0: "conductor",
			};

			await installHandler(mockArgv as any);

			// Should warn and skip
			expect(console.warn).toHaveBeenCalledWith(
				expect.stringContaining("not a git repository"),
			);
			expect(promptModule.promptForGitIgnore).not.toHaveBeenCalled();
		});

		it("should skip git ignore when config has gitIgnore but no .git dir", async () => {
			vi.mocked(promptModule.promptForInstallScope).mockResolvedValue(
				"project",
			);

			const mockArgv = {
				path: ".",
				agent: "opencode",
				config: { gitIgnore: "exclude" as any },
				_: [],
				$0: "conductor",
			};

			await installHandler(mockArgv as any);

			expect(console.warn).toHaveBeenCalledWith(
				expect.stringContaining("not a git repository"),
			);
			expect(promptModule.promptForGitIgnore).not.toHaveBeenCalled();
		});

		it("should not prompt for git ignore when no .git dir and no flag", async () => {
			vi.mocked(promptModule.promptForInstallScope).mockResolvedValue(
				"project",
			);

			const mockArgv = {
				path: ".",
				agent: "opencode",
				_: [],
				$0: "conductor",
			};

			await installHandler(mockArgv as any);

			expect(promptModule.promptForGitIgnore).not.toHaveBeenCalled();
		});

		it("should still complete the installation even without .git dir", async () => {
			vi.mocked(promptModule.promptForInstallScope).mockResolvedValue(
				"project",
			);

			const mockArgv = {
				path: ".",
				agent: "opencode",
				gitIgnore: "gitignore" as any,
				_: [],
				$0: "conductor",
			};

			await installHandler(mockArgv as any);

			expect(mockGenerator.generate).toHaveBeenCalled();
		});
	});

	describe("when target directory IS a git repository", () => {
		beforeEach(() => {
			vi.mocked(isGitRepository).mockReturnValue(true);
		});

		it("should proceed with git ignore when .git dir exists and flag is set", async () => {
			vi.mocked(promptModule.promptForInstallScope).mockResolvedValue(
				"project",
			);

			const mockArgv = {
				path: ".",
				agent: "opencode",
				gitIgnore: "gitignore" as any,
				_: [],
				$0: "conductor",
			};

			await installHandler(mockArgv as any);

			// Should NOT warn about missing .git
			expect(console.warn).not.toHaveBeenCalledWith(
				expect.stringContaining("not a git repository"),
			);
			expect(mockGenerator.generate).toHaveBeenCalled();
		});

		it("should prompt for git ignore when .git dir exists and no flag", async () => {
			vi.mocked(promptModule.promptForInstallScope).mockResolvedValue(
				"project",
			);
			vi.mocked(promptModule.promptForGitIgnore).mockResolvedValue(
				"gitignore",
			);

			const mockArgv = {
				path: ".",
				agent: "opencode",
				_: [],
				$0: "conductor",
			};

			await installHandler(mockArgv as any);

			expect(promptModule.promptForGitIgnore).toHaveBeenCalled();
		});
	});
});
