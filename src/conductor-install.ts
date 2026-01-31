#!/usr/bin/env node
/**
 * conductor-install - Direct install command for Conductor
 *
 * This entry point allows users to run `npx conductor-install` directly
 * without needing to specify the `install` subcommand.
 *
 * It accepts all the same arguments as `conductor install`.
 */
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { installHandler } from "./commands/install.js";
import { printInstallBanner } from "./utils/banner.js";
import { DEFAULT_REPO, DEFAULT_BRANCH } from "./utils/template.js";

async function main() {
	// Print the welcome banner
	printInstallBanner();

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
			choices: [
				"opencode",
				"claude-code",
				"antigravity",
				"cursor",
				"vscode-copilot",
				"codex",
				"windsurf",
				"cline",
				"gemini",
			],
		})
		.option("repo", {
			alias: "r",
			describe: "Git repository URL for conductor",
			type: "string",
			default: DEFAULT_REPO,
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
		$0: "conductor-install",
		_: argv._,
	});
}

main().catch((err) => {
	console.error("Error:", err instanceof Error ? err.message : err);
	process.exit(1);
});
