use clap::Parser;
use cli::{Cli, Commands};

mod cli;
mod commands;

fn main() {
    let cli = Cli::parse();

    match &cli.command {
        Commands::Init => {
            commands::init::run();
        }
    }
}
