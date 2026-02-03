import type { ContentStrategy, ContentStrategyOptions } from "../types.js";

export class QwenCodeContentStrategy implements ContentStrategy {
	process(
		_templateContent: string,
		_options: ContentStrategyOptions,
	): string | null {
		// Placeholder for now
		return "";
	}
}

export const qwenCodeContentStrategy = new QwenCodeContentStrategy();
