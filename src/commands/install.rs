use crate::assets::GEMINI_CONDUCTOR_CODEBASE;
use inquire::{Confirm, Select};
use serde::Deserialize;
use std::path::Path;

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

    // Extraction logic placeholder
    println!(
        "Extracting codebase (size: {} bytes)...",
        GEMINI_CONDUCTOR_CODEBASE.len()
    );
}
