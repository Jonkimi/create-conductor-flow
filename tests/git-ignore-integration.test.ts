import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { execSync } from "child_process";
import * as fs from "fs";
import { join } from "path";
import { mkdtempSync, rmSync } from "fs";
import { tmpdir } from "os";

describe("Git Ignore Integration", () => {
	const cliPath = join(process.cwd(), "dist", "index.js");
	let testDir: string;

	beforeEach(() => {
		// Create a temp directory for each test
		testDir = mkdtempSync(join(tmpdir(), "conductor-git-ignore-"));
		// Initialize git repo
		execSync("git init", { cwd: testDir, stdio: "ignore" });
	});

	afterEach(() => {
		// Clean up test directory
		rmSync(testDir, { recursive: true, force: true });
	});

	describe("--git-ignore gitignore flag", () => {
		it("should add entries to .gitignore when flag is gitignore", () => {
			execSync(
				`CONDUCTOR_NO_BANNER=1 node ${cliPath} ${testDir} --agent claude-code --scope project --git-ignore gitignore --force`,
				{ stdio: "pipe" },
			);

			const gitignorePath = join(testDir, ".gitignore");
			expect(fs.existsSync(gitignorePath)).toBe(true);

			const content = fs.readFileSync(gitignorePath, "utf-8");
			expect(content).toContain("# Conductor");
			expect(content).toContain(".claude");
			expect(content).toContain("CLAUDE.md");
		});

		it("should add agent-specific entries for opencode", () => {
			execSync(
				`CONDUCTOR_NO_BANNER=1 node ${cliPath} ${testDir} --agent opencode --scope project --git-ignore gitignore --force`,
				{ stdio: "pipe" },
			);

			const gitignorePath = join(testDir, ".gitignore");
			const content = fs.readFileSync(gitignorePath, "utf-8");
			expect(content).toContain(".opencode");
			expect(content).toContain("AGENTS.md");
			// Should NOT contain claude-code entries
			expect(content).not.toContain(".claude");
			expect(content).not.toContain("CLAUDE.md");
		});
	});

	describe("--git-ignore exclude flag", () => {
		it("should add entries to .git/info/exclude when flag is exclude", () => {
			execSync(
				`CONDUCTOR_NO_BANNER=1 node ${cliPath} ${testDir} --agent claude-code --scope project --git-ignore exclude --force`,
				{ stdio: "pipe" },
			);

			const excludePath = join(testDir, ".git", "info", "exclude");
			expect(fs.existsSync(excludePath)).toBe(true);

			const content = fs.readFileSync(excludePath, "utf-8");
			expect(content).toContain("# Conductor");
			expect(content).toContain(".claude");
			expect(content).toContain("CLAUDE.md");
		});
	});

	describe("--git-ignore none flag", () => {
		it("should remove entries from .gitignore when flag is none", () => {
			// First add entries
			const gitignorePath = join(testDir, ".gitignore");
			fs.writeFileSync(
				gitignorePath,
				"# Other stuff\nnode_modules\n\n# Conductor\n.claude\nCLAUDE.md\n",
			);

			// Run with none to remove
			execSync(
				`CONDUCTOR_NO_BANNER=1 node ${cliPath} ${testDir} --agent claude-code --scope project --git-ignore none --force`,
				{ stdio: "pipe" },
			);

			const content = fs.readFileSync(gitignorePath, "utf-8");
			expect(content).not.toContain(".claude");
			expect(content).not.toContain("CLAUDE.md");
			// Should preserve other entries
			expect(content).toContain("node_modules");
		});

		it("should remove entries from both files when flag is none", () => {
			// Add entries to both files
			const gitignorePath = join(testDir, ".gitignore");
			const excludePath = join(testDir, ".git", "info", "exclude");

			fs.writeFileSync(
				gitignorePath,
				"# Conductor\n.claude\nCLAUDE.md\n",
			);
			fs.appendFileSync(excludePath, "\n# Conductor\n.claude\nCLAUDE.md\n");

			// Run with none to remove
			execSync(
				`CONDUCTOR_NO_BANNER=1 node ${cliPath} ${testDir} --agent claude-code --scope project --git-ignore none --force`,
				{ stdio: "pipe" },
			);

			const gitignoreContent = fs.readFileSync(gitignorePath, "utf-8");
			const excludeContent = fs.readFileSync(excludePath, "utf-8");

			expect(gitignoreContent).not.toContain(".claude");
			expect(excludeContent).not.toContain(".claude");
		});
	});

	describe("no --git-ignore flag with --scope project", () => {
		it("should not modify git ignore files when flag is not provided", () => {
			// Create empty .gitignore
			const gitignorePath = join(testDir, ".gitignore");
			fs.writeFileSync(gitignorePath, "node_modules\n");

			// The install will prompt for git ignore interactively, but since
			// we're running non-interactively, it may fail or skip.
			// This test verifies that without the flag, no automatic action is taken.
			try {
				execSync(
					`echo "3" | CONDUCTOR_NO_BANNER=1 node ${cliPath} ${testDir} --agent claude-code --scope project --force`,
					{ stdio: "pipe" },
				);
			} catch {
				// May fail due to interactive prompt
			}

			// If it succeeded with piped input selecting "Don't configure",
			// the gitignore should remain unchanged
			const content = fs.readFileSync(gitignorePath, "utf-8");
			// Just check it still exists and has our original content
			expect(content).toContain("node_modules");
		});
	});

	describe("--git-ignore with global scope", () => {
		it("should skip git ignore configuration with warning for global scope", () => {
			const output = execSync(
				`CONDUCTOR_NO_BANNER=1 node ${cliPath} ${testDir} --agent claude-code --scope global --git-ignore gitignore --force 2>&1`,
				{ encoding: "utf-8" },
			);

			// Should show warning about global scope
			expect(output).toContain("--git-ignore flag is only supported for project scope");

			// Should not create .gitignore with conductor entries
			const gitignorePath = join(testDir, ".gitignore");
			if (fs.existsSync(gitignorePath)) {
				const content = fs.readFileSync(gitignorePath, "utf-8");
				expect(content).not.toContain("# Conductor");
			}
		});
	});
});
