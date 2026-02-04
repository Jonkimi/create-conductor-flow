import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { join } from "path";
import { mkdtemp, writeFile, readFile, mkdir, rm } from "fs/promises";
import { tmpdir } from "os";
import {
	getGitIgnoreEntriesForAgent,
	checkEntriesExist,
	appendEntries,
	removeEntries,
	resolveGitIgnorePath,
} from "../../src/utils/gitIgnore.js";

describe("Git Ignore Utilities", () => {
	let tempDir: string;

	beforeEach(async () => {
		tempDir = await mkdtemp(join(tmpdir(), "conductor-test-"));
	});

	afterEach(async () => {
		await rm(tempDir, { recursive: true, force: true });
	});

	describe("getGitIgnoreEntriesForAgent", () => {
		it("should return agent directory and protocol file for claude-code", () => {
			const entries = getGitIgnoreEntriesForAgent("claude-code");

			expect(entries).toContain(".claude");
			expect(entries).toContain("CLAUDE.md");
			expect(entries).toHaveLength(2);
		});

		it("should return agent directory and protocol file for opencode", () => {
			const entries = getGitIgnoreEntriesForAgent("opencode");

			expect(entries).toContain(".opencode");
			expect(entries).toContain("AGENTS.md");
			expect(entries).toHaveLength(2);
		});

		it("should return agent directory and protocol file for gemini", () => {
			const entries = getGitIgnoreEntriesForAgent("gemini");

			expect(entries).toContain(".gemini");
			expect(entries).toContain("GEMINI.md");
			expect(entries).toHaveLength(2);
		});

		it("should return empty array for unknown agent type", () => {
			// @ts-expect-error Testing invalid agent type
			const entries = getGitIgnoreEntriesForAgent("unknown-agent");

			expect(entries).toEqual([]);
		});
	});

	describe("checkEntriesExist", () => {
		it("should correctly identify existing entries in a file", async () => {
			const filePath = join(tempDir, ".gitignore");
			await writeFile(filePath, ".claude\nAGENTS.md\nnode_modules\n");

			const entries = [".claude", "AGENTS.md", ".gemini"];
			const result = await checkEntriesExist(filePath, entries);

			expect(result.existing).toEqual([".claude", "AGENTS.md"]);
			expect(result.missing).toEqual([".gemini"]);
		});

		it("should return all entries as missing when file does not exist", async () => {
			const filePath = join(tempDir, "nonexistent");
			const entries = [".claude", "AGENTS.md"];

			const result = await checkEntriesExist(filePath, entries);

			expect(result.existing).toEqual([]);
			expect(result.missing).toEqual([".claude", "AGENTS.md"]);
		});

		it("should return all entries as missing when file is empty", async () => {
			const filePath = join(tempDir, ".gitignore");
			await writeFile(filePath, "");

			const entries = [".claude", "AGENTS.md"];
			const result = await checkEntriesExist(filePath, entries);

			expect(result.existing).toEqual([]);
			expect(result.missing).toEqual([".claude", "AGENTS.md"]);
		});

		it("should handle entries with trailing slashes", async () => {
			const filePath = join(tempDir, ".gitignore");
			await writeFile(filePath, ".claude/\n");

			// Entry without trailing slash should still match
			const result = await checkEntriesExist(filePath, [".claude"]);
			expect(result.existing).toEqual([".claude"]);
			expect(result.missing).toEqual([]);
		});

		it("should handle file entries with trailing slashes matching entries without", async () => {
			const filePath = join(tempDir, ".gitignore");
			await writeFile(filePath, ".claude\n");

			// Entry with trailing slash in check list
			const result = await checkEntriesExist(filePath, [".claude/"]);
			expect(result.existing).toEqual([".claude/"]);
			expect(result.missing).toEqual([]);
		});
	});

	describe("appendEntries", () => {
		it("should add only missing entries to a file", async () => {
			const filePath = join(tempDir, ".gitignore");
			await writeFile(filePath, "node_modules\n.claude\n");

			const result = await appendEntries(filePath, [
				".claude",
				".gemini",
				"AGENTS.md",
			]);

			const content = await readFile(filePath, "utf-8");
			expect(content).toContain(".gemini");
			expect(content).toContain("AGENTS.md");
			expect(result.added).toEqual([".gemini", "AGENTS.md"]);
			expect(result.skipped).toEqual([".claude"]);
		});

		it("should skip all entries if they already exist", async () => {
			const filePath = join(tempDir, ".gitignore");
			await writeFile(filePath, ".claude\n.gemini\n");

			const result = await appendEntries(filePath, [".claude", ".gemini"]);

			expect(result.added).toEqual([]);
			expect(result.skipped).toEqual([".claude", ".gemini"]);
		});

		it("should create the file if it does not exist", async () => {
			const filePath = join(tempDir, ".gitignore");

			const result = await appendEntries(filePath, [".claude", "AGENTS.md"]);

			const content = await readFile(filePath, "utf-8");
			expect(content).toContain(".claude");
			expect(content).toContain("AGENTS.md");
			expect(result.added).toEqual([".claude", "AGENTS.md"]);
			expect(result.skipped).toEqual([]);
		});

		it("should add a newline before entries if file does not end with one", async () => {
			const filePath = join(tempDir, ".gitignore");
			await writeFile(filePath, "node_modules");

			await appendEntries(filePath, [".claude"]);

			const content = await readFile(filePath, "utf-8");
			// Should have newline after original content, then header and entry
			expect(content).toContain("node_modules\n");
			expect(content).toContain("# Conductor");
			expect(content).toContain(".claude");
		});

		it("should add a conductor section header comment", async () => {
			const filePath = join(tempDir, ".gitignore");
			await writeFile(filePath, "node_modules\n");

			await appendEntries(filePath, [".claude"]);

			const content = await readFile(filePath, "utf-8");
			expect(content).toContain("# Conductor");
		});
	});

	describe("removeEntries", () => {
		it("should remove matching entries from a file", async () => {
			const filePath = join(tempDir, ".gitignore");
			await writeFile(
				filePath,
				"node_modules\n.claude\n.gemini\nAGENTS.md\ndist\n",
			);

			const result = await removeEntries(filePath, [
				".claude",
				".gemini",
				"AGENTS.md",
			]);

			const content = await readFile(filePath, "utf-8");
			expect(content).toContain("node_modules");
			expect(content).toContain("dist");
			expect(content).not.toContain(".claude");
			expect(content).not.toContain(".gemini");
			expect(content).not.toContain("AGENTS.md");
			expect(result.removed).toEqual([".claude", ".gemini", "AGENTS.md"]);
		});

		it("should return empty removed list when no entries are found", async () => {
			const filePath = join(tempDir, ".gitignore");
			await writeFile(filePath, "node_modules\ndist\n");

			const result = await removeEntries(filePath, [".claude", "AGENTS.md"]);

			expect(result.removed).toEqual([]);
		});

		it("should handle file that does not exist", async () => {
			const filePath = join(tempDir, "nonexistent");

			const result = await removeEntries(filePath, [".claude"]);

			expect(result.removed).toEqual([]);
		});

		it("should remove entries with trailing slashes", async () => {
			const filePath = join(tempDir, ".gitignore");
			await writeFile(filePath, ".claude/\nnode_modules\n");

			const result = await removeEntries(filePath, [".claude"]);

			const content = await readFile(filePath, "utf-8");
			expect(content).not.toContain(".claude");
			expect(content).toContain("node_modules");
			expect(result.removed).toEqual([".claude"]);
		});

		it("should also remove conductor section header comment", async () => {
			const filePath = join(tempDir, ".gitignore");
			await writeFile(
				filePath,
				"node_modules\n\n# Conductor\n.claude\n.gemini\n",
			);

			await removeEntries(filePath, [".claude", ".gemini"]);

			const content = await readFile(filePath, "utf-8");
			expect(content).not.toContain("# Conductor");
		});
	});

	describe("resolveGitIgnorePath", () => {
		it("should resolve .gitignore path for 'gitignore' method", () => {
			const result = resolveGitIgnorePath("/project", "gitignore");
			expect(result).toBe(join("/project", ".gitignore"));
		});

		it("should resolve .git/info/exclude path for 'exclude' method", () => {
			const result = resolveGitIgnorePath("/project", "exclude");
			expect(result).toBe(join("/project", ".git", "info", "exclude"));
		});
	});
});
