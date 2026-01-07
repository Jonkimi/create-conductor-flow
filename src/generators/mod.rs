pub mod opencode;

pub trait Generator {
    fn install_path(&self) -> &str;
    fn commands_path(&self) -> &str;
    fn check_existing(&self) -> bool;
    fn install(&self);
}

#[cfg(test)]
mod tests {
    use super::*;

    struct MockGenerator;
    impl Generator for MockGenerator {
        fn install_path(&self) -> &str {
            "path"
        }
        fn commands_path(&self) -> &str {
            "cmds"
        }
        fn check_existing(&self) -> bool {
            false
        }
        fn install(&self) {}
    }

    #[test]
    fn test_generator_trait() {
        let generator = MockGenerator;
        assert_eq!(generator.install_path(), "path");
        assert_eq!(generator.commands_path(), "cmds");
    }
}
