import { describe, it, expect, vi } from "vitest";

// Mock the install command handler to prevent execution
vi.mock("../src/commands/install.js", () => ({
	installHandler: vi.fn(),
}));

import { cli } from "../src/cli/index.js";

describe("CLI Structure", () => {
	// Only test what is actually in cli/index.ts
	it("should parse install command with basic args", async () => {
		const args = await cli.parse(
			"install . --agent opencode",
			{},
			(err, argv, output) => {},
		);
		expect(args.path).toBe(".");
		expect(args.agent).toBe("opencode");
	});
});
