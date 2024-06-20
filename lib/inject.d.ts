import type { ExitFunction, WriteFunction } from '.';
/**
 * @param {string} desktopCorePath - The path to Discord's desktop core (discord_desktop_core)
 * @param {string} injectString - The string to inject before we invoke the default core.asar
 * @param {WriteFunction} writeFn - Function to invoke before injecting to the index file.
 * @param {ExitFunction} exitFn - Function to handle exiting.
 * @returns {Promise<void>}
 */
export default function inject(desktopCorePath: string, injectString: string, writeFn?: WriteFunction, exitFn?: ExitFunction): Promise<void>;
