import { describe, it, expect, vi, beforeEach } from "vitest";
import {
	AntigravityGenerator,
	CursorGenerator,
	WindsurfGenerator,
	ClaudeCodeGenerator,
	ClineGenerator,
	CodexGenerator,
	GeminiGenerator,
	OpenCodeGenerator,
	VSCodeCopilotGenerator,
	KiloCodeGenerator,
} from "../src/generators/index.js";
import fs from "fs-extra";
import * as templateUtils from "../src/utils/template.js";
import { join } from "path";

vi.mock("fs-extra");
vi.mock("../src/utils/template.js");

const agents = [
	{
		name: "Antigravity",
		generator: new AntigravityGenerator(),
		expectedDir: ".agent/workflows",
		extension: ".md",
		usesPrefix: true,
	},
	{
		name: "Cursor",
		generator: new CursorGenerator(),
		expectedDir: ".cursor/commands",
		extension: ".md",
		usesPrefix: true,
	},
	{
		name: "Windsurf",
		generator: new WindsurfGenerator(),
		expectedDir: ".windsurf/workflows",
		extension: ".md",
		usesPrefix: true,
	},
	{
		name: "ClaudeCode",
		generator: new ClaudeCodeGenerator(),
		expectedDir: ".claude/commands",
		extension: ".md",
		usesPrefix: true,
	},
	{
		name: "Cline",
		generator: new ClineGenerator(),
		expectedDir: ".clinerules/workflows",
		extension: ".md",
		usesPrefix: true,
	},
	{
		name: "Codex",
		generator: new CodexGenerator(),
		expectedDir: ".codex/prompts",
		extension: ".md",
		usesPrefix: true,
	},
	{
		name: "Gemini",
		generator: new GeminiGenerator(),
		expectedDir: ".gemini/commands/conductor",
		extension: ".toml",
		usesPrefix: false, // Gemini uses no prefix (e.g., "setup.toml" not "conductor:setup.toml")
	},
	{
		name: "OpenCode",
		generator: new OpenCodeGenerator(),
		expectedDir: ".opencode/commands",
		extension: ".md",
		usesPrefix: true,
	},
	{
		name: "VSCodeCopilot",
		generator: new VSCodeCopilotGenerator(),
		expectedDir: ".github/prompts",
		extension: ".prompt.md",
		usesPrefix: true,
	},
	{
		name: "KiloCode",
		generator: new KiloCodeGenerator(),
		expectedDir: ".kilocode/workflows",
		extension: ".md",
		usesPrefix: true,
	},
];

describe("Generator Workflow Files Coverage", () => {
	const targetDir = "/mock/project";

	beforeEach(() => {
		vi.resetAllMocks();
		vi.mocked(templateUtils.getTemplateRoot).mockResolvedValue(
			"/mock/templates",
		);

		// Mock loadTemplate to return valid TOML for all standard commands
		vi.mocked(templateUtils.loadTemplate).mockImplementation(async (path) => {
			const validCommands = [
				"setup",
				"newTrack",
				"implement",
				"status",
				"revert",
				"review",
			];
			for (const cmd of validCommands) {
				if (path.includes(`${cmd}.toml`)) {
					return `description = "Test ${cmd}"\nprompt = "Run ${cmd}"`;
				}
			}
			throw new Error(`Template not found: ${path}`);
		});

		vi.mocked(templateUtils.substituteVariables).mockImplementation(
			(content) => content,
		);
	});

	agents.forEach(({ name, generator, expectedDir, extension, usesPrefix }) => {
		it(`should generate all required workflow files for ${name}`, async () => {
			await generator.generate(targetDir);

			const baseCommands = [
				"setup",
				"newTrack",
				"implement",
				"status",
				"revert",
				"review",
			];

			for (const cmd of baseCommands) {
				const fileName = usesPrefix ? `conductor:${cmd}` : cmd;
				const expectedPath = join(
					targetDir,
					expectedDir,
					`${fileName}${extension}`,
				);

				// Assert that writeFile was called for this path
				// We find the call that matches the path
				const matchingCall = vi.mocked(fs.writeFile).mock.calls.find((call) => {
					return (call[0] as string) === expectedPath;
				});

				expect(
					matchingCall,
					`Missing workflow generation: ${cmd} for ${name}`,
				).toBeTruthy();
			}
		});
	});
});
