import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ConfigurableGenerator } from "../../src/generators/ConfigurableGenerator.js";
import type { AgentConfig } from "../../src/generators/types.js";
import fs from "fs-extra";
import { join } from "path";

vi.mock("fs-extra");

vi.mock("@inquirer/select", () => ({
	default: vi.fn(),
}));

vi.mock("../../src/utils/template.js", async (importOriginal) => {
	const actual = (await importOriginal()) as Record<string, unknown>;
	return {
		...actual,
		loadTemplate: vi.fn(),
		getTemplateRoot: vi.fn(),
	};
});

import { loadTemplate, getTemplateRoot } from "../../src/utils/template.js";
import select from "@inquirer/select";

describe("Workflow File Copy Logic", () => {
	const mockConfig: AgentConfig = {
		agentType: "test-agent",
		agentDir: ".test",
		commandsDir: "commands",
		displayName: "Test Agent",
	};
	const targetDir = "/mock/target";
	const templateRoot = "/mock/template/conductor";
	let generator: ConfigurableGenerator;
	let consoleWarnSpy: ReturnType<typeof vi.spyOn>;
	let consoleLogSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		vi.resetAllMocks();
		generator = new ConfigurableGenerator(mockConfig);
		(getTemplateRoot as ReturnType<typeof vi.fn>).mockResolvedValue(
			templateRoot,
		);
		(loadTemplate as ReturnType<typeof vi.fn>).mockResolvedValue(
			'prompt = "some prompt"',
		);
		vi.mocked(fs.readdir).mockImplementation(async () => []);
		consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
		consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
	});

	afterEach(() => {
		consoleWarnSpy.mockRestore();
		consoleLogSpy.mockRestore();
	});

	describe("when workflow source file exists", () => {
		const workflowSourcePath = join(templateRoot, "templates/workflow.md");
		const workflowDestPath = join(targetDir, "conductor/workflow.md");

		beforeEach(() => {
			// Default: source exists
			vi.mocked(fs.existsSync).mockImplementation((p) => {
				if (p === workflowSourcePath) return true;
				return false;
			});
		});

		it("should not copy workflow file when destination does not exist", async () => {
			vi.mocked(fs.existsSync).mockImplementation((p) => {
				if (p === workflowSourcePath) return true;
				if (p === workflowDestPath) return false;
				return false;
			});

			await generator.generate(targetDir);

			expect(fs.copy).not.toHaveBeenCalledWith(
				workflowSourcePath,
				workflowDestPath,
			);
			expect(consoleLogSpy).not.toHaveBeenCalledWith(
				"✔ conductor/workflow.md synced",
			);
		});
	});

	describe("when workflow source file does not exist", () => {
		it("should skip gracefully and log warning when source template does not exist", async () => {
			const workflowSourcePath = join(templateRoot, "conductor/workflow.md");
			vi.mocked(fs.existsSync).mockImplementation((p) => {
				if (p === workflowSourcePath) return false;
				return false;
			});

			await generator.generate(targetDir);

			expect(fs.copy).not.toHaveBeenCalledWith(
				workflowSourcePath,
				expect.any(String),
			);
			expect(consoleWarnSpy).toHaveBeenCalledWith(
				"Workflow template not found, skipping workflow file sync",
			);
		});
	});
});
