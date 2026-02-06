import { ArgumentsCamelCase } from "yargs";
import {
	promptForAgent,
	promptForInstallScope,
	promptForGitIgnore,
} from "../cli/prompt.js";
import { getGenerator } from "../generators/index.js";
import { resolve } from "path";
import select from "@inquirer/select";

import { AgentType, InstallScope } from "../types.js";
import type { GitIgnoreMethod } from "../utils/gitIgnore.js";
import { executeGitIgnoreAction } from "../utils/gitIgnoreAction.js";
import {
	promptTemplateSource,
	resolveTemplateSource,
	TemplateSource,
	LOG_MESSAGES,
} from "../utils/templatePrompt.js";

export async function installHandler(
	argv: ArgumentsCamelCase<{
		path: string;
		agent?: string;
		repo?: string;
		branch?: string;
		scope?: string;
		gitIgnore?: GitIgnoreMethod;
		force?: boolean;
	}>,
): Promise<void> {
	// Resolve target directory to absolute path
	const targetDir = resolve(process.cwd(), argv.path);
	const force = argv.force ?? false;

	try {
		console.log(`Initializing Conductor in: ${targetDir}`);

		// 1. Select Agent
		let agent: AgentType;
		if (argv.agent) {
			agent = argv.agent as AgentType;
			console.log(`Using provided agent: ${agent}`);
		} else {
			console.log("Step 1: Prompting for agent selection...");
			agent = await promptForAgent();
			console.log(`✔ Selected agent: ${agent}`);
		}

		// 2. Select Installation Scope
		let scope: InstallScope;
		if (argv.scope) {
			scope = argv.scope as InstallScope;
			console.log(`Using provided scope: ${scope}`);
		} else {
			scope = await promptForInstallScope(agent);
		}
		console.log(`✔ Selected scope: ${scope}`);

		// 2.5. Determine git ignore method
		let effectiveGitIgnore: GitIgnoreMethod | undefined = argv.gitIgnore;
		if (argv.gitIgnore && scope === "global") {
			console.warn(
				"⚠ --git-ignore flag is only supported for project scope. Skipping git ignore configuration.",
			);
			effectiveGitIgnore = undefined;
		} else if (!argv.gitIgnore && scope === "project") {
			// Interactive prompt: ask user about git ignore when no flag and scope is project
			effectiveGitIgnore = await promptForGitIgnore();
		}

		// 2.6. Determine template source (repo and branch)
		let effectiveRepo: string | undefined = argv.repo;
		let effectiveBranch: string | undefined = argv.branch;

		if (!argv.repo) {
			// No --repo flag provided, prompt for template source
			const templateSourceResult = await promptTemplateSource();
			const resolved = resolveTemplateSource(templateSourceResult);
			effectiveRepo = resolved.repo;
			effectiveBranch = resolved.branch;

			// Log the selection result
			if (templateSourceResult.source === TemplateSource.BUNDLED) {
				console.log(`✔ ${LOG_MESSAGES.USING_BUNDLED}`);
			} else if (effectiveRepo) {
				console.log(
					`✔ ${LOG_MESSAGES.DOWNLOADING_FROM(effectiveRepo, effectiveBranch || "main")}`,
				);
			}
		} else {
			// --repo was provided via CLI
			console.log(`Using provided repository: ${argv.repo}`);
			if (argv.branch) {
				console.log(`Using provided branch: ${argv.branch}`);
			}
		}

		const generator = getGenerator(agent);

		// 3. Validate (with force option handling)
		console.log("\nStep 3: Validating project directory...");
		let validatedPath: string;
		try {
			validatedPath = await generator.validate(targetDir, scope);
		} catch (err) {
			if (err instanceof Error && err.message.includes("already installed")) {
				if (force) {
					console.log("⚠ Force mode: Overwriting existing installation");
					validatedPath = targetDir;
				} else {
					// Interactive prompt
					const shouldOverwrite = await select({
						message: `${err.message}\nDo you want to overwrite the existing installation?`,
						choices: [
							{ value: true, name: "Yes, overwrite" },
							{ value: false, name: "No, cancel" },
						],
					});
					if (shouldOverwrite) {
						console.log("Overwriting existing installation...");
						validatedPath = targetDir;
					} else {
						console.log("Installation cancelled.");
						return;
					}
				}
			} else {
				throw err;
			}
		}
		console.log(`✔ Validation complete: ${validatedPath}`);

		// 4. Generate
		console.log("\nStep 4: Generating files...");
		await generator.generate(
			validatedPath,
			scope,
			effectiveRepo,
			effectiveBranch,
			force,
		);
		console.log("✔ Files generated");

		// 5. Configure git ignore (if requested)
		if (effectiveGitIgnore) {
			console.log("\nStep 5: Configuring git ignore...");
			const gitIgnoreResult = await executeGitIgnoreAction(
				validatedPath,
				effectiveGitIgnore,
				agent,
			);
			console.log(`✔ ${gitIgnoreResult.message}`);
		}

		console.log("\n✔ Conductor initialized successfully!");
	} catch (err) {
		console.error(
			"\n✘ Installation failed:",
			err instanceof Error ? err.message : err,
		);
		process.exit(1);
	}
}
