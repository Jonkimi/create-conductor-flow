import { describe, it, expect } from "vitest";
import { execSync } from "child_process";
import { join } from "path";

describe("CLI --git-ignore Flag", () => {
	const cliPath = join(process.cwd(), "src", "index.ts");

	describe("Flag parsing via help output", () => {
		it("should show --git-ignore option in help", () => {
			const output = execSync(`npx tsx ${cliPath} --help`).toString();
			expect(output).toContain("--git-ignore");
			expect(output).toContain("gitignore");
			expect(output).toContain("exclude");
			expect(output).toContain("none");
		});
	});

	describe("Flag validation", () => {
		it("should accept --git-ignore gitignore", () => {
			// This should not throw an error for invalid choice
			// We use --help to avoid actually running the install
			const output = execSync(
				`npx tsx ${cliPath} --git-ignore gitignore --help`,
			).toString();
			expect(output).toContain("--git-ignore");
		});

		it("should accept --git-ignore exclude", () => {
			const output = execSync(
				`npx tsx ${cliPath} --git-ignore exclude --help`,
			).toString();
			expect(output).toContain("--git-ignore");
		});

		it("should accept --git-ignore none", () => {
			const output = execSync(
				`npx tsx ${cliPath} --git-ignore none --help`,
			).toString();
			expect(output).toContain("--git-ignore");
		});

		it("should reject invalid --git-ignore value", () => {
			try {
				execSync(`npx tsx ${cliPath} --git-ignore invalid 2>&1`);
				// Should not reach here
				expect.fail("Should have thrown an error");
			} catch (error: any) {
				// The error output is in stdout when using 2>&1 redirect
				const output = error.stdout?.toString() || error.message;
				expect(output).toContain("Invalid values");
			}
		});
	});
});
