import { describe, it, expect, vi, beforeEach } from "vitest";
import { factoryDroidContentStrategy } from "../../src/generators/factorydroid/strategy.js";

describe("FactoryDroidContentStrategy", () => {
	it("should convert TOML to Markdown with frontmatter description", () => {
		const toml = `
description = "Setup project"
prompt = "This is the setup prompt for __$$CODE_AGENT_INSTALL_PATH$$__"
`;
		const options = {
			installPath: ".factory",
			agentType: "factory-droid" as const,
			commandName: "setup",
		};

		const result = factoryDroidContentStrategy.process(toml, options);

		expect(result).toContain("---");
		expect(result).toContain('description: "Setup project"');
		expect(result).toContain("---");
		expect(result).toContain("This is the setup prompt for .factory");
	});

	it("should convert TOML to Markdown without description", () => {
		const toml = `
prompt = "Simple prompt"
`;
		const options = {
			installPath: ".factory",
			agentType: "factory-droid" as const,
			commandName: "status",
		};

		const result = factoryDroidContentStrategy.process(toml, options);

		expect(result).not.toContain("---");
		expect(result).toBe("Simple prompt");
	});

	it("should handle variable substitution for agent_type", () => {
		const toml = `
prompt = "Agent type is {agent_type}"
`;
		const options = {
			installPath: ".factory",
			agentType: "factory-droid" as const,
			commandName: "test",
		};

		const result = factoryDroidContentStrategy.process(toml, options);

		expect(result).toBe("Agent type is factory-droid");
	});
});

import { FactoryDroidGenerator } from "../../src/generators/factorydroid/index.js";
import fs from "fs-extra";

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

describe("FactoryDroidGenerator", () => {
	let generator: FactoryDroidGenerator;
	const targetDir = "/mock/target";

	beforeEach(() => {
		vi.resetAllMocks();
		generator = new FactoryDroidGenerator();
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

		it("should throw if conductor is already installed", async () => {
			(fs.existsSync as ReturnType<typeof vi.fn>).mockReturnValue(true);
			await expect(generator.validate(targetDir)).rejects.toThrow(
				"Conductor (Factory Droid) is already installed",
			);
		});
	});

	describe("generate", () => {
		it("should create directories and files", async () => {
			(loadTemplate as ReturnType<typeof vi.fn>).mockResolvedValue(
				'prompt = "some prompt"',
			);

			await generator.generate(targetDir);

			expect(fs.ensureDir).toHaveBeenCalledWith(
				expect.stringContaining(".factory/commands"),
			);
			expect(fs.writeFile).toHaveBeenCalled();
		});
	});
});
