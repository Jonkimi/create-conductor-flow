import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { installHandler } from "../src/commands/install.js";
import * as templateUtils from "../src/utils/template.js";
import * as promptModule from "../src/cli/prompt.js";
import fs from "fs-extra";
import { join } from "path";
import { tmpdir } from "os";
import { mkdtemp, rm } from "fs/promises";

vi.mock("../src/cli/prompt.js");
vi.mock("../src/utils/template.js", async (importOriginal) => {
	const actual = (await importOriginal()) as any;
	return {
		...actual,
		ensureTemplates: vi.fn().mockResolvedValue(undefined),
		// We will mock loadTemplate and getTemplateRoot via vi.mocked in the test
		getTemplateRoot: vi.fn(),
		loadTemplate: vi.fn(),
	};
});

describe("E2E Installation", () => {
	let testDir: string;

	beforeEach(async () => {
		testDir = await mkdtemp(join(tmpdir(), "conductor-test-"));
		vi.resetAllMocks();
		vi.spyOn(console, "log").mockImplementation(() => {});
		vi.spyOn(console, "error").mockImplementation(() => {});
		vi.spyOn(process, "exit").mockImplementation((() => {}) as any);

		// Default mock for loadTemplate
		vi.mocked(templateUtils.loadTemplate).mockResolvedValue('prompt = "test"');
	});

	afterEach(async () => {
		await rm(testDir, { recursive: true, force: true });
	});

	it("should complete full installation flow with mocked templates", async () => {
		// Mock prompt responses
		vi.mocked(promptModule.promptForAgent).mockResolvedValue("gemini");
		vi.mocked(promptModule.promptForInstallScope).mockResolvedValue("project");

		const fakeCache = join(testDir, "fake-cache");
		await fs.ensureDir(join(fakeCache, "templates"));
		await fs.ensureDir(join(fakeCache, "commands/conductor"));
		await fs.writeFile(
			join(fakeCache, "commands/conductor/setup.toml"),
			'prompt = "test"',
		);
		await fs.writeFile(
			join(fakeCache, "commands/conductor/newTrack.toml"),
			'prompt = "test"',
		);
		await fs.writeFile(
			join(fakeCache, "commands/conductor/implement.toml"),
			'prompt = "test"',
		);
		await fs.writeFile(
			join(fakeCache, "commands/conductor/status.toml"),
			'prompt = "test"',
		);
		await fs.writeFile(
			join(fakeCache, "commands/conductor/revert.toml"),
			'prompt = "test"',
		);
		await fs.writeFile(
			join(fakeCache, "commands/conductor/review.toml"),
			'prompt = "test"',
		);
		await fs.writeFile(join(fakeCache, "GEMINI.md"), "protocol");

		vi.mocked(templateUtils.getTemplateRoot).mockResolvedValue(fakeCache);

		await installHandler({ path: testDir, _: [], $0: "conductor" } as any);

		expect(fs.existsSync(join(testDir, ".gemini/conductor"))).toBe(true);
		// Gemini commands extension is .toml
		expect(
			fs.existsSync(join(testDir, ".gemini/commands/conductor/setup.toml")),
		).toBe(true);
		expect(fs.existsSync(join(testDir, ".gemini/GEMINI.md"))).toBe(true);
	});
});
