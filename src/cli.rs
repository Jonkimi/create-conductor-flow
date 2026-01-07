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
    /// Install conductor commands and templates
    Install,
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
    fn test_install_subcommand() {
        let args = Cli::try_parse_from(["conductor", "install"]).unwrap();
        match args.command {
            Commands::Install => assert!(true),
        }
    }
}
