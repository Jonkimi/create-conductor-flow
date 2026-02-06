import gradient from "gradient-string";
import chalk from "chalk"; // 推荐安装 chalk 来加颜色
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// New banner for 'conductor-flow' command
export const CONDUCTOR_INIT_BANNER = `
   __________  _   ______  __  __________________  ____       ________    ____  _       __
  / ____/ __ \\/ | / / __ \\/ / / / ____/_  __/ __ \\/ __ \\     / ____/ /   / __ \\| |     / /
 / /   / / / /  |/ / / / / / / / /     / / / / / / /_/ /    / /_  / /   / / / /| | /| / / 
/ /___/ /_/ / /|  / /_/ / /_/ / /___  / / / /_/ / _, _/    / __/ / /___/ /_/ / | |/ |/ /  
\\____/\\____/_/ |_/_____/\\____/\\____/ /_/  \\____/_/ |_|    /_/   /_____/\\____/  |__/|__/   
                                                                                    
`;

export function printVersion(): void {
	// 1. 获取 package.json 的路径 (兼容 ESM)
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	// Try to find package.json in typical locations
	let pkgPath = path.join(__dirname, "../package.json");
	if (!fs.existsSync(pkgPath)) {
		pkgPath = path.join(__dirname, "../../package.json");
	}
	// 2. 读取版本号
	const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
	const version = pkg.version;
	console.log(chalk.dim(`  v${version} | Scaffolding for Gemini Conductor\n`));
}

export function printBanner(): void {
	// console.clear();
	console.log(gradient("cyan", "green")(CONDUCTOR_INIT_BANNER));
}
