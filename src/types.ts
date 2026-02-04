export type AgentType =
	| "opencode"
	| "claude-code"
	| "antigravity"
	| "cursor"
	| "vscode-copilot"
	| "codex"
	| "windsurf"
	| "cline"
	| "kilo-code"
	| "roo-code"
	| "qwen-code"
	| "factory-droid"
	| "gemini";

export type InstallScope = "global" | "project";

export interface ProjectConfig {
	agentType: AgentType;
	targetDir: string;
}
