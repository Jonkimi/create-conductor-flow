import { describe, it, expect } from "vitest";
import type { AgentConfig } from "../../src/generators/types.js";
import { opencodeConfig } from "../../src/generators/opencode/index.js";
import { claudeCodeConfig } from "../../src/generators/claude-code/index.js";
import { antigravityConfig } from "../../src/generators/antigravity/index.js";
import { cursorConfig } from "../../src/generators/cursor/index.js";
import { vscodeCopilotConfig } from "../../src/generators/vscode-copilot/index.js";
import { codexConfig } from "../../src/generators/codex/index.js";
import { windsurfConfig } from "../../src/generators/windsurf/index.js";
import { clineConfig } from "../../src/generators/cline/index.js";
import { geminiConfig } from "../../src/generators/gemini/index.js";
import { kilocodeConfig } from "../../src/generators/kilocode/index.js";

describe("AgentConfig", () => {
	describe("Agent Specific Configurations", () => {
		it("should have correct configuration for opencode agent", () => {
			const config = opencodeConfig;
			expect(config).toBeDefined();
			expect(config.agentType).toBe("opencode");
			expect(config.agentDir).toBe(".opencode");
			expect(config.commandsDir).toBe("commands");
			expect(config.displayName).toBe("OpenCode");
		});

		it("should have correct configuration for claude-code agent", () => {
			const config = claudeCodeConfig;
			expect(config).toBeDefined();
			expect(config.agentType).toBe("claude-code");
			expect(config.agentDir).toBe(".claude");
			expect(config.commandsDir).toBe("commands");
			expect(config.displayName).toBe("Claude Code");
		});

		it("should have correct configuration for antigravity agent", () => {
			const config = antigravityConfig;
			expect(config).toBeDefined();
			expect(config.agentType).toBe("antigravity");
			expect(config.agentDir).toBe(".agent");
			expect(config.commandsDir).toBe("workflows");
			expect(config.displayName).toBe("Antigravity");
		});

		it("should have correct configuration for cursor agent", () => {
			const config = cursorConfig;
			expect(config).toBeDefined();
			expect(config.agentType).toBe("cursor");
			expect(config.agentDir).toBe(".cursor");
			expect(config.commandsDir).toBe("commands");
			expect(config.displayName).toBe("Cursor");
		});

		it("should have correct configuration for windsurf agent", () => {
			const config = windsurfConfig;
			expect(config).toBeDefined();
			expect(config.agentType).toBe("windsurf");
			expect(config.agentDir).toBe(".windsurf");
			expect(config.commandsDir).toBe("workflows");
			expect(config.displayName).toBe("Windsurf");
		});

		it("should have correct configuration for cline agent", () => {
			const config = clineConfig;
			expect(config).toBeDefined();
			expect(config.agentType).toBe("cline");
			expect(config.agentDir).toBe(".clinerules");
			expect(config.commandsDir).toBe("workflows");
			expect(config.displayName).toBe("Cline");
		});

		it("should have correct configuration for gemini agent", () => {
			const config = geminiConfig;
			expect(config).toBeDefined();
			expect(config.agentType).toBe("gemini");
			expect(config.agentDir).toBe(".gemini");
			expect(config.commandsDir).toBe("commands/conductor");
			expect(config.displayName).toBe("Gemini CLI");
			expect(config.extension).toBe(".toml");
		});

		it("should have correct configuration for kilocode agent", () => {
			const config = kilocodeConfig;
			expect(config).toBeDefined();
			expect(config.agentType).toBe("kilo-code");
			expect(config.agentDir).toBe(".kilocode");
			expect(config.commandsDir).toBe("workflows");
			expect(config.displayName).toBe("Kilo Code");
		});

		it("should have all required fields for each config", () => {
			const allConfigs: AgentConfig[] = [
				opencodeConfig,
				claudeCodeConfig,
				antigravityConfig,
				cursorConfig,
				vscodeCopilotConfig,
				codexConfig,
				windsurfConfig,
				clineConfig,
				geminiConfig,
				kilocodeConfig,
			];

			const requiredFields: (keyof AgentConfig)[] = [
				"agentType",
				"agentDir",
				"commandsDir",
				"displayName",
			];

			allConfigs.forEach((config) => {
				requiredFields.forEach((field) => {
					const value = config[field];
					expect(value).toBeDefined();
					expect(typeof value).toBe("string");
					if (typeof value === "string") {
						expect(value.length).toBeGreaterThan(0);
					}
				});
			});
		});
	});
});
