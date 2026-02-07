import { describe, it, expect } from "vitest";
import { defaultContentStrategy } from "../../src/generators/default/index.js";
import { clineContentStrategy } from "../../src/generators/cline/index.js";
import { githubCopilotContentStrategy } from "../../src/generators/github-copilot/index.js";
import { geminiContentStrategy } from "../../src/generators/gemini/index.js";
import { kilocodeContentStrategy } from "../../src/generators/kilocode/index.js";
import { factoryDroidContentStrategy } from "../../src/generators/factorydroid/index.js";

describe("Agent Content Strategies", () => {
	const basicToml =
		'description = "Test description"\nprompt = "Test prompt content"';

	describe("FactoryDroidContentStrategy", () => {
		it("should add frontmatter with description", () => {
			const result = factoryDroidContentStrategy.process(basicToml, {
				installPath: ".factory/conductor",
				agentType: "factory-droid",
			});

			expect(result).not.toBeNull();
			expect(result).toMatch(/^---\ndescription: "Test description"\n---\n/);
			expect(result).toContain("Test prompt content");
		});

		it("should substitute variables", () => {
			const tomlWithVar = 'prompt = "Use {agent_type}"';
			const result = factoryDroidContentStrategy.process(tomlWithVar, {
				installPath: ".factory/conductor",
				agentType: "factory-droid",
			});

			expect(result).toContain("Use factory-droid");
		});

		it("should replace install path", () => {
			const tomlWithPath = 'prompt = "Path: ~/.gemini/extensions/conductor"';
			const result = factoryDroidContentStrategy.process(tomlWithPath, {
				installPath: ".factory/conductor",
				agentType: "factory-droid",
			});

			expect(result).toContain("Path: .factory/conductor");
		});
	});

	describe("ClineContentStrategy", () => {
		it("should generate plain markdown with title for cline agent", () => {
			const result = clineContentStrategy.process(basicToml, {
				installPath: ".cline/conductor",
				agentType: "cline",
				commandName: "setup",
			});

			expect(result).not.toBeNull();
			expect(result).toMatch(/^# Conductor Setup\n/);
			expect(result).toContain("Test description");
			expect(result).toContain("Test prompt content");
			expect(result).not.toMatch(/^---/);
		});

		it("should capitalize first letter of command name for title", () => {
			const result = clineContentStrategy.process(basicToml, {
				installPath: ".cline/conductor",
				agentType: "cline",
				commandName: "implement",
			});

			expect(result).not.toBeNull();
			expect(result).toMatch(/^# Conductor Implement\n/);
		});

		it("should handle lowercase command name", () => {
			const result = clineContentStrategy.process(basicToml, {
				installPath: ".cline/conductor",
				agentType: "cline",
				commandName: "newtrack",
			});

			expect(result).not.toBeNull();
			expect(result).toMatch(/^# Conductor Newtrack\n/);
		});

		it("should not add description if not present for cline", () => {
			const tomlWithoutDescription = 'prompt = "Test prompt"';
			const result = clineContentStrategy.process(tomlWithoutDescription, {
				installPath: ".cline/conductor",
				agentType: "cline",
				commandName: "status",
			});

			expect(result).not.toBeNull();
			expect(result).toMatch(/^# Conductor Status\n/);
			expect(result).toContain("Test prompt");
		});
	});

	describe("DefaultContentStrategy", () => {
		it("should add frontmatter for non-cline agents with description", () => {
			const result = defaultContentStrategy.process(basicToml, {
				installPath: ".opencode/conductor",
				agentType: "opencode",
			});

			expect(result).not.toBeNull();
			expect(result).toMatch(/^---\ndescription: Test description\n---\n/);
			expect(result).toContain("Test prompt content");
		});

		it("should handle missing prompt", () => {
			const tomlWithoutPrompt = 'description = "Test"';
			const result = defaultContentStrategy.process(tomlWithoutPrompt, {
				installPath: ".cline/conductor",
				agentType: "cline",
			});

			expect(result).toBeNull();
		});

		it("should substitute variables in prompt", () => {
			const tomlWithVariable =
				'description = "Test"\nprompt = "Use {agent_type}"';
			const result = defaultContentStrategy.process(tomlWithVariable, {
				installPath: ".cline/conductor",
				agentType: "cline",
			});

			expect(result).not.toBeNull();
			expect(result).toContain("Use cline");
		});

		it("should replace install path placeholder", () => {
			const tomlWithPath =
				'description = "Test"\nprompt = "Path: ~/.gemini/extensions/conductor"';
			const result = defaultContentStrategy.process(tomlWithPath, {
				installPath: ".cline/conductor",
				agentType: "cline",
			});

			expect(result).not.toBeNull();
			expect(result).toContain("Path: .cline/conductor");
		});
	});

	describe("GithubCopilotContentStrategy", () => {
		it("should add frontmatter with agent for fixedAgent", () => {
			const result = githubCopilotContentStrategy.process(basicToml, {
				installPath: "~/.codex/conductor",
				agentType: "codex",
				fixedAgent: "agent",
			});

			expect(result).not.toBeNull();
			expect(result).toMatch(
				/^---\ndescription: Test description\nagent: agent\n---\n/,
			);
			expect(result).toContain("Test prompt content");
		});
	});

	describe("GeminiContentStrategy", () => {
		it("should preserve original TOML structure for gemini agent", () => {
			const fullToml =
				'description = "Test Description"\nprompt = "Use {agent_type} in ~/.gemini/extensions/conductor"\nversion = "1.0"';
			const result = geminiContentStrategy.process(fullToml, {
				installPath: ".gemini/conductor",
				agentType: "gemini",
			});

			expect(result).not.toBeNull();
			expect(result).toContain('description = "Test Description"');
			expect(result).toContain('prompt = "Use gemini in .gemini/conductor"');
			expect(result).toContain('version = "1.0"');
		});
	});

	describe("KiloCodeContentStrategy", () => {
		it("should generate plain markdown with title for kilocode agent", () => {
			const result = kilocodeContentStrategy.process(basicToml, {
				installPath: ".kilocode/conductor",
				agentType: "kilocode",
				commandName: "setup",
			});

			expect(result).not.toBeNull();
			expect(result).toMatch(/^# Conductor Setup\n/);
			expect(result).toContain("Test description");
			expect(result).toContain("Test prompt content");
			expect(result).not.toMatch(/^---/);
		});

		it("should capitalize first letter of command name for title", () => {
			const result = kilocodeContentStrategy.process(basicToml, {
				installPath: ".kilocode/conductor",
				agentType: "kilocode",
				commandName: "implement",
			});

			expect(result).not.toBeNull();
			expect(result).toMatch(/^# Conductor Implement\n/);
		});

		it("should substitute variables in prompt", () => {
			const tomlWithVariable =
				'description = "Test"\nprompt = "Use {agent_type}"';
			const result = kilocodeContentStrategy.process(tomlWithVariable, {
				installPath: ".kilocode/conductor",
				agentType: "kilocode",
				commandName: "status",
			});

			expect(result).not.toBeNull();
			expect(result).toContain("Use kilocode");
		});

		it("should replace install path placeholder", () => {
			const tomlWithPath =
				'description = "Test"\nprompt = "Path: ~/.gemini/extensions/conductor"';
			const result = kilocodeContentStrategy.process(tomlWithPath, {
				installPath: ".kilocode/conductor",
				agentType: "kilocode",
				commandName: "status",
			});

			expect(result).not.toBeNull();
			expect(result).toContain("Path: .kilocode/conductor");
		});
	});
});
