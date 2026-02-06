import gradient from "gradient-string";

// New banner for 'conductor-init' command
export const CONDUCTOR_INIT_BANNER = `
   __________  _   ______  __  __________________  ____     _____   ____________
  / ____/ __ \\/ | / / __ \\/ / / / ____/_  __/ __ \\/ __ \\   /  _/ | / /  _/_  __/
 / /   / / / /  |/ / / / / / / / /     / / / / / / /_/ /   / //  |/ // /  / /   
/ /___/ /_/ / /|  / /_/ / /_/ / /___  / / / /_/ / _, _/  _/ // /|  // /  / /    
\\____/\\____/_/ |_/_____/\\____/\\____/ /_/  \\____/_/ |_|  /___/_/ |_/___/ /_/ 
                                                                                    
`;

export function printBanner(): void {
	console.log(gradient("cyan", "green")(CONDUCTOR_INIT_BANNER));
}
