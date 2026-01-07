use clap::{Parser, Subcommand};

#[derive(Parser)]
#[command(name = "conductor")]
#[command(about = "Conductor for All", long_about = None)]
#[command(version)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Commands,
}

#[derive(Subcommand)]
pub enum Commands {
    /// Initialize a new conductor project
    Init,
}

#[cfg(test)]
mod tests {
    use super::*;
    use clap::Parser;

    #[test]
    fn verify_cli() {
        use clap::CommandFactory;
        Cli::command().debug_assert();
    }

    #[test]
    fn test_init_subcommand() {
        let args = Cli::try_parse_from(["conductor", "init"]).unwrap();
        match args.command {
            Commands::Init => assert!(true),
        }
    }
}
