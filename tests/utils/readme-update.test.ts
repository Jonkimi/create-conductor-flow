import { describe, it, expect } from "vitest";
import { stripAnsi, updateReadmeSection } from "../../src/utils/readme-update.js";

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
		const originalReadme = '# Conductor Install\n\n## 🚀 Usage\n\n### 1. Setup Conductor in Your Project\n\n```text\nold help output\n```\n\nTo initialize Conductor in your project...';

		const newHelpOutput = "new help output";

		it("should update the help section in English README", () => {
			const result = updateReadmeSection(originalReadme, newHelpOutput);
			expect(result).toContain("### 1. Setup Conductor in Your Project");
			expect(result).toContain("```text\nnew help output\n```");
			expect(result).not.toContain("old help output");
		});

		it("should update the help section in Chinese README", () => {
			const zhReadme = '# Conductor Install\n\n## 🚀 使用方法\n\n### 1. 在你的项目中设置 Conductor\n\n```text\nold help output\n```\n\n要在你的项目中初始化 Conductor...';
			const result = updateReadmeSection(zhReadme, newHelpOutput);
			expect(result).toContain("### 1. 在你的项目中设置 Conductor");
			expect(result).toContain("```text\nnew help output\n```");
		});

		it("should update the help section in Japanese README", () => {
			const jaReadme = '# Conductor Install\n\n## 🚀 使用方法\n\n### 1. プロジェクトでの Conductor のセットアップ\n\n```text\nold help output\n```\n\nプロジェクトで Conductor を初期化するには...';
			const result = updateReadmeSection(jaReadme, newHelpOutput);
			expect(result).toContain("### 1. プロジェクトでの Conductor のセットアップ");
			expect(result).toContain("```text\nnew help output\n```");
		});

		it("should update the help section in Korean README", () => {
			const koReadme = '# Conductor Install\n\n## 🚀 사용법\n\n### 1. 프로젝트에서 Conductor 설정\n\n```text\nold help output\n```\n\n프로젝트에서 Conductor를 초기화하려면...';
			const result = updateReadmeSection(koReadme, newHelpOutput);
			expect(result).toContain("### 1. 프로젝트에서 Conductor 설정");
			expect(result).toContain("```text\nnew help output\n```");
		});
	});
});
