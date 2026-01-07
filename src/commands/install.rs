use crate::assets::GEMINI_CONDUCTOR_CODEBASE;
use inquire::{Confirm, Select};
use serde::Deserialize;
use std::io::Read;
use std::path::Path;
use tar::Archive;

#[derive(Deserialize, Debug)]
struct CommandConfig {
    description: String,
    prompt: String,
}

#[cfg(test)]
mod tests {
    use super::*;
    use toml;

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

        let markdown = super::transform_to_markdown(toml_content, ".opencode/conductor");
        assert_eq!(markdown, expected_markdown);
    }
}

pub fn run() {
    let options = vec!["Opencode"];
    let ans = Select::new("Select Coding Agent:", options).prompt();

    match ans {
        Ok("Opencode") => install_opencode(),
        Ok(_) => println!("Agent not supported yet."),
        Err(_) => println!("Selection cancelled."),
    }
}

fn install_opencode() {
    let install_path = ".opencode/conductor";
    let commands_path = ".opencode/commands";

    // Check for existing files
    let files_to_check = vec![
        ".opencode/commands/conductor:setup.md",
        ".opencode/commands/conductor:newTrack.md",
        ".opencode/commands/conductor:status.md",
        ".opencode/commands/conductor:implement.md",
        ".opencode/commands/conductor:revert.md",
        ".opencode/conductor/templates/workflow.md",
        ".opencode/conductor/templates/code_styleguides",
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
            Ok(true) => println!("Overwriting..."),
            Ok(false) => {
                println!("Operation aborted.");
                return;
            }
            Err(_) => return,
        }
    } else {
        println!("Installing Conductor for Opencode...");
    }

    println!(
        "Extracting codebase (size: {} bytes)...",
        GEMINI_CONDUCTOR_CODEBASE.len()
    );
    extract_and_transform(install_path, commands_path);
    println!("Installation complete!");
}

fn transform_to_markdown(toml_content: &str, install_path: &str) -> String {
    let config: CommandConfig = toml::from_str(toml_content).expect("Failed to parse TOML");
    let prompt = config
        .prompt
        .replace("__$$CODE_AGENT_INSTALL_PATH$$__", install_path);
    format!("---\ndescription: {}\n---\n{}", config.description, prompt)
}

fn extract_and_transform(install_path: &str, commands_path: &str) {
    let mut archive = Archive::new(GEMINI_CONDUCTOR_CODEBASE);

    for file in archive.entries().unwrap() {
        let mut file = file.unwrap();
        let path = file.path().unwrap().into_owned();
        let path_str = path.to_str().unwrap();

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
            // We need to copy to .opencode/conductor/templates/...
            // path is templates/..., so joining install_path (.opencode/conductor) with path gives .opencode/conductor/templates/...
            let dest_path = Path::new(install_path).join(&path);

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
