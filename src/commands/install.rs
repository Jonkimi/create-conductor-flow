use crate::generators::{Generator, opencode::OpenCodeGenerator};
use inquire::Select;

pub fn run() {
    let options = vec!["Opencode"];
    let ans = Select::new("Select Coding Agent:", options).prompt();

    match ans {
        Ok("Opencode") => OpenCodeGenerator.install(),
        Ok(_) => println!("Agent not supported yet."),
        Err(_) => println!("Selection cancelled."),
    }
}
