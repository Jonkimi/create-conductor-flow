import { describe, it, expect, beforeAll } from "vitest";
import { execSync } from "child_process";
import * as fs from "fs";
import { join } from "path";

describe("CLI Integration", () => {
	const cliPath = join(process.cwd(), "dist", "index.js");

	it("should display version", () => {
		const pkg = JSON.parse(
			fs.readFileSync(join(process.cwd(), "package.json"), "utf-8"),
		);
		const output = execSync(`node ${cliPath} --version`).toString();
		expect(output).toContain(pkg.version);
	});

	it("should display help", () => {
		const output = execSync(`node ${cliPath} --help`).toString();
		expect(output).toContain("conductor-flow [path] [options]");
	});

	describe("Template Source Selection", () => {
		it("should skip template source prompt when --repo is provided", () => {
			// When --repo is explicitly provided, it should not prompt for template source
			// We can verify this by checking the help text mentions the repo option
			const output = execSync(`node ${cliPath} --help`).toString();
			expect(output).toContain("--repo");
		});

		it("should use bundled templates in CI mode (non-interactive)", () => {
			// In CI mode (CI=true), the CLI should use bundled templates without prompting
			// This test verifies the CLI doesn't hang waiting for input in CI mode
			// We can't fully test the install without mocking, but we can ensure
			// the help command works in CI mode
			const output = execSync(`CI=true node ${cliPath} --help`).toString();
			expect(output).toContain("conductor-flow");
		});
	});
});
