import { describe, it, expect, vi, beforeEach } from "vitest";
import { VSCodeCopilotGenerator } from "../src/generators/index.js";
import fs from "fs-extra";
import * as templateUtils from "../src/utils/template.js";
import { join } from "path";

vi.mock("fs-extra");
vi.mock("../src/utils/template.js");

describe("VSCodeCopilotGenerator", () => {
	const generator = new VSCodeCopilotGenerator();
	const targetDir = "/mock/project";

	beforeEach(() => {
		vi.resetAllMocks();
		vi.mocked(templateUtils.getTemplateRoot).mockResolvedValue(
			"/mock/templates",
		);
	});

	it("should generate VS Code Copilot specific files", async () => {
		// Mock template loading
		vi.mocked(templateUtils.loadTemplate).mockImplementation(async (path) => {
			if (path === "commands/conductor/setup.toml") {
				return 'description = "Setup Conductor"\nprompt = "Run setup"';
			}
			return 'description = "Other"\nprompt = "Other"';
		});

		vi.mocked(templateUtils.substituteVariables).mockImplementation(
			(content) => content,
		);

		await generator.generate(targetDir);

		// Verify directories created
		expect(fs.ensureDir).toHaveBeenCalledWith(
			join(targetDir, ".github/prompts"),
		);
		expect(fs.ensureDir).toHaveBeenCalledWith(
			join(targetDir, ".github/conductor"),
		);

		// Verify templates copied
		expect(fs.copy).toHaveBeenCalledWith(
			join("/mock/templates", "templates"),
			join(targetDir, ".github/conductor/templates"),
		);

		// Verify file written with correct extension and content
		const expectedFile = join(
			targetDir,
			".github/prompts/conductor:setup.prompt.md",
		);
		expect(fs.writeFile).toHaveBeenCalledWith(
			expectedFile,
			expect.stringContaining(
				"---\ndescription: Setup Conductor\nagent: agent\n---",
			),
		);
		expect(fs.writeFile).toHaveBeenCalledWith(
			expectedFile,
			expect.stringContaining("Run setup"),
		);
	});
});
