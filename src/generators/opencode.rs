use crate::generators::Generator;

pub struct OpenCodeGenerator;

impl Generator for OpenCodeGenerator {
    fn install_path(&self) -> &str {
        ".opencode/conductor"
    }

    fn commands_path(&self) -> &str {
        ".opencode/commands"
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_paths() {
        let generator = OpenCodeGenerator;
        assert_eq!(generator.install_path(), ".opencode/conductor");
        assert_eq!(generator.commands_path(), ".opencode/commands");
    }
}
