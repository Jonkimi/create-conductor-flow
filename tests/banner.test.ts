import { vi, describe, it, expect, afterEach } from "vitest";
import { printBanner, CONDUCTOR_INIT_BANNER } from "../src/utils/banner.js";
import gradient from "gradient-string";

vi.mock("gradient-string", () => {
	const format = vi.fn((text: string) => `formatted-${text}`);
	return {
		default: vi.fn(() => format),
	};
});

describe("printBanner", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should print the banner with cyan-to-green gradient", () => {
		const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

		printBanner();

		expect(gradient).toHaveBeenCalledWith("cyan", "green");
		// The mock returns a function that returns formatted text
		expect(consoleSpy).toHaveBeenCalledWith(
			`formatted-${CONDUCTOR_INIT_BANNER}`,
		);
	});
});
