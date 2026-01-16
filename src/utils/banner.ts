import gradient from 'gradient-string';

export const CONDUCTOR_BANNER = `
   __________  _   ______  __  __________________  ____     __ __     ___ 
  / ____/ __ \\/ | / / __ \\/ / / / ____/_  __/ __ \\/ __ \\   / // /    /   |
 / /   / / / /  |/ / / / / / / / /     / / / / / / /_/ /  / // /_   / /| |
/ /___/ /_/ / /|  / /_/ / /_/ / /___  / / / /_/ / _, _/  /__  __/  / ___ |
\\____/\\____/_/ |_/_____/\\____/\\____/ /_/  \\____/_/ |_|     /_/    /_/  |_|
   / /   / /                                                              
  / /   / /                                                               
 / /___/ /___                                                             
/_____/_____/                                                             
                                                                          
`;

export function printBanner(): void {
  console.log(gradient('green', 'blue')(CONDUCTOR_BANNER));
}
