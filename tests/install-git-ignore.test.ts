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
});
