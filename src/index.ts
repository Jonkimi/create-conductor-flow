#!/usr/bin/env node

import { main } from "./cli/index.js";

main().catch((err) => {
	console.error("Error:", err instanceof Error ? err.message : err);
	process.exit(1);
});
