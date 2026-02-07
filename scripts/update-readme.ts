import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";
import { stripAnsi, updateReadmeSection } from "../src/utils/readme-update.js";

async function main() {
	try {
		console.log("Capturing help output...");
		// Run the command and capture output
		// We use npx tsx src/index.ts --help
		const helpOutputRaw = execSync("npx tsx src/index.ts --help", {
			encoding: "utf8",
			env: {
				...process.env,
				FORCE_COLOR: "0",
				CONDUCTOR_NO_BANNER: "1",
				COLUMNS: "135",
			}, // Try to disable color and suppress banner
		});

		const helpOutput = stripAnsi(helpOutputRaw).trim();

		const readmeFiles = [
			"README.md",
			"README_zh.md",
			"README_ja.md",
			"README_ko.md",
		];

		for (const file of readmeFiles) {
			const filePath = path.resolve(process.cwd(), file);
			if (await fs.pathExists(filePath)) {
				console.log(`Updating ${file}...`);
				const content = await fs.readFile(filePath, "utf8");
				const updatedContent = updateReadmeSection(content, helpOutput);
				await fs.writeFile(filePath, updatedContent, "utf8");
			} else {
				console.warn(`Warning: ${file} not found at ${filePath}`);
			}
		}

		console.log("All README files updated successfully!");
	} catch (error) {
		console.error("Error updating README files:", error);
		process.exit(1);
	}
}

main();
