use crate::generators::Generator;

pub struct ClaudeCodeGenerator;

impl Generator for ClaudeCodeGenerator {
    fn install_path(&self) -> &str {
        ".claude/conductor"
    }

    fn commands_path(&self) -> &str {
        ".claude/commands"
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_paths() {
        let generator = ClaudeCodeGenerator;
        assert_eq!(generator.install_path(), ".claude/conductor");
        assert_eq!(generator.commands_path(), ".claude/commands");
    }
}
