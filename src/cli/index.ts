import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { installHandler } from "../commands/install.js";

import { ALL_AGENT_CONFIGS } from "../generators/registry.js";

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
					choices: ALL_AGENT_CONFIGS.map((c) => c.agentType),
				});
		},
		installHandler,
	)
	.help();
