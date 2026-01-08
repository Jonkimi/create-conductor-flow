
export interface AgentGenerator {
  /**
   * Validates the target directory for installation.
   * Checks if critical files or directories already exist to prevent overwriting.
   * Returns the target directory path if valid, or throws an error.
   * @param targetDir The directory to validate
   */
  validate(targetDir: string): Promise<string>;

  /**
   * Generates the agent-specific configuration and commands.
   * Creates directories, copies templates, and processes configuration files.
   * @param targetDir The directory where the agent configuration should be generated
   */
  generate(targetDir: string): Promise<void>;
}

/**
 * Configuration for an agent type defining directory structure and naming conventions.
 */
export interface AgentConfig {
  /** The agent type identifier (e.g., 'opencode', 'claude-code', 'cursor') */
  agentType: string;
  /** The root directory for agent files (e.g., '.opencode', '.claude', '.cursor') */
  agentDir: string;
  /** The subdirectory for command files (e.g., 'commands', 'workflows') */
  commandsDir: string;
  /** Human-readable display name for error messages and logs */
  displayName: string;
}

