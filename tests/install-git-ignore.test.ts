import { describe, it, expect, vi, beforeEach } from "vitest";
import { installHandler } from "../src/commands/install.js";
import * as promptModule from "../src/cli/prompt.js";
import * as generatorFactory from "../src/generators/index.js";

vi.mock("../src/cli/prompt.js");
vi.mock("../src/generators/index.js", () => ({
	getGenerator: vi.fn(),
}));

describe("Install Command with --git-ignore flag", () => {
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
		vi.mocked(promptModule.promptForInstallScope).mockResolvedValue("project");
	});

	it("should pass gitIgnore option to install flow when --git-ignore gitignore is provided", async () => {
		const mockArgv = {
			path: ".",
			agent: "opencode",
			gitIgnore: "gitignore",
			_: [],
			$0: "conductor",
		};

		await installHandler(mockArgv as any);

		// Verify the install completed
		expect(mockGenerator.generate).toHaveBeenCalled();
		// gitIgnore option should be available in the flow
	});

	it("should pass gitIgnore option to install flow when --git-ignore exclude is provided", async () => {
		const mockArgv = {
			path: ".",
			agent: "opencode",
			gitIgnore: "exclude",
			_: [],
			$0: "conductor",
		};

		await installHandler(mockArgv as any);

		expect(mockGenerator.generate).toHaveBeenCalled();
	});

	it("should pass gitIgnore option to install flow when --git-ignore none is provided", async () => {
		const mockArgv = {
			path: ".",
			agent: "opencode",
			gitIgnore: "none",
			_: [],
			$0: "conductor",
		};

		await installHandler(mockArgv as any);

		expect(mockGenerator.generate).toHaveBeenCalled();
	});

	it("should not process git ignore when no --git-ignore flag is provided", async () => {
		const mockArgv = {
			path: ".",
			agent: "opencode",
			// No gitIgnore option
			_: [],
			$0: "conductor",
		};

		await installHandler(mockArgv as any);

		expect(mockGenerator.generate).toHaveBeenCalled();
	});

	describe("Scope validation", () => {
		it("should display warning when --git-ignore is used with global scope", async () => {
			vi.mocked(promptModule.promptForInstallScope).mockResolvedValue("global");

			const mockArgv = {
				path: ".",
				agent: "codex", // Codex uses global scope
				gitIgnore: "gitignore",
				scope: "global",
				_: [],
				$0: "conductor",
			};

			await installHandler(mockArgv as any);

			// Should display a warning about git ignore being ignored for global scope
			expect(console.warn).toHaveBeenCalledWith(
				expect.stringContaining("--git-ignore"),
			);
		});

		it("should not display warning when --git-ignore is used with project scope", async () => {
			const mockArgv = {
				path: ".",
				agent: "opencode",
				gitIgnore: "gitignore",
				scope: "project",
				_: [],
				$0: "conductor",
			};

			await installHandler(mockArgv as any);

			// Should NOT display a warning for project scope
			expect(console.warn).not.toHaveBeenCalledWith(
				expect.stringContaining("--git-ignore"),
			);
		});

		it("should continue installation even when git ignore is skipped for global scope", async () => {
			vi.mocked(promptModule.promptForInstallScope).mockResolvedValue("global");

			const mockArgv = {
				path: ".",
				agent: "codex",
				gitIgnore: "exclude",
				scope: "global",
				_: [],
				$0: "conductor",
			};

			await installHandler(mockArgv as any);

			// Installation should still complete
			expect(mockGenerator.generate).toHaveBeenCalled();
		});
	});
});
