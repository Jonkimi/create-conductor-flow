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

function printVersion(): void {
	// 1. 获取 package.json 的路径 (兼容 ESM)
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	// 注意：如果你的代码在 dist/ 目录，可能需要 ../package.json，根据实际层级调整
	const pkgPath = path.join(__dirname, "../package.json");
	// 2. 读取版本号
	const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
	const version = pkg.version;
	console.log(chalk.dim(`  v${version} | Scaffolding for Gemini Conductor\n`));
}

export function printBanner(): void {
	// console.clear();
	console.log(gradient("cyan", "green")(CONDUCTOR_INIT_BANNER));
	// B. 版本号 (居中或右对齐，用暗色调，不要喧宾夺主)
	// 这里的 console.log 直接接在 Banner 下面
	printVersion();
}
