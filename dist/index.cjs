#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = () => typeof document === "undefined" ? new URL(`file:${__filename}`).href : document.currentScript && document.currentScript.tagName.toUpperCase() === "SCRIPT" ? document.currentScript.src : new URL("main.js", document.baseURI).href;
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();

// src/cli/index.ts
var import_yargs = __toESM(require("yargs"), 1);
var import_helpers = require("yargs/helpers");

// src/cli/prompt.ts
var import_select = __toESM(require("@inquirer/select"), 1);
async function promptForAgent() {
  const answer = await (0, import_select.default)({
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
var import_fs_extra = __toESM(require("fs-extra"), 1);
var import_path2 = require("path");
var import_smol_toml = require("smol-toml");

// src/utils/template.ts
var import_promises = require("fs/promises");
var import_path = require("path");
var import_url = require("url");
var __dirname = (0, import_url.fileURLToPath)(new URL(".", importMetaUrl));
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
    (0, import_path.join)(__dirname, "templates"),
    (0, import_path.join)(__dirname, "../templates"),
    (0, import_path.join)(__dirname, "../../gemini-conductor-codebase")
  ];
  for (const path of candidates) {
    try {
      if ((await (0, import_promises.stat)(path)).isDirectory()) {
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
  const fullPath = (0, import_path.join)(rootDir, templatePath);
  return (0, import_promises.readFile)(fullPath, "utf-8");
}

// src/utils/install.ts
var { existsSync, ensureDir, writeFile, copy } = import_fs_extra.default;
async function validateProjectDirectory(targetDir, agentType) {
  if (!existsSync(targetDir)) {
    throw new Error(`Target directory does not exist: ${targetDir}`);
  }
  let agentDir;
  let setupFile;
  if (agentType === "claude-code") {
    agentDir = ".claude";
    setupFile = (0, import_path2.join)(targetDir, agentDir, "commands", "conductor:setup.md");
  } else if (agentType === "antigravity") {
    agentDir = ".agent";
    setupFile = (0, import_path2.join)(targetDir, agentDir, "workflows", "conductor:setup.md");
  } else {
    agentDir = ".opencode";
    setupFile = (0, import_path2.join)(targetDir, agentDir, "commands", "conductor:setup.md");
  }
  const agentPath = (0, import_path2.join)(targetDir, agentDir);
  const conductorPath = (0, import_path2.join)(agentPath, "conductor");
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
  const agentPath = (0, import_path2.join)(targetDir, agentDir);
  await ensureDir((0, import_path2.join)(agentPath, commandsDir));
  await ensureDir((0, import_path2.join)(agentPath, "conductor"));
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
  const agentPath = (0, import_path2.join)(targetDir, agentDir);
  const targetCommandsDir = (0, import_path2.join)(agentPath, commandsDir);
  const templateRoot = await getTemplateRoot();
  const installPath = (0, import_path2.join)(agentDir, "conductor");
  try {
    const templateSource = (0, import_path2.join)(templateRoot, "templates");
    const templateDest = (0, import_path2.join)(agentPath, "conductor", "templates");
    await copy(templateSource, templateDest);
  } catch (e) {
    console.warn("Failed to copy templates directory:", e);
  }
  for (const cmd of commands) {
    try {
      const tomlContent = await loadTemplate(`commands/${cmd}.toml`);
      let finalContent;
      let fileName;
      const parsed = (0, import_smol_toml.parse)(tomlContent);
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
      await writeFile((0, import_path2.join)(targetCommandsDir, fileName), finalContent);
    } catch (e) {
      console.warn(`Failed to process ${cmd}:`, e);
    }
  }
}

// src/commands/install.ts
var import_path3 = require("path");
async function installHandler(argv) {
  const targetDir = (0, import_path3.resolve)(process.cwd(), argv.path);
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
var cli = (0, import_yargs.default)((0, import_helpers.hideBin)(process.argv)).scriptName("conductor").usage("$0 <cmd> [args]").command(
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
