import fs from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";

// 配置：定义你的主包名和别名包名
const MAIN_PACKAGE_NAME = "create-conductor-flow";
const ALIAS_PACKAGE_NAME = "conductor-init";

// 获取 package.json 的路径
const pkgPath = path.resolve(process.cwd(), "package.json");

// 颜色辅助函数 (为了让输出更好看)
const colors = {
	reset: "\x1b[0m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	red: "\x1b[31m",
	cyan: "\x1b[36m",
};

const log = (msg: string, color: string = colors.reset) =>
	console.log(`${color}${msg}${colors.reset}`);

function main() {
	// 1. 读取原始 package.json
	const originalContent = fs.readFileSync(pkgPath, "utf-8");
	const pkg = JSON.parse(originalContent);

	// 安全检查：防止在错误的包里运行
	if (pkg.name !== MAIN_PACKAGE_NAME) {
		log(
			`❌ Error: Current package name is "${pkg.name}", expected "${MAIN_PACKAGE_NAME}"`,
			colors.red,
		);
		process.exit(1);
	}

	try {
		// ---------------------------------------------------------
		// 第一步：发布主包 (create-conductor-flow)
		// ---------------------------------------------------------
		log(`\n🚀 Publishing Main Package: ${MAIN_PACKAGE_NAME}...`, colors.cyan);

		execSync("npm publish", { stdio: "inherit" });
		log(`✅ ${MAIN_PACKAGE_NAME} published successfully!`, colors.green);

		// ---------------------------------------------------------
		// 第二步：修改 package.json 为别名包
		// ---------------------------------------------------------
		log(
			`\n🔄 Transforming to Alias Package: ${ALIAS_PACKAGE_NAME}...`,
			colors.yellow,
		);

		// 修改 name
		pkg.name = ALIAS_PACKAGE_NAME;

		// 修改 bin
		// 逻辑：找到原来 bin 里的第一个入口文件路径，赋给新的 alias key
		const originalBinPath = Object.values(pkg.bin || {})[0] as string;
		if (!originalBinPath) {
			throw new Error("Could not find existing bin entry in package.json");
		}

		pkg.bin = {
			[ALIAS_PACKAGE_NAME]: originalBinPath,
		};

		// 写入临时的 package.json
		fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

		// ---------------------------------------------------------
		// 第三步：发布别名包 (conductor-init)
		// ---------------------------------------------------------
		log(`🚀 Publishing Alias Package: ${ALIAS_PACKAGE_NAME}...`, colors.cyan);

		execSync("npm publish --provenance", { stdio: "inherit" });
		log(`✅ ${ALIAS_PACKAGE_NAME} published successfully!`, colors.green);
	} catch (error) {
		log(`\n❌ Publish Failed:`, colors.red);
		console.error(error);
		process.exit(1);
	} finally {
		// ---------------------------------------------------------
		// 第四步：无论成功与否，必须还原 package.json
		// ---------------------------------------------------------
		log(`\n♻️  Restoring original package.json...`, colors.yellow);
		fs.writeFileSync(pkgPath, originalContent);
		log(`✨ Done.`, colors.green);
	}
}

main();
