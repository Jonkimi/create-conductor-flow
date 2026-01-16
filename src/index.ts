#!/usr/bin/env node
import { cli } from './cli/index.js';
import { printBanner } from './utils/banner.js';

printBanner();

cli.parse();
