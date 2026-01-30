import { describe, it, expect, vi, beforeEach } from "vitest";
import { installHandler } from "../src/commands/install.js";
import * as promptModule from "../src/cli/prompt.js";
import * as generatorFactory from "../src/generators/index.js";

vi.mock("../src/cli/prompt.js");
vi.mock("../src/generators/index.js", () => ({
	getGenerator: vi.fn(),
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
		(generatorFactory.getGenerator as any).mockReturnValue(mockGenerator);
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
});
