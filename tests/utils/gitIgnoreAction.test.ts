import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { join } from "path";
import { mkdtemp, writeFile, readFile, mkdir, rm } from "fs/promises";
import { tmpdir } from "os";
import {
	executeGitIgnoreAction,
	type ExecuteGitIgnoreResult,
} from "../../src/utils/gitIgnoreAction.js";

describe("Git Ignore Action Execution", () => {
	let tempDir: string;

	beforeEach(async () => {
		tempDir = await mkdtemp(join(tmpdir(), "conductor-test-"));
		// Create .git/info directory for exclude file tests
		await mkdir(join(tempDir, ".git", "info"), { recursive: true });
	});

	afterEach(async () => {
		await rm(tempDir, { recursive: true, force: true });
	});

	describe("gitignore method", () => {
		it("should append entries to .gitignore", async () => {
			const gitignorePath = join(tempDir, ".gitignore");
			await writeFile(gitignorePath, "node_modules\n");

			const result = await executeGitIgnoreAction(
				tempDir,
				"gitignore",
				"claude-code",
			);

			const content = await readFile(gitignorePath, "utf-8");
			expect(content).toContain(".claude");
			expect(content).toContain("CLAUDE.md");
			expect(result.action).toBe("added");
			expect(result.entries).toContain(".claude");
		});

		it("should create .gitignore if it does not exist", async () => {
			const result = await executeGitIgnoreAction(
				tempDir,
				"gitignore",
				"opencode",
			);

			const gitignorePath = join(tempDir, ".gitignore");
			const content = await readFile(gitignorePath, "utf-8");
			expect(content).toContain(".opencode");
			expect(content).toContain("AGENTS.md");
			expect(result.action).toBe("added");
		});

		it("should skip if entries already exist", async () => {
			const gitignorePath = join(tempDir, ".gitignore");
			await writeFile(gitignorePath, ".claude\nCLAUDE.md\n");

			const result = await executeGitIgnoreAction(
				tempDir,
				"gitignore",
				"claude-code",
			);

			expect(result.action).toBe("skipped");
			expect(result.message).toContain("already present");
		});
	});

	describe("exclude method", () => {
		it("should append entries to .git/info/exclude", async () => {
			const excludePath = join(tempDir, ".git", "info", "exclude");
			await writeFile(excludePath, "# Local excludes\n");

			const result = await executeGitIgnoreAction(
				tempDir,
				"exclude",
				"gemini",
			);

			const content = await readFile(excludePath, "utf-8");
			expect(content).toContain(".gemini");
			expect(content).toContain("GEMINI.md");
			expect(result.action).toBe("added");
		});

		it("should create .git/info/exclude if it does not exist", async () => {
			// Remove the exclude file we created in beforeEach
			const excludePath = join(tempDir, ".git", "info", "exclude");
			await rm(excludePath, { force: true });

			const result = await executeGitIgnoreAction(
				tempDir,
				"exclude",
				"opencode",
			);

			const content = await readFile(excludePath, "utf-8");
			expect(content).toContain(".opencode");
			expect(result.action).toBe("added");
		});
	});

	describe("none method (removal)", () => {
		it("should remove entries from .gitignore", async () => {
			const gitignorePath = join(tempDir, ".gitignore");
			await writeFile(gitignorePath, "node_modules\n.claude\nCLAUDE.md\ndist\n");

			const result = await executeGitIgnoreAction(
				tempDir,
				"none",
				"claude-code",
			);

			const content = await readFile(gitignorePath, "utf-8");
			expect(content).not.toContain(".claude");
			expect(content).not.toContain("CLAUDE.md");
			expect(content).toContain("node_modules");
			expect(result.action).toBe("removed");
		});

		it("should remove entries from .git/info/exclude", async () => {
			const excludePath = join(tempDir, ".git", "info", "exclude");
			await writeFile(excludePath, ".gemini\nGEMINI.md\n");

			const result = await executeGitIgnoreAction(tempDir, "none", "gemini");

			const content = await readFile(excludePath, "utf-8");
			expect(content).not.toContain(".gemini");
			expect(content).not.toContain("GEMINI.md");
			expect(result.action).toBe("removed");
		});

		it("should remove entries from both files", async () => {
			const gitignorePath = join(tempDir, ".gitignore");
			const excludePath = join(tempDir, ".git", "info", "exclude");
			await writeFile(gitignorePath, ".claude\nCLAUDE.md\n");
			await writeFile(excludePath, ".claude\nCLAUDE.md\n");

			const result = await executeGitIgnoreAction(
				tempDir,
				"none",
				"claude-code",
			);

			const gitignoreContent = await readFile(gitignorePath, "utf-8");
			const excludeContent = await readFile(excludePath, "utf-8");
			expect(gitignoreContent).not.toContain(".claude");
			expect(excludeContent).not.toContain(".claude");
			expect(result.action).toBe("removed");
		});

		it("should report no entries found when nothing to remove", async () => {
			const gitignorePath = join(tempDir, ".gitignore");
			await writeFile(gitignorePath, "node_modules\n");

			const result = await executeGitIgnoreAction(
				tempDir,
				"none",
				"claude-code",
			);

			expect(result.action).toBe("none");
			expect(result.message).toContain("No Conductor git ignore entries found");
		});
	});

	describe("feedback messages", () => {
		it("should include added entries in result", async () => {
			const result = await executeGitIgnoreAction(
				tempDir,
				"gitignore",
				"claude-code",
			);

			expect(result.entries).toContain(".claude");
			expect(result.entries).toContain("CLAUDE.md");
		});

		it("should include removed entries in result", async () => {
			const gitignorePath = join(tempDir, ".gitignore");
			await writeFile(gitignorePath, ".claude\nCLAUDE.md\n");

			const result = await executeGitIgnoreAction(
				tempDir,
				"none",
				"claude-code",
			);

			expect(result.entries).toContain(".claude");
			expect(result.entries).toContain("CLAUDE.md");
		});
	});
});
