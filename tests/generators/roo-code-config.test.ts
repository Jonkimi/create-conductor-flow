import { describe, it, expect } from "vitest";
import { rooCodeConfig } from "../../src/generators/roo-code/config.js";

describe("Roo Code Configuration", () => {
	it("should have correct configuration for roo-code agent", () => {
		const config = rooCodeConfig;
		expect(config).toBeDefined();
		expect(config.agentType).toBe("roo-code");
		expect(config.agentDir).toBe(".roo");
		expect(config.commandsDir).toBe("commands");
		expect(config.displayName).toBe("Roo Code");
		expect(config.protocolFilename).toBe("AGENTS.md");
	});
});
