import { AgentType } from "../types.js";
import { AgentGenerator } from "./types.js";
import { OpenCodeGenerator } from "./opencode/index.js";
import { ClaudeCodeGenerator } from "./claude-code/index.js";
import { AntigravityGenerator } from "./antigravity/index.js";
import { CursorGenerator } from "./cursor/index.js";
import { VSCodeCopilotGenerator } from "./vscode-copilot/index.js";
import { CodexGenerator } from "./codex/index.js";
import { WindsurfGenerator } from "./windsurf/index.js";
import { ClineGenerator } from "./cline/index.js";
import { GeminiGenerator } from "./gemini/index.js";
import { KiloCodeGenerator } from "./kilocode/generator.js";
import { RooCodeGenerator } from "./roocode/generator.js";
import { QwenCodeGenerator } from "./qwencode/generator.js";
import { FactoryDroidGenerator } from "./factorydroid/generator.js";

export * from "./types.js";
export * from "./opencode/index.js";
export * from "./claude-code/index.js";
export * from "./antigravity/index.js";
export * from "./cursor/index.js";
export * from "./vscode-copilot/index.js";
export * from "./codex/index.js";
export * from "./windsurf/index.js";
export * from "./cline/index.js";
export * from "./gemini/index.js";
export * from "./kilocode/index.js";
export * from "./roocode/index.js";
export * from "./qwencode/index.js";
export * from "./factorydroid/index.js";

export function getGenerator(agentType: AgentType): AgentGenerator {
	switch (agentType) {
		case "claude-code":
			return new ClaudeCodeGenerator();
		case "antigravity":
			return new AntigravityGenerator();
		case "cursor":
			return new CursorGenerator();
		case "vscode-copilot":
			return new VSCodeCopilotGenerator();
		case "codex":
			return new CodexGenerator();
		case "windsurf":
			return new WindsurfGenerator();
		case "cline":
			return new ClineGenerator();
		case "kilo-code":
			return new KiloCodeGenerator();
		case "roo-code":
			return new RooCodeGenerator();
		case "qwen-code":
			return new QwenCodeGenerator();
		case "factory-droid":
			return new FactoryDroidGenerator();
		case "gemini":
			return new GeminiGenerator();
		case "opencode":
		default:
			return new OpenCodeGenerator();
	}
}
