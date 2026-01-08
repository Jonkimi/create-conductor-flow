import type { AgentGenerator, AgentConfig } from './types.js';
import { ConfigurableGenerator } from './ConfigurableGenerator.js';

/**
 * Factory function that creates an AgentGenerator from a configuration.
 * This is the primary way to instantiate generators in the new architecture.
 *
 * @param config The agent configuration defining directory structure and naming
 * @returns An AgentGenerator instance configured for the specified agent type
 */
export function createGenerator(config: AgentConfig): AgentGenerator {
    return new ConfigurableGenerator(config);
}
