use clap::Parser;
use cli::{Cli, Commands};

mod cli;
mod commands;

fn main() {
    let cli = Cli::parse();

    match &cli.command {
        Commands::Install => {
            commands::install::run();
        }
    }
}
