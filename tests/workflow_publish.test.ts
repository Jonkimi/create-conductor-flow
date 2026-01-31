import { describe, it, expect } from "vitest";
import path from "path";
import fs from "fs/promises";

describe("GitHub Actions NPM Trusted Publishing Configuration", () => {
	const workflowPath = path.join(
		process.cwd(),
		".github/workflows/remote-publish.yml",
	);

	it("should have the correct permissions for trusted publishing", async () => {
		const content = await fs.readFile(workflowPath, "utf-8");
		expect(content).toContain("permissions:");
		expect(content).toContain("id-token: write");
		expect(content).toContain("contents: read");
	});

	it("should use pnpm publish with provenance", async () => {
		const content = await fs.readFile(workflowPath, "utf-8");
		expect(content).toContain("pnpm publish");
		expect(content).toContain("--provenance");
		expect(content).toContain("--no-git-checks");
	});

	it("should NOT use NPM_TOKEN secret", async () => {
		const content = await fs.readFile(workflowPath, "utf-8");
		expect(content).not.toContain("${{ secrets.NPM_TOKEN }}");
	});
});
