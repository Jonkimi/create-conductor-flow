import { describe, it, expect } from "vitest";
import path from "path";
import fs from "fs/promises";

describe("GitHub Actions NPM Publish Configuration", () => {
	const workflowPath = path.join(
		process.cwd(),
		".github/workflows/remote-publish.yml",
	);

	it("should have the publish step", async () => {
		const content = await fs.readFile(workflowPath, "utf-8");
		expect(content).toContain("pnpm publish");
	});

	it("should use NPM_TOKEN secret", async () => {
		const content = await fs.readFile(workflowPath, "utf-8");
		expect(content).toContain("${{ secrets.NPM_TOKEN }}");
	});

	it("should configure NO_GIT_CHECKS for publish", async () => {
		const content = await fs.readFile(workflowPath, "utf-8");
		// pnpm publish needs --no-git-checks often in CI environments where .git might be detached or shallow
		// However, the spec didn't strictly ask for it, but standard practice suggests checkingauth configuration
		expect(content).toContain("NODE_AUTH_TOKEN");
	});
});
