import { join } from "path";
import { readFile, writeFile, access, mkdir } from "fs/promises";
import { constants } from "fs";
import { ALL_AGENT_CONFIGS } from "../generators/registry.js";
import type { AgentType } from "../types.js";

/**
 * Type for git ignore method
 */
export type GitIgnoreMethod = "gitignore" | "exclude" | "none";

/**
 * Result of checking which entries exist in a file
 */
export interface CheckEntriesResult {
	existing: string[];
	missing: string[];
}

/**
 * Result of appending entries to a file
 */
export interface AppendEntriesResult {
	added: string[];
	skipped: string[];
}

/**
 * Result of removing entries from a file
 */
export interface RemoveEntriesResult {
	removed: string[];
}

/**
 * Header comment for Conductor section in git ignore files
 */
const CONDUCTOR_HEADER = "# Conductor";

/**
 * Get git ignore entries for a specific agent type.
 * Returns the agent's directory and protocol filename.
 */
export function getGitIgnoreEntriesForAgent(agentType: AgentType): string[] {
	const config = ALL_AGENT_CONFIGS.find((c) => c.agentType === agentType);
	if (!config) {
		return [];
	}

	const entries: string[] = [];

	// Add agent directory
	if (config.agentDir) {
		entries.push(config.agentDir);
	}

	// Add protocol filename
	if (config.protocolFilename) {
		entries.push(config.protocolFilename);
	}

	return entries;
}

/**
 * Normalize an entry for comparison (remove trailing slashes)
 */
function normalizeEntry(entry: string): string {
	return entry.replace(/\/+$/, "");
}

/**
 * Check if a file exists
 */
async function fileExists(filePath: string): Promise<boolean> {
	try {
		await access(filePath, constants.F_OK);
		return true;
	} catch {
		return false;
	}
}

/**
 * Check which entries already exist in a git ignore file.
 * Handles entries with or without trailing slashes.
 */
export async function checkEntriesExist(
	filePath: string,
	entries: string[],
): Promise<CheckEntriesResult> {
	const existing: string[] = [];
	const missing: string[] = [];

	if (!(await fileExists(filePath))) {
		return { existing: [], missing: [...entries] };
	}

	const content = await readFile(filePath, "utf-8");
	const lines = content.split("\n").map((line) => normalizeEntry(line.trim()));

	for (const entry of entries) {
		const normalizedEntry = normalizeEntry(entry);
		if (lines.includes(normalizedEntry)) {
			existing.push(entry);
		} else {
			missing.push(entry);
		}
	}

	return { existing, missing };
}

/**
 * Append entries to a git ignore file.
 * Only adds entries that don't already exist.
 * Creates the file if it doesn't exist.
 */
export async function appendEntries(
	filePath: string,
	entries: string[],
): Promise<AppendEntriesResult> {
	const { existing, missing } = await checkEntriesExist(filePath, entries);

	if (missing.length === 0) {
		return { added: [], skipped: existing };
	}

	let content = "";
	if (await fileExists(filePath)) {
		content = await readFile(filePath, "utf-8");
	}

	// Ensure content ends with newline
	if (content.length > 0 && !content.endsWith("\n")) {
		content += "\n";
	}

	// Add conductor section header and entries
	content += `\n${CONDUCTOR_HEADER}\n`;
	for (const entry of missing) {
		content += `${entry}\n`;
	}

	// Ensure parent directory exists
	const parentDir = join(filePath, "..");
	await mkdir(parentDir, { recursive: true });

	await writeFile(filePath, content, "utf-8");

	return { added: missing, skipped: existing };
}

/**
 * Remove conductor-related entries from a git ignore file.
 * Also removes the Conductor section header comment.
 */
export async function removeEntries(
	filePath: string,
	entries: string[],
): Promise<RemoveEntriesResult> {
	if (!(await fileExists(filePath))) {
		return { removed: [] };
	}

	const content = await readFile(filePath, "utf-8");
	const lines = content.split("\n");
	const normalizedEntries = entries.map(normalizeEntry);
	const removed: string[] = [];

	const newLines: string[] = [];
	for (const line of lines) {
		const normalizedLine = normalizeEntry(line.trim());

		// Skip conductor header comment
		if (normalizedLine === CONDUCTOR_HEADER) {
			continue;
		}

		// Check if this line matches any entry to remove
		if (normalizedEntries.includes(normalizedLine)) {
			// Find the original entry (with or without trailing slash)
			const originalEntry = entries.find(
				(e) => normalizeEntry(e) === normalizedLine,
			);
			if (originalEntry && !removed.includes(originalEntry)) {
				removed.push(originalEntry);
			}
			continue;
		}

		newLines.push(line);
	}

	// Clean up consecutive empty lines
	const cleanedLines: string[] = [];
	let prevEmpty = false;
	for (const line of newLines) {
		const isEmpty = line.trim() === "";
		if (isEmpty && prevEmpty) {
			continue;
		}
		cleanedLines.push(line);
		prevEmpty = isEmpty;
	}

	// Remove trailing empty lines
	while (cleanedLines.length > 0 && cleanedLines[cleanedLines.length - 1].trim() === "") {
		cleanedLines.pop();
	}

	// Add final newline if there's content
	const newContent = cleanedLines.length > 0 ? cleanedLines.join("\n") + "\n" : "";

	await writeFile(filePath, newContent, "utf-8");

	return { removed };
}

/**
 * Resolve the path to a git ignore file based on the method.
 */
export function resolveGitIgnorePath(
	projectDir: string,
	method: "gitignore" | "exclude",
): string {
	if (method === "gitignore") {
		return join(projectDir, ".gitignore");
	} else {
		return join(projectDir, ".git", "info", "exclude");
	}
}
