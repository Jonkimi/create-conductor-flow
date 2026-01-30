import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

describe("Tsup Build Configuration", () => {
	const tsupConfigPath = join(process.cwd(), "tsup.config.ts");

	describe("tsup.config.ts", () => {
		it("should exist", () => {
			expect(existsSync(tsupConfigPath)).toBe(true);
		});

		it("should configure output to js/dist/", () => {
			const tsupConfig = readFileSync(tsupConfigPath, "utf-8");
			expect(tsupConfig).toContain("dist");
		});

		it("should NOT copy gemini-conductor-codebase to dist/templates", () => {
			const tsupConfig = readFileSync(tsupConfigPath, "utf-8");
			expect(tsupConfig).not.toContain("gemini-conductor-codebase");
		});
	});

	describe("Build output", () => {
		it("should build to js/dist/", () => {
			expect(() => {
				execSync("npx tsup", { stdio: "inherit" });
			}).not.toThrow();
		});

		it("should create output files", () => {
			const distDir = join(process.cwd(), "dist");
			expect(existsSync(distDir)).toBe(true);
		});

		it("should bundle templates including review.toml", () => {
			const reviewTemplatePath = join(
				process.cwd(),
				"dist",
				"conductor",
				"commands",
				"conductor",
				"review.toml",
			);
			expect(existsSync(reviewTemplatePath)).toBe(true);
		});

		it("should bundle all standard command templates", () => {
			const templateDir = join(
				process.cwd(),
				"dist",
				"conductor",
				"commands",
				"conductor",
			);
			const expectedTemplates = [
				"setup.toml",
				"newTrack.toml",
				"implement.toml",
				"status.toml",
				"revert.toml",
				"review.toml",
			];
			for (const template of expectedTemplates) {
				expect(
					existsSync(join(templateDir, template)),
					`Missing template: ${template}`,
				).toBe(true);
			}
		});
	});
});
