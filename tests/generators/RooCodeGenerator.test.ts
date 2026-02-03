import { describe, it, expect, vi, beforeEach } from "vitest";
import { RooCodeGenerator } from "../../src/generators/roo-code/index.js";
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

describe("RooCodeGenerator", () => {
	let generator: RooCodeGenerator;
	const targetDir = "/mock/target";

	beforeEach(() => {
		vi.resetAllMocks();
		generator = new RooCodeGenerator();
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
				"Conductor (Roo Code) is already installed",
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
				expect.stringContaining(".roo/commands"),
			);
			expect(fs.writeFile).toHaveBeenCalled();
		});
	});
});
