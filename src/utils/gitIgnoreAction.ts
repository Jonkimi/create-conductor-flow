import type { AgentType } from "../types.js";
import type { GitIgnoreMethod } from "./gitIgnore.js";
import {
	getGitIgnoreEntriesForAgent,
	appendEntries,
	removeEntries,
	resolveGitIgnorePath,
} from "./gitIgnore.js";

/**
 * Result of executing a git ignore action
 */
export interface ExecuteGitIgnoreResult {
	/** The action that was performed */
	action: "added" | "removed" | "skipped" | "none";
	/** Entries that were affected */
	entries: string[];
	/** Human-readable message */
	message: string;
	/** Target file(s) that were modified */
	targetFiles?: string[];
}

/**
 * Execute a git ignore action for a specific agent.
 *
 * @param projectDir - The project directory
 * @param method - The git ignore method (gitignore, exclude, none)
 * @param agentType - The agent type to get entries for
 * @returns Result of the action
 */
export async function executeGitIgnoreAction(
	projectDir: string,
	method: GitIgnoreMethod,
	agentType: AgentType,
): Promise<ExecuteGitIgnoreResult> {
	const entries = getGitIgnoreEntriesForAgent(agentType);

	if (entries.length === 0) {
		return {
			action: "none",
			entries: [],
			message: `No git ignore entries found for agent ${agentType}`,
		};
	}

	if (method === "none") {
		// Remove entries from both files
		return await executeRemoveAction(projectDir, entries);
	} else {
		// Add entries to the specified file
		return await executeAddAction(projectDir, method, entries);
	}
}

/**
 * Execute add action - append entries to the specified git ignore file
 */
async function executeAddAction(
	projectDir: string,
	method: "gitignore" | "exclude",
	entries: string[],
): Promise<ExecuteGitIgnoreResult> {
	const targetPath = resolveGitIgnorePath(projectDir, method);
	const result = await appendEntries(targetPath, entries);

	if (result.added.length === 0) {
		return {
			action: "skipped",
			entries: result.skipped,
			message: "Git ignore entries already present, skipping.",
			targetFiles: [targetPath],
		};
	}

	const fileName = method === "gitignore" ? ".gitignore" : ".git/info/exclude";
	return {
		action: "added",
		entries: result.added,
		message: `Added ${result.added.length} entries to ${fileName}: ${result.added.join(", ")}`,
		targetFiles: [targetPath],
	};
}

/**
 * Execute remove action - remove entries from both git ignore files
 */
async function executeRemoveAction(
	projectDir: string,
	entries: string[],
): Promise<ExecuteGitIgnoreResult> {
	const gitignorePath = resolveGitIgnorePath(projectDir, "gitignore");
	const excludePath = resolveGitIgnorePath(projectDir, "exclude");

	const gitignoreResult = await removeEntries(gitignorePath, entries);
	const excludeResult = await removeEntries(excludePath, entries);

	const allRemoved = [
		...new Set([...gitignoreResult.removed, ...excludeResult.removed]),
	];

	if (allRemoved.length === 0) {
		return {
			action: "none",
			entries: [],
			message: "No Conductor git ignore entries found.",
		};
	}

	const targetFiles: string[] = [];
	const parts: string[] = [];

	if (gitignoreResult.removed.length > 0) {
		targetFiles.push(gitignorePath);
		parts.push(`.gitignore (${gitignoreResult.removed.length})`);
	}
	if (excludeResult.removed.length > 0) {
		targetFiles.push(excludePath);
		parts.push(`.git/info/exclude (${excludeResult.removed.length})`);
	}

	return {
		action: "removed",
		entries: allRemoved,
		message: `Removed entries from: ${parts.join(", ")}`,
		targetFiles,
	};
}
