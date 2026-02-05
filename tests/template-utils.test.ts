import { describe, it, expect, vi, beforeEach } from "vitest";
import * as fsPromises from "fs/promises";

vi.mock("fs/promises", async () => {
	const actual = await vi.importActual("fs/promises");
	return {
		...(actual as any),
		readFile: vi.fn(),
	};
});

import {
	substituteVariables,
	loadTemplate,
	DEFAULT_REPO,
	DEFAULT_BRANCH,
	getCacheDir,
	ensureTemplates,
	getTemplateRoot,
} from "../src/utils/template";
import * as child_process from "child_process";
import fs from "fs-extra";

vi.mock("child_process");
vi.mock("fs-extra", () => {
	return {
		default: {
			existsSync: vi.fn(),
			ensureDir: vi.fn(),
			remove: vi.fn(),
			pathExists: vi.fn(),
		},
	};
});

describe("Constants", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("should have default repo", () => {
		expect(DEFAULT_REPO).toBe(
			"https://github.com/gemini-cli-extensions/conductor",
		);
	});
	it("should have default branch", () => {
		expect(DEFAULT_BRANCH).toBe("main");
	});
});

describe("Cache Directory", () => {
	it("should resolve cache directory", () => {
		const cacheDir = getCacheDir();
		expect(cacheDir).toContain(
			require("path").join(".gemini", "cache", "conductor"),
		);
	});

	it("should return different paths for different repo/branch", () => {
		const dir1 = getCacheDir("repo1", "main");
		const dir2 = getCacheDir("repo2", "main");
		const dir3 = getCacheDir("repo1", "dev");

		expect(dir1).not.toBe(dir2);
		expect(dir1).not.toBe(dir3);
		expect(dir2).not.toBe(dir3);
	});
});

describe("Ensure Templates", () => {
	it("should clone repository if cache missing", async () => {
		vi.mocked(fs.existsSync).mockReturnValue(false);

		await ensureTemplates();

		expect(fs.ensureDir).toHaveBeenCalled();

		expect(child_process.execSync).toHaveBeenCalledWith(
			expect.stringContaining("git clone"),

			expect.any(Object),
		);
	});

	it("should use custom repo and branch", async () => {
		vi.mocked(fs.existsSync).mockReturnValue(false);

		await ensureTemplates("https://custom.com/repo", "dev");

		expect(child_process.execSync).toHaveBeenCalledWith(
			expect.stringContaining("git clone https://custom.com/repo --branch dev"),

			expect.any(Object),
		);
	});

	it("should update repository if cache exists", async () => {
		vi.mocked(fs.existsSync).mockReturnValue(true);

		await ensureTemplates();

		expect(child_process.execSync).toHaveBeenCalledWith(
			expect.stringContaining("git pull --rebase"),
			expect.any(Object),
		);
	});
});

describe("Template Root Resolution", () => {
	it("should ensure templates and return cache dir", async () => {
		vi.mocked(fs.existsSync).mockReturnValue(true);

		// Mock getTemplateRoot to see if it calls ensureTemplates

		// Since we are testing the actual implementation, we check the side effects

		// For this test, we need to mock ensureTemplates or just check if it returns cacheDir

		const root = await getTemplateRoot("https://custom.com/repo", "dev");

		expect(root).toContain(
			require("path").join(".gemini", "cache", "conductor"),
		);
	});
});

describe("Template Substitution", () => {
	it("should replace {agent_type}", () => {
		const template = "Hello {agent_type}";
		const result = substituteVariables(template, { agent_type: "World" });
		expect(result).toBe("Hello World");
	});

	it("should replace multiple variables", () => {
		const template = "{greeting} {agent_type}";
		const result = substituteVariables(template, {
			greeting: "Hi",
			agent_type: "User",
		});
		expect(result).toBe("Hi User");
	});

	it("should ignore missing variables", () => {
		const template = "Hello {missing}";
		const result = substituteVariables(template, {});
		expect(result).toBe("Hello {missing}");
	});

	it("should ignore unused variables in context", () => {
		const template = "Hello {name}";
		const result = substituteVariables(template, {
			name: "World",
			unused: "foo",
		});
		expect(result).toBe("Hello World");
	});

	describe("Template Loader", () => {
		beforeEach(() => {
			vi.resetAllMocks();
		});

		it("should load a template file", async () => {
			vi.mocked(fsPromises.readFile).mockResolvedValue(
				'description = "Scaffolds the project"',
			);

			const content = await loadTemplate(
				"commands/conductor/setup.toml",
				"/mock/root",
			);
			expect(content).toContain('description = "Scaffolds the project');
			expect(fsPromises.readFile).toHaveBeenCalledWith(
				"/mock/root/commands/conductor/setup.toml",
				"utf-8",
			);
		});

		it("should throw if file missing", async () => {
			vi.mocked(fsPromises.readFile).mockRejectedValue(new Error("ENOENT"));
			await expect(loadTemplate("missing.md", "/mock/root")).rejects.toThrow();
		});
	});
});
