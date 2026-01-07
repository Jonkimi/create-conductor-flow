pub mod opencode;

use crate::assets::GEMINI_CONDUCTOR_CODEBASE;
use inquire::Confirm;
use serde::Deserialize;
use std::io::Read;
use std::path::Path;
use tar::Archive;

pub trait Generator {
    fn install_path(&self) -> &str;
    fn commands_path(&self) -> &str;

    fn check_existing(&self) -> bool {
        let install_path = self.install_path();
        let commands_path = self.commands_path();

        // Check for existing files
        // This is a simplified check based on typical conductor files
        let files_to_check = vec![
            format!("{}/conductor:setup.md", commands_path),
            format!("{}/conductor:newTrack.md", commands_path),
            format!("{}/templates/workflow.md", install_path),
        ];

        let mut exists = false;
        for file in &files_to_check {
            if Path::new(file).exists() {
                exists = true;
                break;
            }
        }

        if exists {
            let ans = Confirm::new("Conductor files already exist. Overwrite?")
                .with_default(false)
                .prompt();

            match ans {
                Ok(true) => {
                    println!("Overwriting...");
                    return false; // Proceed (don't stop)
                }
                Ok(false) => {
                    println!("Operation aborted.");
                    return true; // Stop
                }
                Err(_) => return true, // Stop
            }
        }
        false
    }

    fn install(&self) {
        if self.check_existing() {
            return;
        }

        println!("Installing Conductor...");
        println!(
            "Extracting codebase (size: {} bytes)...",
            GEMINI_CONDUCTOR_CODEBASE.len()
        );
        extract_and_transform(self.install_path(), self.commands_path());
        println!("Installation complete!");
    }
}

#[derive(Deserialize, Debug)]
struct CommandConfig {
    description: String,
    prompt: String,
}

fn transform_to_markdown(toml_content: &str, install_path: &str) -> String {
    let config: CommandConfig = toml::from_str(toml_content).expect("Failed to parse TOML");
    let prompt = config
        .prompt
        .replace("__$$CODE_AGENT_INSTALL_PATH$$__", install_path);
    format!("---\ndescription: {}\n---\n{}", config.description, prompt)
}

pub fn extract_and_transform(install_path: &str, commands_path: &str) {
    let mut archive = Archive::new(GEMINI_CONDUCTOR_CODEBASE);

    for file in archive.entries().unwrap() {
        let mut file = file.unwrap();
        let path = file.path().unwrap().into_owned();
        let mut path_str = path.to_str().unwrap();

        if path_str.starts_with("./") {
            path_str = &path_str[2..];
        }

        // Ignore macOS resource forks
        if path_str.contains("/._") || path_str.starts_with("._") {
            continue;
        }

        if path_str.starts_with("commands/") && path_str.ends_with(".toml") {
            let mut content = String::new();
            file.read_to_string(&mut content).unwrap();

            let markdown = transform_to_markdown(&content, install_path);

            let file_name = path.file_stem().unwrap().to_str().unwrap();
            let new_file_name = format!("conductor:{}.md", file_name);
            let dest_path = Path::new(commands_path).join(new_file_name);

            std::fs::create_dir_all(dest_path.parent().unwrap()).unwrap();
            std::fs::write(dest_path, markdown).unwrap();
        } else if path_str.starts_with("templates/") {
            // We need to copy to install_path/templates/...
            // path_str is templates/..., so joining install_path with path_str gives install_path/templates/...
            let dest_path = Path::new(install_path).join(path_str);

            if file.header().entry_type().is_dir() {
                std::fs::create_dir_all(dest_path).unwrap();
            } else {
                if let Some(parent) = dest_path.parent() {
                    std::fs::create_dir_all(parent).unwrap();
                }
                file.unpack(dest_path).unwrap();
            }
        }
    }
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
    }

    #[test]
    fn test_generator_trait() {
        let generator = MockGenerator;
        assert_eq!(generator.install_path(), "path");
        assert_eq!(generator.commands_path(), "cmds");
    }

    #[test]
    fn test_parse_command_config() {
        let toml_str = r#"
            description = "Test Description"
            prompt = "Test Prompt"
        "#;
        let config: CommandConfig = toml::from_str(toml_str).unwrap();
        assert_eq!(config.description, "Test Description");
        assert_eq!(config.prompt, "Test Prompt");
    }

    #[test]
    fn test_transform_toml_to_markdown() {
        let toml_content = r#"
            description = "Test Command"
            prompt = "Run command in __$$CODE_AGENT_INSTALL_PATH$$__"
        "#;
        let expected_markdown =
            "---\ndescription: Test Command\n---\nRun command in .opencode/conductor";

        let markdown = transform_to_markdown(toml_content, ".opencode/conductor");
        assert_eq!(markdown, expected_markdown);
    }
}
