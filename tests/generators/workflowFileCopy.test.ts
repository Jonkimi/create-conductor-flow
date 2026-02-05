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
	const templateRoot = "/mock/template/root";
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
		const workflowSourcePath = join(templateRoot, "conductor/workflow.md");
		const workflowDestPath = join(targetDir, "conductor/workflow.md");

		beforeEach(() => {
			// Default: source exists
			vi.mocked(fs.existsSync).mockImplementation((p) => {
				if (p === workflowSourcePath) return true;
				return false;
			});
		});

		it("should copy workflow file when destination does not exist", async () => {
			vi.mocked(fs.existsSync).mockImplementation((p) => {
				if (p === workflowSourcePath) return true;
				if (p === workflowDestPath) return false;
				return false;
			});

			await generator.generate(targetDir);

			expect(fs.copy).toHaveBeenCalledWith(
				workflowSourcePath,
				workflowDestPath,
			);
			expect(consoleLogSpy).toHaveBeenCalledWith("✔ Workflow file copied");
		});

		it("should prompt user when workflow file exists and force is false", async () => {
			vi.mocked(fs.existsSync).mockImplementation((p) => {
				if (p === workflowSourcePath) return true;
				if (p === workflowDestPath) return true;
				return false;
			});
			(select as ReturnType<typeof vi.fn>).mockResolvedValue(false);

			await generator.generate(
				targetDir,
				undefined,
				undefined,
				undefined,
				false,
			);

			expect(select).toHaveBeenCalledWith({
				message: expect.stringContaining("conductor/workflow.md"),
				choices: expect.arrayContaining([
					expect.objectContaining({ value: true, name: "Overwrite" }),
					expect.objectContaining({ value: false, name: "Skip" }),
				]),
			});
		});

		it("should skip copy when user selects 'Skip'", async () => {
			vi.mocked(fs.existsSync).mockImplementation((p) => {
				if (p === workflowSourcePath) return true;
				if (p === workflowDestPath) return true;
				return false;
			});
			(select as ReturnType<typeof vi.fn>).mockResolvedValue(false);

			await generator.generate(targetDir);

			// Should not copy when user selects Skip
			expect(fs.copy).not.toHaveBeenCalledWith(
				workflowSourcePath,
				workflowDestPath,
			);
			expect(consoleLogSpy).toHaveBeenCalledWith(
				"⚠ Skipping workflow file (already exists)",
			);
		});

		it("should overwrite when user selects 'Overwrite'", async () => {
			vi.mocked(fs.existsSync).mockImplementation((p) => {
				if (p === workflowSourcePath) return true;
				if (p === workflowDestPath) return true;
				return false;
			});
			(select as ReturnType<typeof vi.fn>).mockResolvedValue(true);

			await generator.generate(targetDir);

			expect(fs.copy).toHaveBeenCalledWith(
				workflowSourcePath,
				workflowDestPath,
			);
			expect(consoleLogSpy).toHaveBeenCalledWith("✔ Workflow file copied");
		});

		it("should overwrite without prompt when force is true", async () => {
			vi.mocked(fs.existsSync).mockImplementation((p) => {
				if (p === workflowSourcePath) return true;
				if (p === workflowDestPath) return true;
				return false;
			});

			await generator.generate(
				targetDir,
				undefined,
				undefined,
				undefined,
				true,
			);

			expect(select).not.toHaveBeenCalled();
			expect(fs.copy).toHaveBeenCalledWith(
				workflowSourcePath,
				workflowDestPath,
			);
			expect(consoleLogSpy).toHaveBeenCalledWith(
				"⚠ Force mode: Overwriting workflow file",
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
				"Workflow template not found, skipping workflow file copy",
			);
		});
	});
});
