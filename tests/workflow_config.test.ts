import { describe, it, expect } from "vitest";
import path from "path";
import fs from "fs/promises";

describe("GitHub Actions Workflow Configuration", () => {
	const workflowPath = path.join(
		process.cwd(),
		".github/workflows/remote-publish.yml",
	);

	it("should have the remote-publish.yml workflow file", async () => {
		const exists = await fs
			.access(workflowPath)
			.then(() => true)
			.catch(() => false);
		expect(exists).toBe(true);
	});

	it("should trigger on push tags v*", async () => {
		const content = await fs.readFile(workflowPath, "utf-8");
		expect(content).toContain("push:");
		expect(content).toContain("tags:");
		expect(content).toContain("'v*'");
	});

	it("should checkout code", async () => {
		const content = await fs.readFile(workflowPath, "utf-8");
		expect(content).toContain("actions/checkout");
	});

	it("should setup node with registry", async () => {
		const content = await fs.readFile(workflowPath, "utf-8");
		expect(content).toContain("actions/setup-node");
		expect(content).toContain("registry-url:");
		expect(content).toContain("https://registry.npmjs.org");
	});

	it("should setup pnpm", async () => {
		const content = await fs.readFile(workflowPath, "utf-8");
		expect(content).toContain("pnpm/action-setup");
	});

	it("should run build and test", async () => {
		const content = await fs.readFile(workflowPath, "utf-8");
		expect(content).toContain("pnpm build");
		expect(content).toContain("pnpm test");
	});
});
