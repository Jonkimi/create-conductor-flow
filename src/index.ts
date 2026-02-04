#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { installHandler } from "./commands/install.js";
import { printInstallBanner } from "./utils/banner.js";
import { DEFAULT_REPO, DEFAULT_BRANCH } from "./utils/template.js";

import { ALL_AGENT_CONFIGS } from "./generators/registry.js";
import type { GitIgnoreMethod } from "./utils/gitIgnore.js";

async function main() {
	// Print the welcome banner unless suppressed
	if (!process.env.CONDUCTOR_NO_BANNER) {
		printInstallBanner();
	}

	// Parse CLI arguments and execute install
	const argv = await yargs(hideBin(process.argv))
		.scriptName("conductor-install")
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
				"Git repository URL for conductor. If used without value, defaults to official repository.",
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
			describe: "Branch name for conductor repository",
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
		.help()
		.alias("h", "help")
		.version()
		.alias("v", "version")
		.parseAsync();

	// Get the path from positional argument (first non-option argument)
	const pathArg = argv._[0] as string | undefined;

	// Execute the install handler with parsed arguments
	await installHandler({
		...argv,
		path: pathArg || argv.path || ".",
		gitIgnore: argv["git-ignore"] as GitIgnoreMethod | undefined,
		$0: "conductor-install",
		_: argv._,
	});
}

main().catch((err) => {
	console.error("Error:", err instanceof Error ? err.message : err);
	process.exit(1);
});
