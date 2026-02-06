/**
 * Strips ANSI escape codes from a string.
 */
export function stripAnsi(str: string): string {
	return str.replace(
		/[][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><~]/g,
		"",
	);
}

/**
 * Updates the help section in a README string with new help output.
 */
export function updateReadmeSection(
	readmeContent: string,
	newHelpOutput: string,
): string {
	const headers = [
		"### Common Options",
		"### 常用选项",
		"### 一般的なオプション",
		"### 일반적인 옵션",
	];

	for (const header of headers) {
		const headerIndex = readmeContent.indexOf(header);
		if (headerIndex === -1) continue;

		const searchFrom = headerIndex + header.length;
		const codeBlockStart = readmeContent.indexOf("```text", searchFrom);
		if (codeBlockStart === -1) continue;

		const codeBlockEnd = readmeContent.indexOf("```", codeBlockStart + 7);
		if (codeBlockEnd === -1) continue;

		const before = readmeContent.substring(0, codeBlockStart);
		const after = readmeContent.substring(codeBlockEnd + 3);

		return before + "```text\n" + newHelpOutput + "\n```" + after;
	}

	return readmeContent;
}
