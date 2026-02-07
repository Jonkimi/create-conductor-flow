import { describe, it, expect, vi, beforeEach } from "vitest";
import { installHandler } from "../src/commands/install.js";
import * as promptModule from "../src/cli/prompt.js";
import * as generatorFactory from "../src/generators/index.js";
import { isGitAvailable } from "../src/utils/gitDetect.js";

vi.mock("../src/cli/prompt.js");
vi.mock("../src/generators/index.js", () => ({
	getGenerator: vi.fn(),
}));
vi.mock("../src/utils/gitDetect.js", () => ({
	isGitAvailable: vi.fn().mockReturnValue(true),
}));

describe("Install Command", () => {
	const mockGenerator = {
		validate: vi.fn(),
		generate: vi.fn(),
	};

	beforeEach(() => {
		vi.resetAllMocks();
		vi.spyOn(process, "exit").mockImplementation((() => {}) as any);
		vi.spyOn(console, "log").mockImplementation(() => {});
		vi.spyOn(console, "error").mockImplementation(() => {});
		vi.spyOn(console, "warn").mockImplementation(() => {});
		(generatorFactory.getGenerator as any).mockReturnValue(mockGenerator);
		// Default: git is available
		vi.mocked(isGitAvailable).mockReturnValue(true);
	});

	it("should run successful installation flow using generator", async () => {
		// Setup mocks
		const mockArgv = { path: ".", _: [], $0: "conductor" };
		mockGenerator.validate.mockResolvedValue("/abs/path");
		vi.mocked(promptModule.promptForAgent).mockResolvedValue("opencode");
		// Mock scope selection
		vi.mocked(promptModule.promptForInstallScope).mockResolvedValue("project");

		// Execute
		await installHandler(mockArgv);

		// Verify flow
		expect(generatorFactory.getGenerator).toHaveBeenCalledWith("opencode");
		// Check that validate and generate are called with scope
		expect(mockGenerator.validate).toHaveBeenCalledWith(
			expect.any(String),
			"project",
		);
		expect(mockGenerator.generate).toHaveBeenCalledWith(
			"/abs/path",
			"project",
			undefined,
			undefined,
			false,
		);
		expect(console.log).toHaveBeenCalledWith(
			expect.stringContaining("initialized successfully"),
		);
	});

	it("should pass repo and branch to generator if provided", async () => {
		// Setup mocks
		const mockArgv = {
			path: ".",
			agent: "opencode",
			repo: "https://github.com/custom/repo",
			branch: "custom-branch",
			_: [],
			$0: "conductor",
		};
		mockGenerator.validate.mockResolvedValue("/abs/path");
		vi.mocked(promptModule.promptForInstallScope).mockResolvedValue("project");

		// Execute
		await installHandler(mockArgv as any);

		// Verify
		expect(mockGenerator.generate).toHaveBeenCalledWith(
			"/abs/path",
			"project",
			"https://github.com/custom/repo",
			"custom-branch",
			false,
		);
	});

	it("should use agent from CLI if provided", async () => {
		// Setup mocks
		const mockArgv = { path: ".", agent: "cursor", _: [], $0: "conductor" };
		mockGenerator.validate.mockResolvedValue("/abs/path");
		// Mock scope selection
		vi.mocked(promptModule.promptForInstallScope).mockResolvedValue("project");

		// Execute
		await installHandler(mockArgv as any);

		// Verify flow - promptForAgent should NOT be called
		expect(promptModule.promptForAgent).not.toHaveBeenCalled();
		expect(generatorFactory.getGenerator).toHaveBeenCalledWith("cursor");
		// Verify promptForInstallScope is still called even if agent is provided by flag
		expect(promptModule.promptForInstallScope).toHaveBeenCalledWith("cursor");
		expect(mockGenerator.generate).toHaveBeenCalledWith(
			expect.any(String),
			"project",
			undefined,
			undefined,
			false,
		);
	});

	it("should handle validation errors", async () => {
		// Setup mocks
		const mockArgv = { path: ".", _: [], $0: "conductor" };
		mockGenerator.validate.mockRejectedValue(new Error("Validation failed"));
		vi.mocked(promptModule.promptForAgent).mockResolvedValue("opencode");

		// Execute
		await installHandler(mockArgv);

		// Verify error handling
		expect(console.error).toHaveBeenCalledWith(
			expect.stringContaining("Installation failed"),
			"Validation failed",
		);
		expect(process.exit).toHaveBeenCalledWith(1);
		expect(mockGenerator.generate).not.toHaveBeenCalled();
	});

	it("should run successful installation flow for Gemini CLI", async () => {
		// Setup mocks
		const mockArgv = { path: ".", agent: "gemini", _: [], $0: "conductor" };
		mockGenerator.validate.mockResolvedValue("/abs/path");
		vi.mocked(promptModule.promptForInstallScope).mockResolvedValue("project");

		// Execute
		await installHandler(mockArgv as any);

		// Verify flow
		expect(generatorFactory.getGenerator).toHaveBeenCalledWith("gemini");
		expect(mockGenerator.validate).toHaveBeenCalledWith(
			expect.any(String),
			"project",
		);
		expect(mockGenerator.generate).toHaveBeenCalledWith(
			"/abs/path",
			"project",
			undefined,
			undefined,
			false,
		);
		expect(console.log).toHaveBeenCalledWith(
			expect.stringContaining("initialized successfully"),
		);
	});

	it("should fallback to bundled when --repo is set and git is unavailable", async () => {
		vi.mocked(isGitAvailable).mockReturnValue(false);

		const mockArgv = {
			path: ".",
			agent: "opencode",
			repo: "https://github.com/custom/repo",
			branch: "main",
			_: [],
			$0: "conductor",
		};
		mockGenerator.validate.mockResolvedValue("/abs/path");
		vi.mocked(promptModule.promptForInstallScope).mockResolvedValue("project");

		await installHandler(mockArgv as any);

		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining("git not found"),
		);
		// Should fall back to bundled (undefined repo/branch)
		expect(mockGenerator.generate).toHaveBeenCalledWith(
			"/abs/path",
			"project",
			undefined,
			undefined,
			false,
		);
	});

	it("should fallback to bundled when saved config has repo and git is unavailable", async () => {
		vi.mocked(isGitAvailable).mockReturnValue(false);

		const mockArgv = {
			path: ".",
			agent: "opencode",
			config: {
				repo: "https://github.com/saved/repo",
				branch: "main",
			},
			_: [],
			$0: "conductor",
		};
		mockGenerator.validate.mockResolvedValue("/abs/path");
		vi.mocked(promptModule.promptForInstallScope).mockResolvedValue("project");

		await installHandler(mockArgv as any);

		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining("git not found"),
		);
		expect(mockGenerator.generate).toHaveBeenCalledWith(
			"/abs/path",
			"project",
			undefined,
			undefined,
			false,
		);
	});

	it("should use repo normally when git is available", async () => {
		vi.mocked(isGitAvailable).mockReturnValue(true);

		const mockArgv = {
			path: ".",
			agent: "opencode",
			repo: "https://github.com/custom/repo",
			branch: "custom-branch",
			_: [],
			$0: "conductor",
		};
		mockGenerator.validate.mockResolvedValue("/abs/path");
		vi.mocked(promptModule.promptForInstallScope).mockResolvedValue("project");

		await installHandler(mockArgv as any);

		expect(console.warn).not.toHaveBeenCalledWith(
			expect.stringContaining("git not found"),
		);
		expect(mockGenerator.generate).toHaveBeenCalledWith(
			"/abs/path",
			"project",
			"https://github.com/custom/repo",
			"custom-branch",
			false,
		);
	});

	it("should skip --git-ignore when git is unavailable", async () => {
		vi.mocked(isGitAvailable).mockReturnValue(false);

		const mockArgv = {
			path: ".",
			agent: "opencode",
			gitIgnore: "gitignore" as any,
			scope: "project",
			_: [],
			$0: "conductor",
		};
		mockGenerator.validate.mockResolvedValue("/abs/path");

		await installHandler(mockArgv as any);

		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining("git not found, skipping git ignore"),
		);
		// promptForGitIgnore should not be called
		expect(promptModule.promptForGitIgnore).not.toHaveBeenCalled();
	});

	it("should skip saved config gitIgnore when git is unavailable", async () => {
		vi.mocked(isGitAvailable).mockReturnValue(false);

		const mockArgv = {
			path: ".",
			agent: "opencode",
			scope: "project",
			config: {
				gitIgnore: "exclude" as any,
			},
			_: [],
			$0: "conductor",
		};
		mockGenerator.validate.mockResolvedValue("/abs/path");

		await installHandler(mockArgv as any);

		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining("git not found, skipping git ignore"),
		);
		expect(promptModule.promptForGitIgnore).not.toHaveBeenCalled();
	});

	it("should not prompt for git-ignore when git is unavailable", async () => {
		vi.mocked(isGitAvailable).mockReturnValue(false);

		const mockArgv = {
			path: ".",
			agent: "opencode",
			scope: "project",
			_: [],
			$0: "conductor",
		};
		mockGenerator.validate.mockResolvedValue("/abs/path");

		await installHandler(mockArgv as any);

		// Should not prompt for git ignore since git is not available
		expect(promptModule.promptForGitIgnore).not.toHaveBeenCalled();
	});
});
