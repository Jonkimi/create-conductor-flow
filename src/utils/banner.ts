import gradient from "gradient-string";

// Original banner for 'conductor' command
export const CONDUCTOR_BANNER = `
   __________  _   ______  __  __________________  ____     __ __     ___    __    __ 
  / ____/ __ \\/ | / / __ \\/ / / / ____/_  __/ __ \\/ __ \\   / // /    /   |  / /   / / 
 / /   / / / /  |/ / / / / / / / /     / / / / / / /_/ /  / // /_   / /| | / /   / /  
/ /___/ /_/ / /|  / /_/ / /_/ / /___  / / / /_/ / _, _/  /__  __/  / ___ |/ /___/ /___
\\____/\\____/_/ |_/_____/\\____/\\____/ /_/  \\____/_/ |_|     /_/    /_/  |_/_____/_____/
                                                                                      
`;

// New banner for 'conductor-install' command
export const CONDUCTOR_INSTALL_BANNER = `
   __________  _   ______  __  __________________  ____     _____   _______________  __    __ 
  / ____/ __ \\/ | / / __ \\/ / / / ____/_  __/ __ \\/ __ \\   /  _/ | / / ___/_  __/   |/ /   / / 
 / /   / / / /  |/ / / / / / / / /     / / / / / / /_/ /   / //  |/ /\\__ \\ / / / /| / /   / /  
/ /___/ /_/ / /|  / /_/ / /_/ / /___  / / / /_/ / _, _/  _/ // /|  /___/ // / / ___ / /___/ /___
\\____/\\____/_/ |_/_____/\\____/\\____/ /_/  \\____/_/ |_|  /___/_/ |_//____//_/ /_/  |_/_____/_____/
                                                                                                
`;

export function printBanner(): void {
	console.log(gradient("green", "blue")(CONDUCTOR_BANNER));
}

export function printInstallBanner(): void {
	console.log(gradient("green", "cyan")(CONDUCTOR_INSTALL_BANNER));
}
