import { describe, it, expect } from "vitest";
import {
	stripAnsi,
	updateReadmeSection,
} from "../../src/utils/readme-update.js";

describe("readme-update utility", () => {
	describe("stripAnsi", () => {
		it("should strip ANSI escape codes from a string", () => {
			const input = "\u001b[31mHello\u001b[39m \u001b[32mWorld\u001b[39m";
			expect(stripAnsi(input)).toBe("Hello World");
		});

		it("should return the original string if no ANSI codes are present", () => {
			const input = "Hello World";
			expect(stripAnsi(input)).toBe("Hello World");
		});
	});

	describe("updateReadmeSection", () => {
		const newHelpOutput = "new help output";

		it("should update the help section in English README", () => {
			const enReadme =
				"# Conductor Install\n\n### Common Options\n\n```text\nold help output\n```\n\nFooter...";
			const result = updateReadmeSection(enReadme, newHelpOutput);
			expect(result).toContain("### Common Options");
			expect(result).toContain("```text\nnew help output\n```");
			expect(result).not.toContain("old help output");
		});

		it("should update the help section in Chinese README", () => {
			const zhReadme =
				"# Conductor Install\n\n### 常用选项\n\n```text\nold help output\n```\n\nFooter...";
			const result = updateReadmeSection(zhReadme, newHelpOutput);
			expect(result).toContain("### 常用选项");
			expect(result).toContain("```text\nnew help output\n```");
		});

		it("should update the help section in Japanese README", () => {
			const jaReadme =
				"# Conductor Install\n\n### 一般的なオプション\n\n```text\nold help output\n```\n\nFooter...";
			const result = updateReadmeSection(jaReadme, newHelpOutput);
			expect(result).toContain("### 一般的なオプション");
			expect(result).toContain("```text\nnew help output\n```");
		});

		it("should update the help section in Korean README", () => {
			const koReadme =
				"# Conductor Install\n\n### 일반적인 옵션\n\n```text\nold help output\n```\n\nFooter...";
			const result = updateReadmeSection(koReadme, newHelpOutput);
			expect(result).toContain("### 일반적인 옵션");
			expect(result).toContain("```text\nnew help output\n```");
		});
	});
});
