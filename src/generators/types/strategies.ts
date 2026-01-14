export interface ContentStrategyOptions {
  installPath: string;
  agentType: string;
  fixedAgent?: string;
  commandName?: string;
}

export interface ContentStrategy {
  process(templateContent: string, options: ContentStrategyOptions): string | null;
}

export interface FileStrategyOptions {
  targetDir: string;
  agentDir: string;
  commandsDir: string;
  commandName: string;
  extension: string;
  content: string;
}

export interface FileStrategy {
  write(options: FileStrategyOptions): Promise<void>;
}

export interface AgentGeneratorStrategy {
  content?: ContentStrategy;
  file?: FileStrategy;
}
