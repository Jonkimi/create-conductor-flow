
import { describe, it, expect } from 'vitest';
import { getGenerator } from '../../src/generators/index.js';
import { OpenCodeGenerator } from '../../src/generators/OpenCodeGenerator.js';
import { ClaudeCodeGenerator } from '../../src/generators/ClaudeCodeGenerator.js';
import { AntigravityGenerator } from '../../src/generators/AntigravityGenerator.js';

describe('getGenerator', () => {
    it('should return OpenCodeGenerator for "opencode"', () => {
        expect(getGenerator('opencode')).toBeInstanceOf(OpenCodeGenerator);
    });

    it('should return ClaudeCodeGenerator for "claude-code"', () => {
        expect(getGenerator('claude-code')).toBeInstanceOf(ClaudeCodeGenerator);
    });

    it('should return AntigravityGenerator for "antigravity"', () => {
        expect(getGenerator('antigravity')).toBeInstanceOf(AntigravityGenerator);
    });
});
