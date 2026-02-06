import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { execSync } from "child_process";
import * as fs from "fs";
import { join } from "path";
import * as os from "os"; // Fixed import

describe("CLI E2E Tests", () => {
	describe("package.json configuration", () => {
		it("should have correct package name", () => {
			const pkg = JSON.parse(
				fs.readFileSync(join(process.cwd(), "package.json"), "utf-8"),
			);
			expect(pkg.name).toBe("create-conductor-flow");
		});

		it("should have correct bin entries", () => {
			const pkg = JSON.parse(
				fs.readFileSync(join(process.cwd(), "package.json"), "utf-8"),
			);
			expect(pkg.bin["conductor-init"]).toBeDefined();
			expect(pkg.bin["create-conductor-flow"]).toBeDefined();
		});
	});

	const commands = [
		{ name: "conductor-init", scriptPath: "dist/conductor-init.js" },
		{ name: "create-conductor-flow", scriptPath: "dist/index.js" },
	];

	commands.forEach(({ name, scriptPath }) => {
		describe(`${name} command`, () => {
			const installPath = join(process.cwd(), scriptPath);

			describe("CLI basics", () => {
				it("should display help text", () => {
					const output = execSync(`node ${installPath} --help`).toString();
					expect(output).toContain("--help");
					expect(output).toContain("--agent");
				});

				it("should display version", () => {
					const pkg = JSON.parse(
						fs.readFileSync(join(process.cwd(), "package.json"), "utf-8"),
					);
					const output = execSync(`node ${installPath} --version`).toString();
					expect(output).toContain(pkg.version);
				});

				it("should accept --agent option", () => {
					const output = execSync(`node ${installPath} --help`).toString();
					expect(output).toContain("--agent");
					expect(output).toContain("-a");
				});

				it("should accept --path option", () => {
					const output = execSync(`node ${installPath} --help`).toString();
					// The help text description for path usually contains "directory" or usage info
					// Or just check if it runs without error. The original test checked for "path" in output.
					expect(output.toLowerCase()).toContain("path");
				});
			});

			describe("e2e installation tests", () => {
				let tempDir: string;

				// Helper to create a unique temp directory for each test
				const createTempDir = (): string => {
					return fs.mkdtempSync(join(os.tmpdir(), "conductor-e2e-"));
				};

				// Helper to clean up temp directory
				const cleanupTempDir = (dir: string): void => {
					if (dir && fs.existsSync(dir)) {
						fs.rmSync(dir, { recursive: true, force: true });
					}
				};

				// Helper to run CLI (captures both stdout and stderr)
				const runCLI = (args: string = ""): string => {
					const cmd = `node ${installPath} ${args} 2>&1`;
					return execSync(cmd, {
						encoding: "utf-8",
						env: { ...process.env, CONDUCTOR_NO_BANNER: "1" },
						shell: true, // Use shell to handle redirection
					});
				};

				beforeEach(() => {
					tempDir = createTempDir();
				});

				afterEach(() => {
					cleanupTempDir(tempDir);
				});

				describe("installation with --agent option", () => {
					it("should install for gemini agent", () => {
						const output = runCLI(
							`${tempDir} --agent gemini --scope project --git-ignore none`,
						);
						expect(output).toContain("Using provided agent: gemini");
						expect(output).toContain("Conductor initialized successfully");

						const geminiDir = join(tempDir, ".gemini");
						expect(fs.existsSync(geminiDir)).toBe(true);
						expect(fs.existsSync(join(geminiDir, "conductor"))).toBe(true);
					});

					it("should install for claude-code agent", () => {
						const output = runCLI(
							`${tempDir} --agent claude-code --scope project --git-ignore none`,
						);
						expect(output).toContain("Using provided agent: claude-code");
						expect(output).toContain("Conductor initialized successfully");

						const claudeDir = join(tempDir, ".claude");
						expect(fs.existsSync(claudeDir)).toBe(true);
					});

					it("should install for cursor agent", () => {
						const output = runCLI(
							`${tempDir} --agent cursor --scope project --git-ignore none`,
						);
						expect(output).toContain("Using provided agent: cursor");
						expect(output).toContain("Conductor initialized successfully");

						const cursorDir = join(tempDir, ".cursor");
						expect(fs.existsSync(cursorDir)).toBe(true);
					});

					it("should install for opencode agent", () => {
						const output = runCLI(
							`${tempDir} --agent opencode --scope project --git-ignore none`,
						);
						expect(output).toContain("Using provided agent: opencode");
						expect(output).toContain("Conductor initialized successfully");
					});
				});

				describe("--scope option", () => {
					it("should install in project scope", () => {
						const output = runCLI(
							`${tempDir} --agent gemini --scope project --git-ignore none`,
						);
						expect(output).toContain("Selected scope: project");
						expect(output).toContain("Conductor initialized successfully");
					});

					it("should install in global scope", () => {
						const output = runCLI(
							`${tempDir} --agent claude-code --scope global`,
						);
						expect(output).toContain("Selected scope: global");
						expect(output).toContain("Conductor initialized successfully");
					});
				});

				describe("--force option", () => {
					it("should overwrite existing installation with --force", () => {
						runCLI(
							`${tempDir} --agent claude-code --scope project --git-ignore none`,
						);

						const output = runCLI(
							`${tempDir} --agent claude-code --scope project --git-ignore none --force`,
						);
						expect(output).toContain(
							"Force mode: Overwriting existing installation",
						);
						expect(output).toContain("Conductor initialized successfully");

						const claudeDir = join(tempDir, ".claude");
						expect(fs.existsSync(claudeDir)).toBe(true);
					});
				});

				describe("--git-ignore option", () => {
					it("should handle --git-ignore gitignore option", () => {
						execSync("git init", { cwd: tempDir, encoding: "utf-8" });

						const output = runCLI(
							`${tempDir} --agent gemini --scope project --git-ignore gitignore`,
						);
						expect(output).toContain("Conductor initialized successfully");

						const gitignorePath = join(tempDir, ".gitignore");
						if (fs.existsSync(gitignorePath)) {
							const content = fs.readFileSync(gitignorePath, "utf-8");
							expect(content).toContain(".gemini");
						}
					});

					it("should handle --git-ignore exclude option", () => {
						execSync("git init", { cwd: tempDir, encoding: "utf-8" });

						const output = runCLI(
							`${tempDir} --agent gemini --scope project --git-ignore exclude`,
						);
						expect(output).toContain("Conductor initialized successfully");

						const excludePath = join(tempDir, ".git", "info", "exclude");
						if (fs.existsSync(excludePath)) {
							const content = fs.readFileSync(excludePath, "utf-8");
							expect(content).toContain(".gemini");
						}
					});

					it("should handle --git-ignore none option", () => {
						const output = runCLI(
							`${tempDir} --agent gemini --scope project --git-ignore none`,
						);
						expect(output).toContain("Conductor initialized successfully");
					});

					it("should warn when --git-ignore used with global scope", () => {
						const output = runCLI(
							`${tempDir} --agent claude-code --scope global --git-ignore gitignore`,
						);
						expect(output).toContain(
							"--git-ignore flag is only supported for project scope",
						);
					});
				});

				describe("path handling", () => {
					it("should accept path as positional argument", () => {
						const output = runCLI(
							`${tempDir} --agent gemini --scope project --git-ignore none`,
						);
						expect(output).toContain(`Initializing Conductor in: ${tempDir}`);
						expect(output).toContain("Conductor initialized successfully");
					});

					it("should fail when target directory does not exist", () => {
						const nestedPath = join(tempDir, "nested", "project");
						expect(() => {
							runCLI(
								`${nestedPath} --agent gemini --scope project --git-ignore none`,
							);
						}).toThrow();
					});

					it("should install in pre-created nested directory", () => {
						const nestedPath = join(tempDir, "nested", "project");
						fs.mkdirSync(nestedPath, { recursive: true });
						const output = runCLI(
							`${nestedPath} --agent gemini --scope project --git-ignore none`,
						);
						expect(output).toContain("Conductor initialized successfully");
					});
				});

				describe("error handling", () => {
					it("should reject invalid agent", () => {
						expect(() => {
							runCLI(`${tempDir} --agent invalid-agent`);
						}).toThrow();
					});

					it("should reject invalid scope", () => {
						expect(() => {
							runCLI(`${tempDir} --agent gemini --scope invalid-scope`);
						}).toThrow();
					});

					it("should reject invalid git-ignore option", () => {
						expect(() => {
							runCLI(`${tempDir} --agent gemini --git-ignore invalid`);
						}).toThrow();
					});
				});

				describe("multiple agent installations", () => {
					it("should allow installing different agents in sequence", () => {
						let output = runCLI(
							`${tempDir} --agent gemini --scope project --git-ignore none`,
						);
						expect(output).toContain("Conductor initialized successfully");

						output = runCLI(
							`${tempDir} --agent claude-code --scope project --git-ignore none`,
						);
						expect(output).toContain("Conductor initialized successfully");

						expect(fs.existsSync(join(tempDir, ".gemini"))).toBe(true);
						expect(fs.existsSync(join(tempDir, ".claude"))).toBe(true);
					});
				});
			});
		});
	});
});
