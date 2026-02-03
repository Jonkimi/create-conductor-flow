import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { installHandler } from "../commands/install.js";

export const cli = yargs(hideBin(process.argv))
	.scriptName("conductor")
	.usage("$0 <cmd> [args]")
	.command(
		"install [path]",
		"Install Conductor in the specified directory",
		(yargs) => {
			return yargs
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
						"kilo-code",
						"gemini",
					],
				})
				.option("repo", {
					alias: "r",
					describe: "Git repository URL for templates",
					type: "string",
				})
				.option("branch", {
					alias: "b",
					describe: "Branch name for templates",
					type: "string",
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
				});
		},
		installHandler,
	)
	.help();
