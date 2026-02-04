import { describe, it, expect, vi, beforeEach } from "vitest";
import { promptForGitIgnore } from "../src/cli/prompt.js";
import select from "@inquirer/select";

// Mock the @inquirer/select module
vi.mock("@inquirer/select", () => ({
	default: vi.fn(),
}));

describe("Git Ignore Prompt", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should return 'gitignore' when user selects .gitignore option", async () => {
		vi.mocked(select).mockResolvedValue("gitignore");

		const result = await promptForGitIgnore();

		expect(result).toBe("gitignore");
		expect(select).toHaveBeenCalled();
	});

	it("should return 'exclude' when user selects .git/info/exclude option", async () => {
		vi.mocked(select).mockResolvedValue("exclude");

		const result = await promptForGitIgnore();

		expect(result).toBe("exclude");
	});

	it("should return 'none' when user selects remove existing option", async () => {
		vi.mocked(select).mockResolvedValue("none");

		const result = await promptForGitIgnore();

		expect(result).toBe("none");
	});

	it("should return undefined when user selects skip option", async () => {
		vi.mocked(select).mockResolvedValue(undefined);

		const result = await promptForGitIgnore();

		expect(result).toBeUndefined();
	});

	it("should display correct prompt message", async () => {
		vi.mocked(select).mockResolvedValue("gitignore");

		await promptForGitIgnore();

		const callArgs = vi.mocked(select).mock.calls[0][0];
		expect(callArgs.message).toContain("git ignore");
	});

	it("should display all four options", async () => {
		vi.mocked(select).mockResolvedValue("gitignore");

		await promptForGitIgnore();

		const callArgs = vi.mocked(select).mock.calls[0][0];
		const choices = callArgs.choices as Array<{ name: string; value: string }>;

		expect(choices).toHaveLength(4);
		expect(choices.map((c) => c.value)).toContain("gitignore");
		expect(choices.map((c) => c.value)).toContain("exclude");
		expect(choices.map((c) => c.value)).toContain("none");
		expect(choices.map((c) => c.value)).toContain(undefined);
	});
});
