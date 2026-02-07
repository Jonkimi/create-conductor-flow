import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { installHandler } from "../commands/install.js";
import { printBanner, printVersion } from "../utils/banner.js";
import { DEFAULT_REPO, DEFAULT_BRANCH } from "../utils/template.js";
import { loadConfig, clearConfig, type Config } from "../utils/config.js";
import { migrateCache } from "../utils/migrate.js";

import { ALL_AGENT_CONFIGS } from "../generators/registry.js";
import type { GitIgnoreMethod } from "../utils/gitIgnore.js";

async function parseArgs(scriptName: string) {
	// Parse CLI arguments and execute install
	// Parse CLI arguments and execute install
	const parser = yargs(hideBin(process.argv));

	if (process.env.COLUMNS) {
		parser.wrap(parseInt(process.env.COLUMNS));
	}

	return await parser
		.scriptName(scriptName)
		.usage("$0 [path] [options]")
		.positional("path", {
			describe: "Directory to install Conductor",
			default: ".",
			type: "string",
		})
		.option("agent", {
			alias: "a",
			describe: "Specify the coding agent",
			type: "string",
			choices: ALL_AGENT_CONFIGS.map((c) => c.agentType),
		})
		.option("repo", {
			alias: "r",
			describe:
				"Git repository URL for templates. Without this flag, interactive template source selection is shown.",
			type: "string",
		})
		.coerce("repo", (arg) => {
			if (arg === "") {
				return DEFAULT_REPO;
			}
			return arg;
		})
		.option("branch", {
			alias: "b",
			describe: "Branch name for template repository",
			type: "string",
			default: DEFAULT_BRANCH,
		})
		.option("scope", {
			alias: "s",
			describe: "Installation scope (project or global)",
			type: "string",
			choices: ["project", "global"],
		})
		.option("git-ignore", {
			alias: "g",
			describe:
				"Configure git ignore for Conductor files (gitignore: add to .gitignore, exclude: add to .git/info/exclude, none: remove entries)",
			type: "string",
			choices: ["gitignore", "exclude", "none"] as const,
		})
		.coerce("git-ignore", (arg: string | undefined) => {
			// If flag is provided without a value, default to 'exclude'
			if (arg === "") {
				return "exclude";
			}
			return arg as GitIgnoreMethod | undefined;
		})
		.option("force", {
			alias: "f",
			describe: "Force overwrite existing installation",
			type: "boolean",
			default: false,
		})
		.option("reset", {
			describe: "Clear saved preferences and show all prompts",
			type: "boolean",
			default: false,
		})
		.example("$0", "Install with interactive prompts")
		.example("$0 --agent claude-code", "Install for Claude Code agent")
		.example(
			"$0 --repo https://github.com/user/templates",
			"Use custom template repository",
		)
		.example("$0 --git-ignore gitignore", "Add Conductor files to .gitignore")
		.example(
			"$0 --git-ignore exclude",
			"Add Conductor files to .git/info/exclude",
		)
		.example("$0 --git-ignore none", "Remove Conductor entries from git ignore")
		.example("$0 --reset", "Clear saved preferences and show all prompts")
		.help()
		.alias("h", "help")
		.version()
		.alias("v", "version")
		.completion("completion", false)
		.parseAsync();
}

export async function main(scriptName: string) {
	// Print the welcome banner unless suppressed or running completion command
	if (
		!process.env.CONDUCTOR_NO_BANNER &&
		!process.argv.includes("completion") &&
		!process.argv.includes("--get-yargs-completions")
	) {
		printBanner();
		printVersion();
	}

	const argv = await parseArgs(scriptName);
	// Get the path from positional argument (first non-option argument)
	const pathArg = argv._[0] as string | undefined;

	// Stop execution if we are just generating completion script or getting completions
	if (
		process.argv.includes("completion") ||
		process.argv.includes("--get-yargs-completions")
	) {
		return;
	}

	// Handle --reset flag: clear config before proceeding
	let config: Config = {};
	if (argv.reset) {
		console.log("[Config] Clearing saved preferences...");
		await clearConfig();
	} else {
		// Load saved configuration
		config = await loadConfig();
		if (Object.keys(config).length > 0) {
			console.log("[Config] Loaded saved preferences");
		}
	}

	// Run cache migration (non-blocking, only on first run to new location)
	await migrateCache();

	// Execute the install handler with parsed arguments and config
	await installHandler({
		...argv,
		path: pathArg || argv.path || ".",
		gitIgnore: argv["git-ignore"] as GitIgnoreMethod | undefined,
		$0: "conductor-init",
		_: argv._,
		// Pass config for use in install handler
		config,
	});
}
