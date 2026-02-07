/**
 * The default prefix used for Conductor command files.
 * Replaces the previous 'conductor:' prefix with a hyphenated version for better filesystem compatibility.
 */
export const CONDUCTOR_FILE_PREFIX = "conductor-";

/**
 * The default Gemini CLI extension install path used as the canonical placeholder in templates.
 * All content strategies replace this path with the agent-specific install path.
 */
export const GEMINI_DEFAULT_INSTALL_PATH = "~/.gemini/extensions/conductor";
