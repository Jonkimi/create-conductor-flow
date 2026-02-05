import { describe, it, expect, vi, beforeEach } from "vitest";
import { ConfigurableGenerator } from "../../src/generators/ConfigurableGenerator.js";
import type { AgentConfig } from "../../src/generators/types.js";
import fs from "fs-extra";
import { join } from "path";

vi.mock("fs-extra");

vi.mock("../../src/utils/template.js", async (importOriginal) => {
	const actual = (await importOriginal()) as Record<string, unknown>;
	return {
		...actual,
		loadTemplate: vi.fn(),
		getTemplateRoot: vi.fn(),
	};
});

import { loadTemplate, getTemplateRoot } from "../../src/utils/template.js";

describe("ConfigurableGenerator", () => {
	const mockConfig: AgentConfig = {
		agentType: "test-agent",
		agentDir: ".test",
		commandsDir: "commands",
		displayName: "Test Agent",
	};
	const targetDir = "/mock/target";
	let generator: ConfigurableGenerator;

	beforeEach(() => {
		vi.resetAllMocks();
		generator = new ConfigurableGenerator(mockConfig);
		(getTemplateRoot as ReturnType<typeof vi.fn>).mockResolvedValue(
			"/mock/template/root",
		);
		(fs.existsSync as ReturnType<typeof vi.fn>).mockReturnValue(false);
		(fs.readdir as any).mockResolvedValue([]);
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
				`Conductor (${mockConfig.displayName}) is already installed`,
			);
		});

		it("should use displayName in error messages", async () => {
			(fs.existsSync as ReturnType<typeof vi.fn>).mockReturnValue(true);
			await expect(generator.validate(targetDir)).rejects.toThrow("Test Agent");
		});
	});

	describe("generate", () => {
		it("should create directories based on config", async () => {
			(loadTemplate as ReturnType<typeof vi.fn>).mockResolvedValue(
				'prompt = "some prompt"',
			);

			await generator.generate(targetDir);

			expect(fs.ensureDir).toHaveBeenCalledWith(
				expect.stringContaining(join(".test", "commands")),
			);
			expect(fs.ensureDir).toHaveBeenCalledWith(
				expect.stringContaining(join(".test", "conductor")),
			);
		});

		it("should write command files", async () => {
			(loadTemplate as ReturnType<typeof vi.fn>).mockResolvedValue(
				'prompt = "some prompt"',
			);

			await generator.generate(targetDir);

			expect(fs.writeFile).toHaveBeenCalled();
		});

		it("should copy template directory", async () => {
			(loadTemplate as ReturnType<typeof vi.fn>).mockResolvedValue(
				'prompt = "some prompt"',
			);

			await generator.generate(targetDir);

			expect(fs.copy).toHaveBeenCalledWith(
				expect.stringContaining("templates"),
				expect.stringContaining(join(".test", "conductor", "templates")),
			);
		});

		it("should include review command in generated commands", async () => {
			(loadTemplate as ReturnType<typeof vi.fn>).mockResolvedValue(
				'prompt = "some prompt"',
			);

			await generator.generate(targetDir);

			const writeFileCalls = (
				fs.writeFile as unknown as ReturnType<typeof vi.fn>
			).mock.calls;
			const reviewCommandCall = writeFileCalls.find(
				(call: unknown[]) =>
					call[0] && typeof call[0] === "string" && call[0].includes("review"),
			);
			expect(reviewCommandCall).toBeDefined();
		});
	});

	describe("command list", () => {
		it("should include discovered commands in the commands array", async () => {
			(loadTemplate as ReturnType<typeof vi.fn>).mockResolvedValue(
				'prompt = "some prompt"',
			);
			// Mock readdir to return some commands
			vi.mocked(fs.readdir).mockImplementation(async () => [
				"setup.toml",
				"newTrack.toml",
				"custom.toml",
			]);
			vi.mocked(fs.existsSync).mockImplementation((p) => {
				if (typeof p === "string" && p.includes("commands/conductor"))
					return true;
				return false;
			});

			await generator.generate(targetDir);

			const expectedCommands = ["setup", "newTrack", "custom"];
			for (const cmd of expectedCommands) {
				expect(loadTemplate).toHaveBeenCalledWith(
					`commands/conductor/${cmd}.toml`,
					"/mock/template/root",
				);
			}
		});

		it("should fallback to default commands if discovery returns empty", async () => {
			(loadTemplate as ReturnType<typeof vi.fn>).mockResolvedValue(
				'prompt = "some prompt"',
			);
			// Mock readdir to return empty or fail
			vi.mocked(fs.readdir).mockImplementation(async () => []);
			(fs.existsSync as ReturnType<typeof vi.fn>).mockImplementation((p) => {
				if (typeof p === "string" && p.includes("commands/conductor"))
					return true;
				return false;
			});

			await generator.generate(targetDir);

			// Defaults
			const expectedCommands = [
				"setup",
				"newTrack",
				"implement",
				"status",
				"revert",
				"review",
			];
			for (const cmd of expectedCommands) {
				expect(loadTemplate).toHaveBeenCalledWith(
					`commands/conductor/${cmd}.toml`,
					"/mock/template/root",
				);
			}
		});
	});
});
