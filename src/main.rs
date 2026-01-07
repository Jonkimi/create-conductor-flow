use clap::Parser;
use cli::{Cli, Commands};

mod assets;
mod cli;
mod commands;
mod generators;

fn main() {
    let cli = Cli::parse();

    match &cli.command {
        Commands::Install => {
            commands::install::run();
        }
    }
}
