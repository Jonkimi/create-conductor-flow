import gradient from 'gradient-string';

export const CONDUCTOR_BANNER = `
   ____ ___  _   _ ____  _   _  ____ _____ ___  ____    _  _        _    _     
  / ___/ _ \\| \\ | |  _ \\| | | |/ ___|_   _/ _ \\|  _ \\  | || |      / \\  | |    
 | |  | | | |  \\| | | | | | | | |     | || | | | |_) | | || |_    / _ \\ | |    
 | |__| |_| | |\\  | |_| | |_| | |___  | || |_| |  _ <  |__   _|  / ___ \\| |___ 
  \\____\\___/|_| \\_|____/ \\___/\\____| |_| \\___/|_| \\_\\    |_|   /_/   \\_\\_____|
                                                                               
`;

export function printBanner(): void {
  console.log(gradient('green', 'blue')(CONDUCTOR_BANNER));
}
