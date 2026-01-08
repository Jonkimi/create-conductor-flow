#!/usr/bin/env node

// src/cli/index.ts
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// src/cli/prompt.ts
import select from "@inquirer/select";
async function promptForAgent() {
  const answer = await select({
    message: "Select your coding agent:",
    choices: [
      {
        name: "OpenCode",
        value: "opencode",
        description: "The open source AI coding agent"
      },
      {
        name: "Claude Code",
        value: "claude-code",
        description: "Anthropic's coding assistant"
      },
      {
        name: "Antigravity",
        value: "antigravity",
        description: "Google's agentic coding assistant"
      }
    ],
    default: "opencode"
  });
  return answer;
}

// src/utils/install.ts
import fs from "fs-extra";
import { join as join2 } from "path";
import { parse } from "smol-toml";

// src/utils/template.ts
import { readFile, stat } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";
var __dirname2 = fileURLToPath(new URL(".", import.meta.url));
function substituteVariables(template, variables) {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(variables, key)) {
      return variables[key];
    }
    return match;
  });
}
async function getTemplateRoot() {
  const candidates = [
    join(__dirname2, "templates"),
    join(__dirname2, "../templates"),
    join(__dirname2, "../../gemini-conductor-codebase")
  ];
  for (const path of candidates) {
    try {
      if ((await stat(path)).isDirectory()) {
        return path;
      }
    } catch {
      continue;
    }
  }
  throw new Error(`Template directory not found. Searched in: ${candidates.join(", ")}`);
}
async function loadTemplate(templatePath) {
  const rootDir = await getTemplateRoot();
  const fullPath = join(rootDir, templatePath);
  return readFile(fullPath, "utf-8");
}

// src/utils/install.ts
var { existsSync, ensureDir, writeFile, copy } = fs;
async function validateProjectDirectory(targetDir, agentType) {
  if (!existsSync(targetDir)) {
    throw new Error(`Target directory does not exist: ${targetDir}`);
  }
  let agentDir;
  let setupFile;
  if (agentType === "claude-code") {
    agentDir = ".claude";
    setupFile = join2(targetDir, agentDir, "commands", "conductor:setup.md");
  } else if (agentType === "antigravity") {
    agentDir = ".agent";
    setupFile = join2(targetDir, agentDir, "workflows", "conductor:setup.md");
  } else {
    agentDir = ".opencode";
    setupFile = join2(targetDir, agentDir, "commands", "conductor:setup.md");
  }
  const agentPath = join2(targetDir, agentDir);
  const conductorPath = join2(agentPath, "conductor");
  if (existsSync(conductorPath) && existsSync(setupFile)) {
    throw new Error(`Conductor (${agentType}) is already installed in: ${targetDir}`);
  }
  return targetDir;
}
async function createConductorDirectories(targetDir, agentType) {
  let agentDir;
  let commandsDir;
  if (agentType === "claude-code") {
    agentDir = ".claude";
    commandsDir = "commands";
  } else if (agentType === "antigravity") {
    agentDir = ".agent";
    commandsDir = "workflows";
  } else {
    agentDir = ".opencode";
    commandsDir = "commands";
  }
  const agentPath = join2(targetDir, agentDir);
  await ensureDir(join2(agentPath, commandsDir));
  await ensureDir(join2(agentPath, "conductor"));
}
async function copyTemplateFiles(targetDir, agentType) {
  const commands = ["setup", "newTrack", "implement", "status", "revert"];
  let agentDir;
  let commandsDir;
  if (agentType === "claude-code") {
    agentDir = ".claude";
    commandsDir = "commands";
  } else if (agentType === "antigravity") {
    agentDir = ".agent";
    commandsDir = "workflows";
  } else {
    agentDir = ".opencode";
    commandsDir = "commands";
  }
  const agentPath = join2(targetDir, agentDir);
  const targetCommandsDir = join2(agentPath, commandsDir);
  const templateRoot = await getTemplateRoot();
  const installPath = join2(agentDir, "conductor");
  try {
    const templateSource = join2(templateRoot, "templates");
    const templateDest = join2(agentPath, "conductor", "templates");
    await copy(templateSource, templateDest);
  } catch (e) {
    console.warn("Failed to copy templates directory:", e);
  }
  for (const cmd of commands) {
    try {
      const tomlContent = await loadTemplate(`commands/${cmd}.toml`);
      let finalContent;
      let fileName;
      const parsed = parse(tomlContent);
      if (!parsed.prompt) {
        console.warn(`Warning: No prompt found in ${cmd}.toml`);
        continue;
      }
      let prompt = parsed.prompt;
      prompt = prompt.replace(/__\$\$CODE_AGENT_INSTALL_PATH\$\$__/g, installPath);
      finalContent = substituteVariables(prompt, { agent_type: agentType });
      if (parsed.description) {
        finalContent = `---
description: ${parsed.description}
---
${finalContent}`;
      }
      fileName = `conductor:${cmd}.md`;
      await writeFile(join2(targetCommandsDir, fileName), finalContent);
    } catch (e) {
      console.warn(`Failed to process ${cmd}:`, e);
    }
  }
}

// src/commands/install.ts
import { resolve as resolve2 } from "path";
async function installHandler(argv) {
  const targetDir = resolve2(process.cwd(), argv.path);
  try {
    console.log(`Initializing Conductor in: ${targetDir}`);
    console.log("Step 1: Prompting for agent selection...");
    const agent = await promptForAgent();
    console.log(`\u2714 Selected agent: ${agent}`);
    console.log("\nStep 2: Validating project directory...");
    const validatedPath = await validateProjectDirectory(targetDir, agent);
    console.log(`\u2714 Validation complete: ${validatedPath}`);
    console.log("\nStep 3: Creating Conductor directories...");
    await createConductorDirectories(validatedPath, agent);
    console.log("\u2714 Directories created");
    console.log("\nStep 4: Copying template files...");
    await copyTemplateFiles(validatedPath, agent);
    console.log("\u2714 Templates copied");
    console.log("\n\u2714 Conductor initialized successfully!");
  } catch (err) {
    console.error("\n\u2718 Installation failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

// src/cli/index.ts
var cli = yargs(hideBin(process.argv)).scriptName("conductor").usage("$0 <cmd> [args]").command(
  "install [path]",
  "Install Conductor in the specified directory",
  (yargs2) => {
    return yargs2.positional("path", {
      describe: "Directory to install Conductor",
      default: ".",
      type: "string"
    });
  },
  installHandler
).help();

// src/index.ts
cli.parse();
