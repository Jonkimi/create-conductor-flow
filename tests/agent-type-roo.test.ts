import { describe, it, expectTypeOf } from "vitest";
import { AgentType } from "../src/types.js";

describe("AgentType Definition (Roo Code)", () => {
	it("should include roo-code as a valid agent type", () => {
		const agent: AgentType = "roo-code";
		expectTypeOf(agent).toMatchTypeOf<AgentType>();
	});
});
