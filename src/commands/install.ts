import type { ArgumentsCamelCase } from "yargs";
import {
	promptForAgent,
	promptForInstallScope,
	promptForGitIgnore,
} from "../cli/prompt.js";
import { getGenerator } from "../generators/index.js";
import { resolve } from "path";
import select from "@inquirer/select";

import type { AgentType, InstallScope } from "../types.js";
import type { GitIgnoreMethod } from "../utils/gitIgnore.js";
import { executeGitIgnoreAction } from "../utils/gitIgnoreAction.js";
import {
	promptTemplateSource,
	resolveTemplateSource,
	TemplateSource,
	LOG_MESSAGES,
} from "../utils/templatePrompt.js";
import { isGitAvailable } from "../utils/gitDetect.js";
import { saveConfig, type Config } from "../utils/config.js";

export async function installHandler(
	argv: ArgumentsCamelCase<{
		path: string;
		agent?: string;
		repo?: string;
		branch?: string;
		scope?: string;
		gitIgnore?: GitIgnoreMethod;
		force?: boolean;
		reset?: boolean;
		config?: Config;
	}>,
): Promise<void> {
	// Resolve target directory to absolute path
	const targetDir = resolve(process.cwd(), argv.path);
	const force = argv.force ?? false;
	const config = argv.config ?? {};

	try {
		console.log(`Initializing Conductor in: ${targetDir}`);

		// 1. Select Agent (CLI flag > config > prompt)
		let agent: AgentType;
		if (argv.agent) {
			agent = argv.agent as AgentType;
			console.log(`Using provided agent: ${agent}`);
		} else if (config.agent) {
			agent = config.agent as AgentType;
			console.log(`[Config] Using saved agent: ${agent}`);
		} else {
			console.log("Step 1: Prompting for agent selection...");
			agent = await promptForAgent();
			console.log(`✔ Selected agent: ${agent}`);
		}

		// 2. Select Installation Scope (CLI flag > prompt - scope is not persisted)
		let scope: InstallScope;
		if (argv.scope) {
			scope = argv.scope as InstallScope;
			console.log(`Using provided scope: ${scope}`);
		} else {
			scope = await promptForInstallScope(agent);
		}
		console.log(`✔ Selected scope: ${scope}`);

		// 2.5. Determine git ignore method (CLI flag > config > prompt)
		let effectiveGitIgnore: GitIgnoreMethod | undefined = argv.gitIgnore;
		if (argv.gitIgnore && scope === "global") {
			console.warn(
				"⚠ --git-ignore flag is only supported for project scope. Skipping git ignore configuration.",
			);
			effectiveGitIgnore = undefined;
		} else if (!argv.gitIgnore && scope === "project") {
			// Check config for saved preference
			if (config.gitIgnore) {
				effectiveGitIgnore = config.gitIgnore;
				console.log(`[Config] Using saved git-ignore: ${effectiveGitIgnore}`);
			} else {
				// Interactive prompt: ask user about git ignore when no flag and scope is project
				effectiveGitIgnore = await promptForGitIgnore();
			}
		}

		// 2.6. Determine template source (CLI flag > config > prompt)
		let effectiveRepo: string | undefined = argv.repo;
		let effectiveBranch: string | undefined = argv.branch;

		if (!argv.repo) {
			// Check config for saved repo preference
			if (config.repo) {
				effectiveRepo = config.repo;
				effectiveBranch = config.branch ?? effectiveBranch;
				console.log(
					`[Config] Using saved template source: ${effectiveRepo} [${effectiveBranch}]`,
				);
			} else {
				// No --repo flag provided and no config, prompt for template source
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
			}
		} else {
			// --repo was provided via CLI
			console.log(`Using provided repository: ${argv.repo}`);
			if (argv.branch) {
				console.log(`Using provided branch: ${argv.branch}`);
			}
		}

		// Fallback: if a remote repo is set but git is not available, use bundled
		if (effectiveRepo && !isGitAvailable()) {
			console.warn(LOG_MESSAGES.GIT_NOT_FOUND_FALLBACK);
			effectiveRepo = undefined;
			effectiveBranch = undefined;
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

		// 6. Save configuration for future runs
		console.log("\nSaving preferences...");
		await saveConfig({
			agent,
			repo: effectiveRepo,
			branch: effectiveBranch,
			gitIgnore: effectiveGitIgnore,
		});
		console.log("✔ Preferences saved");

		console.log("\n✔ Conductor initialized successfully!");
	} catch (err) {
		console.error(
			"\n✘ Installation failed:",
			err instanceof Error ? err.message : err,
		);
		process.exit(1);
	}
}
