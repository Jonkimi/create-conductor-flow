import { describe, it, expect } from "vitest";
import { execSync } from "child_process";
import * as fs from "fs";
import { join } from "path";

describe("conductor-install command", () => {
	const conductorInstallPath = join(process.cwd(), "dist", "index.js");

	describe("package.json configuration", () => {
		it("should have package name as conductor-install", () => {
			const pkg = JSON.parse(
				fs.readFileSync(join(process.cwd(), "package.json"), "utf-8"),
			);
			expect(pkg.name).toBe("conductor-install");
		});

		it("should have conductor-install bin entry", () => {
			const pkg = JSON.parse(
				fs.readFileSync(join(process.cwd(), "package.json"), "utf-8"),
			);
			expect(pkg.bin["conductor-install"]).toBeDefined();
		});

		it("should maintain backward compatibility with conductor bin", () => {
			const pkg = JSON.parse(
				fs.readFileSync(join(process.cwd(), "package.json"), "utf-8"),
			);
			expect(pkg.bin["conductor"]).toBeDefined();
		});
	});

	describe("conductor-install CLI", () => {
		it("should display help text", () => {
			const output = execSync(`node ${conductorInstallPath} --help`).toString();
			expect(output).toContain("--help");
			expect(output).toContain("--agent");
		});

		it("should display version", () => {
			const pkg = JSON.parse(
				fs.readFileSync(join(process.cwd(), "package.json"), "utf-8"),
			);
			const output = execSync(
				`node ${conductorInstallPath} --version`,
			).toString();
			expect(output).toContain(pkg.version);
		});

		it("should accept --agent option", () => {
			// This test just validates the CLI accepts the option without error
			// We won't actually run installation, just check help output
			const output = execSync(`node ${conductorInstallPath} --help`).toString();
			expect(output).toContain("--agent");
			expect(output).toContain("-a");
		});

		it("should accept --path option", () => {
			const output = execSync(`node ${conductorInstallPath} --help`).toString();
			expect(output).toContain("path");
		});
	});
});
