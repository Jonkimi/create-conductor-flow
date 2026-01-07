use crate::generators::{Generator, claude_code::ClaudeCodeGenerator, opencode::OpenCodeGenerator};
use inquire::Select;

pub fn run() {
    let options = vec!["Opencode", "Claude Code"];
    let ans = Select::new("Select Coding Agent:", options).prompt();

    match ans {
        Ok("Opencode") => OpenCodeGenerator.install(),
        Ok("Claude Code") => ClaudeCodeGenerator.install(),
        Ok(_) => println!("Agent not supported yet."),
        Err(_) => println!("Selection cancelled."),
    }
}
