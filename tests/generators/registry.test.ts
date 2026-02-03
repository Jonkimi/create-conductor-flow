import { describe, it, expect } from "vitest";
import { ALL_AGENT_CONFIGS } from "../../src/generators/registry.js";
import { AgentConfig } from "../../src/generators/types.js";

describe("Generator Registry", () => {
	it("should export ALL_AGENT_CONFIGS as an array", () => {
		expect(Array.isArray(ALL_AGENT_CONFIGS)).toBe(true);
		expect(ALL_AGENT_CONFIGS.length).toBeGreaterThan(0);
	});

	it("should contain valid agent configs", () => {
		ALL_AGENT_CONFIGS.forEach((config: AgentConfig) => {
			expect(config).toHaveProperty("agentType");
			expect(config).toHaveProperty("displayName");
			expect(config).toHaveProperty("agentDir");
			expect(config).toHaveProperty("commandsDir");
		});
	});

	it("should contain expected agents", () => {
		const agentTypes = ALL_AGENT_CONFIGS.map((c) => c.agentType);
		expect(agentTypes).toContain("cursor");
		expect(agentTypes).toContain("codex");
		expect(agentTypes).toContain("antigravity");
		expect(agentTypes).toContain("kilo-code");
	});
});
