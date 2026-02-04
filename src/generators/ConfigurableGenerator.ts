import { join } from "path";
import select from "@inquirer/select";
import fs from "fs-extra";
import { parse } from "smol-toml";
import type { AgentGenerator, AgentConfig } from "./types.js";
import type { InstallScope } from "../types.js";
import { getTemplateRoot, loadTemplate } from "../utils/template.js";
import {
	defaultContentStrategy,
	defaultFileStrategy,
} from "./default/index.js";

const { existsSync, ensureDir, writeFile, copy } = fs;

/**
 * A generator that uses configuration to produce agent-specific output.
 * This class implements AgentGenerator interface using a config-driven approach.
 */
export class ConfigurableGenerator implements AgentGenerator {
	constructor(private readonly config: AgentConfig) {}

	async validate(targetDir: string, scope?: InstallScope): Promise<string> {
		if (!existsSync(targetDir)) {
			throw new Error(`Target directory does not exist: ${targetDir}`);
		}

		const { agentDir, commandsDir, displayName, extension, usesPrefix } =
			this.config;
		const ext = extension || ".md";
		const prefix = usesPrefix !== false ? "conductor:" : "";
		const setupFileName = `${prefix}setup${ext}`;
		const setupFile = join(targetDir, agentDir, commandsDir, setupFileName);
		const conductorPath = join(targetDir, agentDir, "conductor");

		if (existsSync(conductorPath) && existsSync(setupFile)) {
			throw new Error(
				`Conductor (${displayName}) is already installed in: ${targetDir}`,
			);
		}

		return targetDir;
	}

	async generate(
		targetDir: string,
		scope?: InstallScope,
		repo?: string,
		branch?: string,
		force?: boolean,
	): Promise<void> {
		const { agentDir, commandsDir, agentType } = this.config;
		const agentPath = join(targetDir, agentDir);
		const targetCommandsDir = join(agentPath, commandsDir);

		// Determine installation path string used in templates
		// For project-level: relative path (e.g., ".codex/conductor")
		// For global-level: absolute/home path (e.g., "~/.codex/conductor")
		let installPath = join(agentDir, "conductor");
		if (scope === "global") {
			// Assuming agentDir doesn't start with / or ~
			installPath = `~/${agentDir}/conductor`;
		}

		await ensureDir(targetCommandsDir);
		await ensureDir(join(agentPath, "conductor"));

		const templateRoot = await getTemplateRoot(repo, branch);
		try {
			const templateSource = join(templateRoot, "templates");
			const templateDest = join(agentPath, "conductor", "templates");
			await copy(templateSource, templateDest);
		} catch (e) {
			console.warn("Failed to copy templates directory:", e);
		}

		const { protocolFilename } = this.config;
		if (protocolFilename) {
			try {
				const protocolSource = join(templateRoot, "GEMINI.md");
				const protocolDest = join(targetDir, protocolFilename);

				if (existsSync(protocolSource)) {
					let shouldCopy = true;
					if (existsSync(protocolDest) && !force) {
						shouldCopy = await select({
							message: `The protocol file '${protocolFilename}' already exists. Do you want to overwrite it?`,
							choices: [
								{ value: true, name: "Overwrite" },
								{ value: false, name: "Skip" },
							],
						});
					}

					if (shouldCopy) {
						await copy(protocolSource, protocolDest);
					}
				}
			} catch (e) {
				console.warn("Failed to handle protocol file:", e);
			}
		}

		// Dynamically discover commands from template root
		let commands: string[] = [];
		try {
			const commandsPath = join(templateRoot, "commands/conductor");
			if (existsSync(commandsPath)) {
				const files = await fs.readdir(commandsPath);
				if (Array.isArray(files)) {
					commands = files
						.filter((file) => file.endsWith(".toml"))
						.map((file) => file.replace(/\.toml$/, ""));
				}
			}
		} catch (e) {
			console.warn("Failed to discover commands:", e);
		}

		// Fallback to default commands if discovery failed or found nothing (e.g. empty dir)
		if (commands.length === 0) {
			console.log("No commands discovered, using default commands");
			commands = [
				"setup",
				"newTrack",
				"implement",
				"status",
				"revert",
				"review",
			];
		} else {
			console.log(`Discovered commands: ${commands.join(", ")}`);
		}

		const extension = this.config.extension || ".md";
		const fixedAgent = this.config.fixedAgent;

		for (const cmd of commands) {
			try {
				const tomlContent = await loadTemplate(
					`commands/conductor/${cmd}.toml`,
					templateRoot,
				);

				const contentStrategy =
					this.config.strategy?.content || defaultContentStrategy;
				const finalContent = contentStrategy.process(tomlContent, {
					installPath,
					agentType,
					fixedAgent,
					commandName: cmd,
				});

				if (finalContent) {
					const fileStrategy =
						this.config.strategy?.file || defaultFileStrategy;
					await fileStrategy.write({
						targetDir,
						agentDir,
						commandsDir,
						commandName: cmd,
						extension,
						content: finalContent,
					});
				}
			} catch (e) {
				console.warn(`Failed to process ${cmd}:`, e);
			}
		}
	}
}
