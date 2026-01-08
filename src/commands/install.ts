
import { ArgumentsCamelCase } from 'yargs';
import { promptForAgent } from '../cli/prompt.js';
import { getGenerator } from '../generators/index.js';
import { resolve } from 'path';

export async function installHandler(argv: ArgumentsCamelCase<{ path: string }>): Promise<void> {
  // Resolve target directory to absolute path
  const targetDir = resolve(process.cwd(), argv.path);
  
  try {
    console.log(`Initializing Conductor in: ${targetDir}`);
    
    // 1. Select Agent
    console.log('Step 1: Prompting for agent selection...');
    const agent = await promptForAgent();
    console.log(`✔ Selected agent: ${agent}`);

    const generator = getGenerator(agent);

    // 2. Validate
    console.log('\nStep 2: Validating project directory...');
    const validatedPath = await generator.validate(targetDir);
    console.log(`✔ Validation complete: ${validatedPath}`);
    
    // 3. Generate
    console.log('\nStep 3: Generating files...');
    await generator.generate(validatedPath);
    console.log('✔ Files generated');
    
    console.log('\n✔ Conductor initialized successfully!');
  } catch (err) {
    console.error('\n✘ Installation failed:', err instanceof Error ? err.message : err);
    process.exit(1);
  }
}
