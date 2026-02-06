/**
 * Template source prompt module for interactive CLI template selection.
 *
 * Provides interactive prompts for selecting template sources:
 * - Bundled Templates (Offline)
 * - Official Repository (Latest)
 * - Custom Repository
 */

import select from "@inquirer/select";
import input from "@inquirer/input";
import {
	getBundledTemplateRoot,
	DEFAULT_REPO,
	DEFAULT_BRANCH,
} from "./template.js";

/**
 * Template source types available for selection.
 */
export enum TemplateSource {
	/** Use bundled offline templates */
	BUNDLED = "bundled",
	/** Use official remote repository */
	OFFICIAL = "official",
	/** Use custom user-specified repository */
	CUSTOM = "custom",
}

/**
 * Result of template source selection.
 * Contains the selected source type and optional repository details.
 */
export interface TemplateSourceResult {
	/** The selected template source type */
	source: TemplateSource;
	/** Repository URL (for OFFICIAL or CUSTOM sources) */
	repo?: string;
	/** Branch name (for OFFICIAL or CUSTOM sources) */
	branch?: string;
}

/**
 * Display text constants for prompt options.
 */
export const PROMPT_TEXTS = {
	/** Message shown for the main selection prompt */
	SELECT_SOURCE_MESSAGE: "Select template source:",
	/** Option label for bundled templates */
	BUNDLED_LABEL: "Bundled Templates (Offline)",
	/** Description for bundled templates option */
	BUNDLED_DESCRIPTION: "Use built-in templates, no network required",
	/** Option label for official repository */
	OFFICIAL_LABEL: "Official Repository (Latest)",
	/** Description for official repository option */
	OFFICIAL_DESCRIPTION: "Fetch latest from official repository",
	/** Option label for custom repository */
	CUSTOM_LABEL: "Custom Repository",
	/** Description for custom repository option */
	CUSTOM_DESCRIPTION: "Specify your own repository and branch",
	/** Prompt message for custom repository URL input */
	CUSTOM_REPO_PROMPT: "Enter repository URL:",
	/** Prompt message for custom branch name input */
	CUSTOM_BRANCH_PROMPT: "Enter branch name:",
} as const;

/**
 * Log messages for various operations.
 */
export const LOG_MESSAGES = {
	/** Message when using bundled templates */
	USING_BUNDLED: "Using bundled Conductor templates",
	/** Message template when downloading from repository (use with template literal) */
	DOWNLOADING_FROM: (url: string, branch: string) =>
		`Downloading templates from ${url} [${branch}]...`,
	/** Message when in non-interactive mode */
	NON_INTERACTIVE_BUNDLED:
		"Non-interactive mode detected. Using bundled templates.",
} as const;

/**
 * Checks if the current environment supports interactive prompts.
 *
 * Returns false (non-interactive) if:
 * - Environment variable CI=true
 * - stdin is not a TTY
 *
 * @returns true if interactive prompts are supported, false otherwise
 */
export function isInteractiveMode(): boolean {
	// Check for CI environment
	if (process.env.CI === "true") {
		return false;
	}

	// Check if stdin is a TTY
	if (!process.stdin.isTTY) {
		return false;
	}

	return true;
}

/**
 * Validates a repository URL format.
 *
 * Accepts:
 * - HTTPS URLs (https://...)
 * - SSH URLs (git@...)
 * - Local file paths
 *
 * @param url - The URL to validate
 * @returns true if the URL is valid, error message otherwise
 */
export function validateRepoUrl(url: string): boolean | string {
	if (!url || url.trim().length === 0) {
		return "Repository URL is required";
	}

	const trimmedUrl = url.trim();

	// Check for HTTPS URL
	if (trimmedUrl.startsWith("https://")) {
		return true;
	}

	// Check for SSH URL
	if (trimmedUrl.startsWith("git@")) {
		return true;
	}

	// Check for local path (starts with / or ./ or ../)
	if (
		trimmedUrl.startsWith("/") ||
		trimmedUrl.startsWith("./") ||
		trimmedUrl.startsWith("../")
	) {
		return true;
	}

	return "Invalid repository URL. Please provide an HTTPS URL, SSH URL, or local path.";
}

/**
 * Prompts the user to select a template source interactively.
 *
 * In non-interactive mode (CI=true or non-TTY), automatically returns
 * bundled templates without prompting.
 *
 * @returns Promise resolving to the selected template source configuration
 */
export async function promptTemplateSource(): Promise<TemplateSourceResult> {
	// Check for non-interactive mode
	if (!isInteractiveMode()) {
		console.log(LOG_MESSAGES.NON_INTERACTIVE_BUNDLED);
		return {
			source: TemplateSource.BUNDLED,
		};
	}

	// Show interactive selection prompt
	const sourceChoice = await select<TemplateSource>({
		message: PROMPT_TEXTS.SELECT_SOURCE_MESSAGE,
		choices: [
			{
				name: PROMPT_TEXTS.BUNDLED_LABEL,
				value: TemplateSource.BUNDLED,
				description: PROMPT_TEXTS.BUNDLED_DESCRIPTION,
			},
			{
				name: PROMPT_TEXTS.OFFICIAL_LABEL,
				value: TemplateSource.OFFICIAL,
				description: PROMPT_TEXTS.OFFICIAL_DESCRIPTION,
			},
			{
				name: PROMPT_TEXTS.CUSTOM_LABEL,
				value: TemplateSource.CUSTOM,
				description: PROMPT_TEXTS.CUSTOM_DESCRIPTION,
			},
		],
		default: TemplateSource.BUNDLED,
	});

	switch (sourceChoice) {
		case TemplateSource.BUNDLED:
			return {
				source: TemplateSource.BUNDLED,
			};

		case TemplateSource.OFFICIAL:
			return {
				source: TemplateSource.OFFICIAL,
				repo: DEFAULT_REPO,
				branch: DEFAULT_BRANCH,
			};

		case TemplateSource.CUSTOM: {
			// Prompt for custom repository URL
			const customRepo = await input({
				message: PROMPT_TEXTS.CUSTOM_REPO_PROMPT,
				validate: validateRepoUrl,
			});

			// Prompt for branch name with default
			const customBranch = await input({
				message: PROMPT_TEXTS.CUSTOM_BRANCH_PROMPT,
				default: DEFAULT_BRANCH,
			});

			return {
				source: TemplateSource.CUSTOM,
				repo: customRepo.trim(),
				branch: customBranch.trim() || DEFAULT_BRANCH,
			};
		}

		default:
			// Fallback to bundled (should never reach here)
			return {
				source: TemplateSource.BUNDLED,
			};
	}
}

/**
 * Resolves the template source result to repo/branch parameters for getTemplateRoot.
 *
 * @param result - The template source selection result
 * @returns Object with repo and branch (both undefined for bundled source)
 */
export function resolveTemplateSource(result: TemplateSourceResult): {
	repo?: string;
	branch?: string;
} {
	switch (result.source) {
		case TemplateSource.BUNDLED:
			return { repo: undefined, branch: undefined };

		case TemplateSource.OFFICIAL:
		case TemplateSource.CUSTOM:
			return { repo: result.repo, branch: result.branch };

		default:
			return { repo: undefined, branch: undefined };
	}
}
