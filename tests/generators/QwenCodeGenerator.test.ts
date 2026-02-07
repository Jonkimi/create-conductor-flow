import { describe, it, expect } from "vitest";
import { qwenCodeContentStrategy } from "../../src/generators/qwencode/strategy.js";

describe("QwenCodeContentStrategy", () => {
	it("should convert TOML to Markdown with frontmatter description", () => {
		const toml = `
description = "Setup project"
prompt = "This is the setup prompt for ~/.gemini/extensions/conductor"
`;
		const options = {
			installPath: ".qwen",
			agentType: "qwen-code" as const,
			commandName: "setup",
		};

		const result = qwenCodeContentStrategy.process(toml, options);

		expect(result).toContain("---");
		expect(result).toContain('description: "Setup project"');
		expect(result).toContain("---");
		expect(result).toContain("This is the setup prompt for .qwen");
	});

	it("should convert TOML to Markdown without description", () => {
		const toml = `
prompt = "Simple prompt"
`;
		const options = {
			installPath: ".qwen",
			agentType: "qwen-code" as const,
			commandName: "status",
		};

		const result = qwenCodeContentStrategy.process(toml, options);

		expect(result).not.toContain("---");
		expect(result).toBe("Simple prompt");
	});

	it("should handle variable substitution for agent_type", () => {
		const toml = `
prompt = "Agent type is {agent_type}"
`;
		const options = {
			installPath: ".qwen",
			agentType: "qwen-code" as const,
			commandName: "test",
		};

		const result = qwenCodeContentStrategy.process(toml, options);

		expect(result).toBe("Agent type is qwen-code");
	});

	it("should return null if prompt is missing", () => {
		const toml = `
description = "Missing prompt"
`;
		const options = {
			installPath: ".qwen",
			agentType: "qwen-code" as const,
			commandName: "test",
		};

		const result = qwenCodeContentStrategy.process(toml, options);

		expect(result).toBeNull();
	});
});

import { QwenCodeGenerator } from "../../src/generators/qwencode/index.js";
import fs from "fs-extra";
import { vi, beforeEach } from "vitest";
import { join } from "path";

vi.mock("fs-extra");

vi.mock("../../src/utils/template.js", async (importOriginal) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const actual = (await importOriginal()) as any;
	return {
		...actual,
		loadTemplate: vi.fn(),
		getTemplateRoot: vi.fn(),
	};
});

import { loadTemplate, getTemplateRoot } from "../../src/utils/template.js";

describe("QwenCodeGenerator", () => {
	let generator: QwenCodeGenerator;
	const targetDir = "/mock/target";

	beforeEach(() => {
		vi.resetAllMocks();
		generator = new QwenCodeGenerator();
		(getTemplateRoot as ReturnType<typeof vi.fn>).mockResolvedValue(
			"/mock/template/root",
		);
		(fs.existsSync as ReturnType<typeof vi.fn>).mockReturnValue(false);
	});

	describe("validate", () => {
		it("should return targetDir if valid", async () => {
			(fs.existsSync as ReturnType<typeof vi.fn>).mockImplementation(
				(path: string) => path === targetDir,
			);
			await expect(generator.validate(targetDir)).resolves.toBe(targetDir);
		});

		it("should throw if target directory does not exist", async () => {
			(fs.existsSync as ReturnType<typeof vi.fn>).mockReturnValue(false);
			await expect(generator.validate("/nonexistent")).rejects.toThrow(
				"Target directory does not exist",
			);
		});

		it("should throw if conductor is already installed", async () => {
			(fs.existsSync as ReturnType<typeof vi.fn>).mockReturnValue(true);
			await expect(generator.validate(targetDir)).rejects.toThrow(
				"Conductor (Qwen Code) is already installed",
			);
		});
	});

	describe("generate", () => {
		it("should create directories and files", async () => {
			// Mock TOML content
			(loadTemplate as ReturnType<typeof vi.fn>).mockResolvedValue(
				'prompt = "some prompt"',
			);

			await generator.generate(targetDir);

			expect(fs.ensureDir).toHaveBeenCalledWith(
				expect.stringContaining(join(".qwen", "commands")),
			);
			expect(fs.writeFile).toHaveBeenCalled();
		});
	});
});
