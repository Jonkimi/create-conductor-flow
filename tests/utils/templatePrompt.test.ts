import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
	TemplateSource,
	type TemplateSourceResult,
	PROMPT_TEXTS,
	LOG_MESSAGES,
	isInteractiveMode,
	validateRepoUrl,
	promptTemplateSource,
	resolveTemplateSource,
} from "../../src/utils/templatePrompt.js";
import { DEFAULT_REPO, DEFAULT_BRANCH } from "../../src/utils/template.js";
import select from "@inquirer/select";
import input from "@inquirer/input";
import { isGitAvailable } from "../../src/utils/gitDetect.js";

// Mock the @inquirer modules
vi.mock("@inquirer/select", () => ({
	default: vi.fn(),
}));

vi.mock("@inquirer/input", () => ({
	default: vi.fn(),
}));

vi.mock("../../src/utils/gitDetect.js", () => ({
	isGitAvailable: vi.fn(),
}));

describe("templatePrompt", () => {
	describe("TemplateSource enum", () => {
		it("should have correct values", () => {
			expect(TemplateSource.BUNDLED).toBe("bundled");
			expect(TemplateSource.OFFICIAL).toBe("official");
			expect(TemplateSource.CUSTOM).toBe("custom");
		});
	});

	describe("PROMPT_TEXTS constants", () => {
		it("should have all required prompt texts", () => {
			expect(PROMPT_TEXTS.SELECT_SOURCE_MESSAGE).toBeDefined();
			expect(PROMPT_TEXTS.BUNDLED_LABEL).toBeDefined();
			expect(PROMPT_TEXTS.BUNDLED_DESCRIPTION).toBeDefined();
			expect(PROMPT_TEXTS.OFFICIAL_LABEL).toBeDefined();
			expect(PROMPT_TEXTS.OFFICIAL_DESCRIPTION).toBeDefined();
			expect(PROMPT_TEXTS.CUSTOM_LABEL).toBeDefined();
			expect(PROMPT_TEXTS.CUSTOM_DESCRIPTION).toBeDefined();
			expect(PROMPT_TEXTS.CUSTOM_REPO_PROMPT).toBeDefined();
			expect(PROMPT_TEXTS.CUSTOM_BRANCH_PROMPT).toBeDefined();
		});
	});

	describe("LOG_MESSAGES constants", () => {
		it("should have all required log messages", () => {
			expect(LOG_MESSAGES.USING_BUNDLED).toBeDefined();
			expect(LOG_MESSAGES.DOWNLOADING_FROM).toBeDefined();
			expect(LOG_MESSAGES.NON_INTERACTIVE_BUNDLED).toBeDefined();
		});

		it("should format DOWNLOADING_FROM correctly", () => {
			const message = LOG_MESSAGES.DOWNLOADING_FROM(
				"https://github.com/test/repo",
				"main",
			);
			expect(message).toContain("https://github.com/test/repo");
			expect(message).toContain("main");
		});
	});

	describe("isInteractiveMode", () => {
		const originalEnv = process.env.CI;
		const originalIsTTY = process.stdin.isTTY;

		afterEach(() => {
			// Restore original environment
			if (originalEnv === undefined) {
				delete process.env.CI;
			} else {
				process.env.CI = originalEnv;
			}
			// Restore isTTY (read-only property, need to reassign via Object.defineProperty)
			Object.defineProperty(process.stdin, "isTTY", {
				value: originalIsTTY,
				configurable: true,
			});
		});

		it("should return false when CI=true", () => {
			process.env.CI = "true";
			Object.defineProperty(process.stdin, "isTTY", {
				value: true,
				configurable: true,
			});

			expect(isInteractiveMode()).toBe(false);
		});

		it("should return false when stdin is not a TTY", () => {
			delete process.env.CI;
			Object.defineProperty(process.stdin, "isTTY", {
				value: false,
				configurable: true,
			});

			expect(isInteractiveMode()).toBe(false);
		});

		it("should return true when CI is not set and stdin is TTY", () => {
			delete process.env.CI;
			Object.defineProperty(process.stdin, "isTTY", {
				value: true,
				configurable: true,
			});

			expect(isInteractiveMode()).toBe(true);
		});

		it("should return false when stdin.isTTY is undefined", () => {
			delete process.env.CI;
			Object.defineProperty(process.stdin, "isTTY", {
				value: undefined,
				configurable: true,
			});

			expect(isInteractiveMode()).toBe(false);
		});
	});

	describe("validateRepoUrl", () => {
		it("should accept HTTPS URLs", () => {
			expect(validateRepoUrl("https://github.com/user/repo")).toBe(true);
			expect(validateRepoUrl("https://gitlab.com/user/repo.git")).toBe(true);
		});

		it("should accept SSH URLs", () => {
			expect(validateRepoUrl("git@github.com:user/repo.git")).toBe(true);
			expect(validateRepoUrl("git@gitlab.com:user/repo")).toBe(true);
		});

		it("should accept local paths", () => {
			expect(validateRepoUrl("/absolute/path/to/repo")).toBe(true);
			expect(validateRepoUrl("./relative/path")).toBe(true);
			expect(validateRepoUrl("../parent/path")).toBe(true);
		});

		it("should reject empty URLs", () => {
			expect(validateRepoUrl("")).toContain("required");
			expect(validateRepoUrl("   ")).toContain("required");
		});

		it("should reject invalid URLs", () => {
			const result = validateRepoUrl("invalid-url");
			expect(typeof result).toBe("string");
			expect(result).toContain("Invalid");
		});
	});

	describe("promptTemplateSource", () => {
		const originalEnv = process.env.CI;
		const originalIsTTY = process.stdin.isTTY;

		beforeEach(() => {
			vi.clearAllMocks();
			// Default: git is available
			vi.mocked(isGitAvailable).mockReturnValue(true);
		});

		afterEach(() => {
			if (originalEnv === undefined) {
				delete process.env.CI;
			} else {
				process.env.CI = originalEnv;
			}
			Object.defineProperty(process.stdin, "isTTY", {
				value: originalIsTTY,
				configurable: true,
			});
		});

		it("should return bundled source in non-interactive mode (CI)", async () => {
			process.env.CI = "true";

			const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

			const result = await promptTemplateSource();

			expect(result.source).toBe(TemplateSource.BUNDLED);
			expect(result.repo).toBeUndefined();
			expect(result.branch).toBeUndefined();
			expect(consoleSpy).toHaveBeenCalledWith(
				LOG_MESSAGES.NON_INTERACTIVE_BUNDLED,
			);

			consoleSpy.mockRestore();
		});

		it("should return bundled source when user selects bundled", async () => {
			delete process.env.CI;
			Object.defineProperty(process.stdin, "isTTY", {
				value: true,
				configurable: true,
			});

			vi.mocked(select).mockResolvedValue(TemplateSource.BUNDLED);

			const result = await promptTemplateSource();

			expect(result.source).toBe(TemplateSource.BUNDLED);
			expect(result.repo).toBeUndefined();
			expect(result.branch).toBeUndefined();
		});

		it("should return official repo when user selects official", async () => {
			delete process.env.CI;
			Object.defineProperty(process.stdin, "isTTY", {
				value: true,
				configurable: true,
			});

			vi.mocked(select).mockResolvedValue(TemplateSource.OFFICIAL);

			const result = await promptTemplateSource();

			expect(result.source).toBe(TemplateSource.OFFICIAL);
			expect(result.repo).toBe(DEFAULT_REPO);
			expect(result.branch).toBe(DEFAULT_BRANCH);
		});

		it("should prompt for custom URL and branch when user selects custom", async () => {
			delete process.env.CI;
			Object.defineProperty(process.stdin, "isTTY", {
				value: true,
				configurable: true,
			});

			vi.mocked(select).mockResolvedValue(TemplateSource.CUSTOM);
			vi.mocked(input)
				.mockResolvedValueOnce("https://github.com/custom/repo")
				.mockResolvedValueOnce("develop");

			const result = await promptTemplateSource();

			expect(result.source).toBe(TemplateSource.CUSTOM);
			expect(result.repo).toBe("https://github.com/custom/repo");
			expect(result.branch).toBe("develop");
			expect(vi.mocked(input)).toHaveBeenCalledTimes(2);
		});

		it("should use default branch when custom branch is empty", async () => {
			delete process.env.CI;
			Object.defineProperty(process.stdin, "isTTY", {
				value: true,
				configurable: true,
			});

			vi.mocked(select).mockResolvedValue(TemplateSource.CUSTOM);
			vi.mocked(input)
				.mockResolvedValueOnce("https://github.com/custom/repo")
				.mockResolvedValueOnce("");

			const result = await promptTemplateSource();

			expect(result.source).toBe(TemplateSource.CUSTOM);
			expect(result.branch).toBe(DEFAULT_BRANCH);
		});

		it("should display 3 choices when git is available", async () => {
			delete process.env.CI;
			Object.defineProperty(process.stdin, "isTTY", {
				value: true,
				configurable: true,
			});
			vi.mocked(isGitAvailable).mockReturnValue(true);

			vi.mocked(select).mockResolvedValue(TemplateSource.BUNDLED);

			await promptTemplateSource();

			const callArgs = vi.mocked(select).mock.calls[0][0];
			expect(callArgs.message).toBe(PROMPT_TEXTS.SELECT_SOURCE_MESSAGE);

			const choices = callArgs.choices as Array<{
				name: string;
				value: string;
				description?: string;
			}>;
			expect(choices).toHaveLength(3);

			const bundledChoice = choices.find(
				(c) => c.value === TemplateSource.BUNDLED,
			);
			expect(bundledChoice?.name).toBe(PROMPT_TEXTS.BUNDLED_LABEL);

			const officialChoice = choices.find(
				(c) => c.value === TemplateSource.OFFICIAL,
			);
			expect(officialChoice?.name).toBe(PROMPT_TEXTS.OFFICIAL_LABEL);

			const customChoice = choices.find(
				(c) => c.value === TemplateSource.CUSTOM,
			);
			expect(customChoice?.name).toBe(PROMPT_TEXTS.CUSTOM_LABEL);
		});

		it("should display only 1 choice (BUNDLED) when git is unavailable", async () => {
			delete process.env.CI;
			Object.defineProperty(process.stdin, "isTTY", {
				value: true,
				configurable: true,
			});
			vi.mocked(isGitAvailable).mockReturnValue(false);

			const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
			vi.mocked(select).mockResolvedValue(TemplateSource.BUNDLED);

			await promptTemplateSource();

			const callArgs = vi.mocked(select).mock.calls[0][0];
			const choices = callArgs.choices as Array<{
				name: string;
				value: string;
				description?: string;
			}>;
			expect(choices).toHaveLength(1);
			expect(choices[0].value).toBe(TemplateSource.BUNDLED);

			consoleSpy.mockRestore();
		});

		it("should log info message when git is unavailable", async () => {
			delete process.env.CI;
			Object.defineProperty(process.stdin, "isTTY", {
				value: true,
				configurable: true,
			});
			vi.mocked(isGitAvailable).mockReturnValue(false);

			const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
			vi.mocked(select).mockResolvedValue(TemplateSource.BUNDLED);

			await promptTemplateSource();

			expect(consoleSpy).toHaveBeenCalledWith(
				LOG_MESSAGES.GIT_NOT_FOUND_INFO,
			);

			consoleSpy.mockRestore();
		});
	});

	describe("resolveTemplateSource", () => {
		it("should return undefined repo/branch for bundled source", () => {
			const result: TemplateSourceResult = {
				source: TemplateSource.BUNDLED,
			};

			const resolved = resolveTemplateSource(result);

			expect(resolved.repo).toBeUndefined();
			expect(resolved.branch).toBeUndefined();
		});

		it("should return repo/branch for official source", () => {
			const result: TemplateSourceResult = {
				source: TemplateSource.OFFICIAL,
				repo: DEFAULT_REPO,
				branch: DEFAULT_BRANCH,
			};

			const resolved = resolveTemplateSource(result);

			expect(resolved.repo).toBe(DEFAULT_REPO);
			expect(resolved.branch).toBe(DEFAULT_BRANCH);
		});

		it("should return repo/branch for custom source", () => {
			const result: TemplateSourceResult = {
				source: TemplateSource.CUSTOM,
				repo: "https://github.com/custom/repo",
				branch: "develop",
			};

			const resolved = resolveTemplateSource(result);

			expect(resolved.repo).toBe("https://github.com/custom/repo");
			expect(resolved.branch).toBe("develop");
		});
	});
});
